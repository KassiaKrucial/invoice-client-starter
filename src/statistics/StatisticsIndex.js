import {useEffect, useState} from "react";
import {apiGet} from "../utils/api";
import PersonStatisticsTable from "./PersonStatisticsTable";


const StatisticsIndex = () => {
    const [personStatisticsState, setPersonStatistics] = useState([]);

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