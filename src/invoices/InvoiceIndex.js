import React, {useEffect, useState} from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";
import {CZMoney} from "../utils/CZMoneyFormatter";

/**
 * Creates the home page of invoices
 * @returns {JSX.Element} Renders the home page of invoices with a list of them and CRUD their CRUD options
 * @constructor Makes an instance of the home page of invoices
 */
const InvoiceIndex = () => {
    /**
     * Contains list of buyers
     */
    const [buyerListState, setBuyerList] = useState([]);
    /**
     * Contains list of sellers
     */
    const [sellerListState, setSellerList] = useState([]);
    /**
     * Contains list of invoices
     */
    const [invoices, setInvoices] = useState([]);
    /**
     * Contains the general statistics for invoices i.e. sum of revenue for every/current year and the total count of invoices
     */
    const [generalStatisticState, setGeneralStatictic] = useState({});
    /**
     * Contains values for filtering invoices
     */
    const [filterState, setFilter] = useState({
        sellerID: undefined,
        buyerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined
    });

    /**
     * Deletes an invoice by id
     * @param id Id of an invoice sent via url parameter
     * @returns {Promise<void>} List of invoices minus the deleted one or error message
     */
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    /**
     * Fetches data for sellers, buyers, invoices and general statistics for invoices
     */
    useEffect(() => {
        apiGet("/api/persons").then((data) => {setSellerList(data); setBuyerList(data)})
        apiGet("/api/invoices/statistics").then((data) => setGeneralStatictic(data));
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

    /**
     * Reacts to user's change of filtering criteria
     * @param e Event - change of filter fields
     */
    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: e.target.value}
            });
        }
    }

    /**
     * Filters data
     * @param e Event - submit
     * @returns {Promise<void>} List of filtered invoices
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
        const data = await apiGet("/api/invoices", params)
        setInvoices(data);
    }

    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr/>
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                sellerList={sellerListState}
                buyerList={buyerListState}
                filter={filterState}
                confirm="Filtrovat faktury"
            ></InvoiceFilter>
            <hr/>
            <div className="row">
                <div className="col">
                    <h6>Bilance za celé období: {CZMoney.format(generalStatisticState.allTimeSum)}</h6>
                </div>
                <div className="col">
                    <h6>Bilance za tento rok: {CZMoney.format(generalStatisticState.currentYearSum)}</h6>
                </div>
            </div>

            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;