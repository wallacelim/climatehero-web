import React from "react";

import { AnalyticalTable } from "@ui5/webcomponents-react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";

const ActivityHistory = ({ activities }) => {
    const activityColumns = [
        {
            Header: "Date / Time",
            accessor: "dateTime"
        },
        {
            Header: "Activity Type",
            accessor: "type"
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
            data={activities.data.map(activity => ({
                dateTime: activity.dateTimeOfActivity,
                type: activity.type.displayName,
                measurement: `${activity.measurement} ${activity.metric}`,
                reduction: activity.reductionValue,
                recurrence: activity.recurrence ? activity.recurrence : "N/A"
            }))}
            style={{
                height: "100%",
                width: "100%",
                ...spacing.sapUiContentPadding
            }}
            visibleRows={7}
            minRows={7}
        />
    );
};

const mapStateToProps = ({ activities }) => ({
    activities
});

export default connect(mapStateToProps, null)(ActivityHistory);
