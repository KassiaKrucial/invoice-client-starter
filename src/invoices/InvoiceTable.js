import React from "react";
import {Link} from "react-router-dom";
import { CZMoney } from "../utils/CZMoneyFormatter";
import dateStringFormatter from "../utils/dateStringFormatter";

/**
 * Creates a html table for rendering a list of invoices and their CRUD operations
 * @param label Label for the total count of invoices
 * @param items Represents one invoice
 * @param deleteInvoice A method for deleting an invoice by id
 * @returns {JSX.Element} Renders the table with mapped invoices
 * @constructor Makes an instance of a html table containing a list of invoices
 */
const InvoiceTable = ({label, items, deleteInvoice}) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Datum splatnosti</th>
                    <th>Cena</th>
                    <th>Produkt</th>
                    <th colSpan={3}>Akce</th>
                </tr>
                </thead>

                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{dateStringFormatter(item.issued)}</td>
                        <td>{CZMoney.format(item.price)}</td>
                        <td>{item.product}</td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>

                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>

                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;