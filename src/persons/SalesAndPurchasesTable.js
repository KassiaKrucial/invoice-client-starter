import {Link} from "react-router-dom";


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