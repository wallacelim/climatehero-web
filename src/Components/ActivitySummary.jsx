import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

const ActivitySummary = ({ activities }) => {
    //   async function fetchActivityData() {
    //     const res = await fetch(`/api/reductions/user=${user_id}`);
    //     res
    //       .json()
    //       .then(res => setReductionData(res))
    //       .catch(err => setErrors(err));
    //   }

    //   useEffect(() => {
    //     fetchActivityData();
    //   });
    const activityColumns = [
        {
            Header: "Date",
            accessor: "date" // String-based value accessors!
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

    return (
        <AnalyticalTable
            columns={activityColumns}
            data={activities.map(activity => {
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

const mapStateToProps = ({ activities }) => ({ activities });

export default connect(mapStateToProps, null)(ActivitySummary);
