import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Icon } from "@ui5/webcomponents-react";
import ActivityHistory from "./ActivityHistory";

import "@ui5/webcomponents-icons/dist/icons/table-view";

export default function HistoryCard({ style }) {
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
            subtitle="Use the Calendar widget to edit"
            headerInteractive
            onHeaderClick={handleHeaderClick}
            style={style}
            avatar={<Icon name="table-view" />}
        >
            <ActivityHistory />
        </Card>
    );
}
