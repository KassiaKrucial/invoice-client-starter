import React, {useEffect, useState} from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";
import {CZMoney} from "../utils/CZMoneyFormatter";

const InvoiceIndex = () => {
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [generalStatisticState, setGeneralStatictic] = useState({});
    const [filterState, setFilter] = useState({
        sellerID: undefined,
        buyerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => {setSellerList(data); setBuyerList(data)})
        apiGet("/api/invoices/statistics").then((data) => setGeneralStatictic(data));
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

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