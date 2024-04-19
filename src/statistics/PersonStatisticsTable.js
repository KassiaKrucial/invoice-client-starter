/**
 * Creates a table to show person's/company's id and name and their total revenue
 * @param items Contains list of person's/company's id, name and the sum of their revenue
 * @returns {JSX.Element} Renders the table with mapped data
 * @constructor Makes an instance of the table
 */
const PersonStatisticsTable = ({items}) => {
    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID osoby</th>
                <th>Jméno</th>
                <th>Příjem</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr>
                    <td>{item.personId}</td>
                    <td>{item.personName}</td>
                    <td>{item.revenue}</td>
                </tr>

                ))}
            </tbody>
        </table>
    );
};

export default PersonStatisticsTable;