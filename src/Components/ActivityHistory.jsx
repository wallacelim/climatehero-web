import React from "react";
import { AnalyticalTable, TableSelectionMode } from "@ui5/webcomponents-react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";
import { getDateTimeFromString, getDateFromString } from "../util/datetime";
import { UI } from "../redux/actionCreators";

const ActivityHistory = ({
    userId,
    activities,
    dateRangeStart,
    dateRangeEnd,
    toggleEditActivityModal,
}) => {
    const activityColumns = [
        {
            Header: "Date / Time",
            accessor: "dateTime",
        },
        {
            Header: "Activity Type",
            accessor: "type",
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
            selectionMode={TableSelectionMode.SINGLE_SELECT}
            onRowSelected={(e) =>
                toggleEditActivityModal(e.parameters.row.original.id)
            }
            data={activities.data
                .filter((activity) => activity.userId === userId)
                .filter((activity) => {
                    if (Boolean(dateRangeEnd) && Boolean(dateRangeStart)) {
                        return getDateTimeFromString(
                            activity.dateTimeOfActivity
                        ).isBetween(
                            getDateFromString(dateRangeStart),
                            getDateFromString(dateRangeEnd),
                            null,
                            "[]"
                        );
                    }
                    return true;
                })
                .map((activity) => ({
                    id: activity.id,
                    dateTime: activity.dateTimeOfActivity,
                    type: activity.type.displayName,
                    measurement: `${activity.measurement} ${activity.type.displayMetric}`,
                    reduction: activity.reductionValue.toFixed(2),
                    recurrence: activity.recurrence
                        ? activity.recurrence
                        : "N/A",
                }))}
            style={{
                height: "100%",
                width: "100%",
                ...spacing.sapUiContentPadding,
            }}
            visibleRows={7}
            minRows={7}
        />
    );
};

const mapStateToProps = (
    { user, activities },
    { dateRangeStart, dateRangeEnd }
) => ({
    userId: user.data.id,
    activities,
    dateRangeStart,
    dateRangeEnd,
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditActivityModal: (activityId) =>
        dispatch(UI.toggleEditActivityModal(activityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHistory);
