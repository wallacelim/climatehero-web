import React, { useEffect } from "react";

import { AnalyticalTable } from "@ui5/webcomponents-react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";

const ActivityHistory = ({ activities }) => {
    async function fetchActivityData() {
        const result = await fetch("http://localhost:8080/reductions");
        result.json()
            .then((res) => console.log(res[0].type))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchActivityData();
    });

    const activityColumns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Activity Type",
            accessor: "activityType",
        },
        {
            Header: "Measurement",
            accessor: "measurement",
        },
        {
            Header: "CO2 Reduction",
            accessor: "reduction",
        },
        {
            Header: "Recurrence",
            accessor: "recurrence",
        },
    ];

    return (
        <AnalyticalTable
            columns={activityColumns}
            data={activities.data.map((activity) => ({
                date: activity.date,
                activityType: activity.type.displayName,
                measurement: `${activity.measurement} ${activity.metric}`,
                reduction: activity.reduction,
                recurrence: activity.recurrence,
            }))}
            style={{ width: "100%", ...spacing.sapUiContentPadding }}
        />
    );
};

const mapStateToProps = ({ activities }) => ({
    activities,
});

export default connect(mapStateToProps, null)(ActivityHistory);
