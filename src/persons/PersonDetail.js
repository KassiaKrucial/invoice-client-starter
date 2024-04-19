/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiGet} from "../utils/api";
import Country from "./Country";
import SalesAndPurchasesTable from "./SalesAndPurchasesTable";

const PersonDetail = () => {
    const {id} = useParams();

    const [person, setPerson] = useState({});
    const [salesState, setSales] = useState([]);
    const [purchasesState, setPurchases] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/" + id).then(
            (data) => {
                setPerson(data),
            apiGet("/api/identification/" + data.identificationNumber + "/sales").then((salesData) => {setSales(salesData); console.log(salesData)}),
            apiGet("/api/identification/" + data.identificationNumber + "/purchases").then((purchasesData) => setPurchases(purchasesData))}
        );
    }, [id]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div className="row">
                <h1>Detail osoby</h1>
                <hr/>

                <div className="col">
                    <h3>{person.name} ({person.identificationNumber})</h3>
                    <p>
                        <strong>DIČ:</strong>
                        <br/>
                        {person.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>
                        <br/>
                        {person.accountNumber}/{person.bankCode} ({person.iban})
                    </p>
                    <p>
                        <strong>Tel.:</strong>
                        <br/>
                        {person.telephone}
                    </p>
                    <p>
                        <strong>Mail:</strong>
                        <br/>
                        {person.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong>
                        <br/>
                        {person.street}<br/>
                        {person.city}<br/>
                        {person.zip}<br/>
                        {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br/>
                        {person.note}
                    </p>
                </div>

                <div className="col-7">
                    <h3>Vystavené faktury</h3>
                    <SalesAndPurchasesTable items={salesState} isSeller={true}></SalesAndPurchasesTable>
                    <h3>Přijaté faktury</h3>
                    <SalesAndPurchasesTable items={purchasesState} isSeller={false}></SalesAndPurchasesTable>
                </div>
            </div>
        </>
    );
};

export default PersonDetail;
