import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import {useParams} from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import { CZMoney } from "../utils/CZMoneyFormatter";
import PersonInfoCard from "../persons/PersonInfoCard";

/**
 * Creates the detail page of an invoice
 * @returns {JSX.Element} Renders the detail page of an invoice with data sent by server
 * @constructor Makes an instance of a detail page of an invoice
 */
const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [seller, setSeller] = useState({});
    const [buyer, setBuyer] = useState({})

    /**
     * Serves to get data of a specific invoice (url param id) from server and waits for them
     */
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