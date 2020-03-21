import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

const ActivityHistory = ({ activities }) => {
    async function fetchActivityData() {
        const res = await fetch(`http://localhost:8080/reductions`);
        res.json()
            .then(res => console.log(res[0].type))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchActivityData();
    });

    const activityColumns = [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Activity Type",
            accessor: "activityType"
        },
        {
            Header: "Measurement",
            accessor: "measurement"
        },
        {
            Header: "CO2 Reduction",
            accessor: "reduction"
        },
        {
            Header: "Recurrence",
            accessor: "recurrence"
        }
    ];

    console.log(activities);
    return (
        <AnalyticalTable
            columns={activityColumns}
            data={activities.data.map(activity => {
                return {
                    date: activity.date,
                    activityType: activity.type.displayName,
                    measurement: activity.measurement + " " + activity.metric,
                    reduction: activity.reduction,
                    recurrence: activity.recurrence
                };
            })}
        >
            style={{ width: "100%", ...spacing.sapUiContentPadding }}>
        </AnalyticalTable>
    );
};

const mapStateToProps = ({ activities }) => ({
    activities
});

export default connect(mapStateToProps, null)(ActivityHistory);
