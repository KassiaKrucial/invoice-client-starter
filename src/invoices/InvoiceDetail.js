import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import {Link, useParams} from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import { CZMoney } from "../utils/CZMoneyFormatter";
import PersonInfoCard from "./PersonInfoCard";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [seller, setSeller] = useState({});
    const [buyer, setBuyer] = useState({})

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            setSeller(data.seller);
            setBuyer(data.buyer);
        });
    }, [id]);

    return (
        <>
            <div className="row">
                <h1>Detail faktury</h1>
                <hr/>

                <div className="col">
                    <h3>Číslo faktury: {invoice.invoiceNumber}</h3>
                    <p>
                        <strong>Datum vydání:</strong>
                        <br></br>
                        {dateStringFormatter(invoice.issued)}
                    </p>
                    <p>
                        <strong>Datum splatnosti:</strong>
                        <br></br>
                        {dateStringFormatter(invoice.dueDate)}
                    </p>
                    <p>
                        <strong>Produkt:</strong>
                        <br></br>
                        {invoice.product}
                    </p>
                    <p>
                        <strong>Cena:</strong>
                        <br></br>
                        {CZMoney.format(invoice.price)}
                    </p>
                    <p>
                        <strong>Daň:</strong>
                        <br></br>
                        {invoice.vat}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br></br>
                        {invoice.note}
                    </p>
                </div>

                <div className="col">
                    <PersonInfoCard person={seller} isSeller={true}/>
                    <PersonInfoCard person={buyer} isSeller={false}/>
                </div>
            </div>
        </>
    );
};

export default InvoiceDetail;