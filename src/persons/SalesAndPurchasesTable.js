import {Link} from "react-router-dom";

/**
 * Creates a html table containing the list of invoices that a specific person/company has issued and needs to pay/paid
 * @param items List of invoices
 * @param isSeller Set as true if the person/company is the seller, false if they are the buyer
 * @returns {JSX.Element} Renders the invoices mapped into a table
 * @constructor Makes an instance of a html table filled with invoices
 */
const SalesAndPurchasesTable = ({items, isSeller}) => {
    console.log("vypis z komponenty" + isSeller);
    console.log(items);
    if (!items) {
        return <p>Načítám...</p>
    }
    return (
        <>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Číslo faktury</th>
                    <th>{isSeller ? "Odběratel" : "Dodavatel"}</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Částka</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <Link to={`/invoices/show/${item._id}`}>
                            <td>{item.invoiceNumber}</td>
                        </Link>
                        <td>{isSeller ? item.buyer?.name : item.seller?.name}</td>
                        <td>{item.issued}</td>
                        <td>{item.dueDate}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default SalesAndPurchasesTable;