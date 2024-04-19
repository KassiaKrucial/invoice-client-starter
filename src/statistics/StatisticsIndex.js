import {useEffect, useState} from "react";
import {apiGet} from "../utils/api";
import PersonStatisticsTable from "./PersonStatisticsTable";

/**
 * Fetches data for statistics of specific people/companies and sends into {@link PersonStatisticsTable}
 * @returns {JSX.Element} Renders the table with mapped data and a <h1>
 * @constructor
 */
const StatisticsIndex = () => {
    /**
     * Contains statistics data - person's/company's id and name, their sum of revenue
     */
    const [personStatisticsState, setPersonStatistics] = useState([]);

    /**
     * Fetches data from server and saves them into {@link personStatisticsState}
     */
    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setPersonStatistics(data));
    }, []);

    return (
        <>
            <h1>Výpis statistik pro jednotlivé společnosti</h1>
            <PersonStatisticsTable items={personStatisticsState}></PersonStatisticsTable>
        </>
    );
};

export default StatisticsIndex;