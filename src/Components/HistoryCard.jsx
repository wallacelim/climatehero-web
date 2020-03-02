import React from "react";
import { Card, AnalyticalTable, Icon } from "@ui5/webcomponents-react";

export default function HistoryCard(props) {
    const tableData = new Array(500).fill(null).map((_, index) => {
        return {
            goal: `Goal #${index}`,
            datetime: new Date().toString(),
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: Math.round(Math.random()) ? "Weekly" : "N/A"
        };
    });

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
            subtitle="List"
            style={props.style}
            avatar={<Icon name="table-view" />}
        >
            <AnalyticalTable
                data={tableData}
                columns={tableColumns}
                visibleRows={5}
            />
        </Card>
    );
}
