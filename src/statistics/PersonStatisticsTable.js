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