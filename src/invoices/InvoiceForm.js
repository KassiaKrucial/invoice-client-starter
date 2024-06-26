import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

/**
 * Creates a form for creating or updating invoices
 * @returns {JSX.Element} Renders the form
 * @constructor Makes an instance of the form
 */
const InvoiceForm = () => {
    /**
     * Used to redirect
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();
    /**
     * Contains id of invoice to use in url parameter
     */
    const {id} = useParams();
    /**
     * Contains the invoice data
     */
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: 0
        },
        buyer: {
            _id: 0
        },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });

    /**
     * Contains people/companies to select a seller from
     */
    const [sellerListState, setSellerList] = useState([]);
    /**
     * Contains people/companies to select a buyer from
     */
    const [buyerListState, setBuyerList] = useState([]);
    /**
     * Checks if the form was sent at all
     */
    const [sentState, setSent] = useState(false);
    /**
     * Checks if the form was sent successfully
     */
    const [successState, setSuccess] = useState(false);
    /**
     * Contains error message, if the form was not successfully sent
     */
    const [errorState, setError] = useState(null);


    useEffect(() => {
        /**
         * Fetches data for a specific invoice using url param id
         */
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice(data);
            });
        }
        /**
         * Fetches data to fill selects for seller and buyer
         */
        apiGet("/api/persons").then((data) => {setSellerList(data); setBuyerList(data)});
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        /**
         * On submit either creates a new invoice or updates an existing one, then redirects to invoices index
         * Catches error messages from server and renders them
         */
        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then(() => {setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr></hr>

            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}

            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                ></InputField>

                <InputSelect
                    required={true}
                    multiple={false}
                    name="seller"
                    items={sellerListState}
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller: {_id: e.target.value}})
                    }}
                ></InputSelect>

                <InputSelect
                    required={true}
                    name="buyer"
                    items={buyerListState}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer: {_id: e.target.value}})
                    }}
                ></InputSelect>

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vydání"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value})
                    }}
                ></InputField>

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value})
                    }}
                ></InputField>

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Název produktu"
                    prompt="Zadejte název produktu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value})
                    }}
                ></InputField>

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value})
                    }}
                ></InputField>

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="Daň"
                    prompt="Zadejte výšku daně"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value})
                    }}
                ></InputField>

                <InputField
                    required={false}
                    type="text"
                    label="Poznámka"
                    prompt="Zadejte poznámku (nepovinné)"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value})
                    }}
                ></InputField>

                <div className="container">
                    <input type="submit" className="btn btn-primary" value="Uložit"/>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;