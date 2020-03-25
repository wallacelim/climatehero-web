import React from "react";

import { AnalyticalTable } from "@ui5/webcomponents-react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";

const ActivityHistory = ({ activities }) => {
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
