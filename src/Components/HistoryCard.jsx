import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Icon } from "@ui5/webcomponents-react";
import ActivityHistory from "./ActivityHistory";

export default function HistoryCard(props) {
    const history = useHistory();

    // To remove
    // const tableData = new Array(500).fill(null).map((_, index) => {
    //     return {
    //         goal: `Goal #${index}`,
    //         datetime: new Date().toString(),
    //         reduction: (Math.random() * 10).toFixed(2),
    //         recurrence: Math.round(Math.random()) ? "Weekly" : "N/A"
    //     };
    // });

    const handleHeaderClick = () => {
        history.push("/detail");
    };

    return (
        <Card
            heading="Your Reduction History"
            headerInteractive
            onHeaderClick={handleHeaderClick}
            subtitle="List"
            style={props.style}
            avatar={<Icon name="table-view" />}
        >
            <ActivityHistory />
        </Card>
    );
}
