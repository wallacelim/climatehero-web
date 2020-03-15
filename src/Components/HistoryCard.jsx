import React from "react";
import { useHistory } from "react-router-dom";
import { Card, AnalyticalTable, Icon } from "@ui5/webcomponents-react";

export default function HistoryCard(props) {
    const history = useHistory();
    const tableData = new Array(500).fill(null).map((_, index) => {
        return {
            goal: `Goal #${index}`,
            datetime: new Date().toString(),
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: Math.round(Math.random()) ? "Weekly" : "N/A"
        };
    });

    const handleHeaderClick = () => {
        history.push("/profile");
    };

    const tableColumns = [
        {
            Header: "Goal",
            accessor: "goal" // String-based value accessors!
        },
        {
            Header: "Date / Time",
            accessor: "datetime"
        },
        {
            Header: "Carbon Footprint Reduction",
            accessor: "reduction"
        },
        {
            Header: "Recurrence",
            accessor: "recurrence"
        }
    ];
    return (
        <Card
            heading="Your Reduction History"
            headerInteractive
            onHeaderClick={handleHeaderClick}
            subtitle="List"
            style={props.style}
            avatar={<Icon name="table-view" />}
        >
            <AnalyticalTable data={tableData} columns={tableColumns} />
        </Card>
    );
}
