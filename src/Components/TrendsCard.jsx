import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { Card, Icon, Text } from "@ui5/webcomponents-react";
import moment from "moment";
import RetroactivePeriodSelector from "./RetroactivePeriodSelector";
import {
    getDateTimeFromString,
    getAbbreviatedMonthStringFromNumber
} from "../util/datetime";

import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart";
import "@ui5/webcomponents-icons/dist/icons/line-chart";

const TrendsCard = ({ activities }) => {
    const [toggleCharts, setToggleCharts] = useState("lineChart");
    const [loading, setLoading] = useState(false);
    const [filteredActivities, setFilteredActivities] = useState(
        activities.data
    );
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});

    const contentTitle =
        toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
    const switchToChart =
        toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

    const handleFilter = (timeValue, timeUnit) => {
        setFilteredActivities(
            activities.data.filter(activity => {
                return getDateTimeFromString(
                    activity.dateTimeOfActivity
                ).isBetween(
                    moment().subtract(timeValue, timeUnit.unitString),
                    moment(),
                    null,
                    "[]"
                );
            })
        );
    };

    useEffect(() => {
        setLabels(
            filteredActivities
                .map(activity => activity.dateTimeOfActivity)
                .reduce((months, dateTime) => {
                    const month = getDateTimeFromString(dateTime).get("month");
                    if (!months.includes(month)) {
                        months.push(month);
                    }
                    return months;
                }, [])
        );
    }, [filteredActivities]);

    useEffect(() => {
        setData([
            {
                label: "Carbon Footprint Reductions",
                data: filteredActivities.reduce((reductions, activity) => {
                    const month = getDateTimeFromString(
                        activity.dateTimeOfActivity
                    ).get("month");
                    // eslint-disable-next-line no-param-reassign
                    reductions[labels.indexOf(month)] = activity.reductionValue;
                    return reductions;
                }, new Array(labels.length))
            }
        ]);
    }, [labels, filteredActivities]);

    const handleHeaderClick = () => {
        if (toggleCharts === "lineChart") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("barChart");
            }, 800);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("lineChart");
            }, 800);
        }
    };

    useEffect(() => {}, [filteredActivities]);

    useEffect(() => {}, [labels, filteredActivities]);

    // useEffect(() => {
    //     console.log(labels);
    //     console.log(data);
    // }, [data]);

    return (
        <Card
            style={spacing.sapUiContentPadding}
            headerInteractive
            onHeaderClick={handleHeaderClick}
            avatar={
                <Icon
                    name={
                        toggleCharts === "lineChart"
                            ? "line-chart"
                            : "horizontal-bar-chart"
                    }
                />
            }
            heading="Your Reduction Trends"
            subtitle={`Click me to switch to ${switchToChart}`}
        >
            <RetroactivePeriodSelector handleFilter={handleFilter} />
            <Text style={{ ...spacing.sapUiContentPadding, color: "grey" }}>
                {contentTitle}
            </Text>
            {toggleCharts === "lineChart" ? (
                <LineChart
                    width="100%"
                    datasets={data}
                    labels={labels.map(x =>
                        getAbbreviatedMonthStringFromNumber(x)
                    )}
                    loading={loading}
                    style={spacing.sapUiContentPadding}
                />
            ) : (
                <BarChart
                    width="100%"
                    style={spacing.sapUiContentPadding}
                    datasets={data}
                    labels={labels.map(x =>
                        getAbbreviatedMonthStringFromNumber(x)
                    )}
                    loading={loading}
                />
            )}
        </Card>
    );
};

const mapStateToProps = ({ activities }) => ({ activities });

export default connect(mapStateToProps, null)(TrendsCard);
