import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getAbbreviatedMonthStringFromNumber } from "../util/datetime";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";

const TrendsCard = ({ activities }) => {
    const [toggleCharts, setToggleCharts] = useState("lineChart");

    const contentTitle =
        toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";

    const switchToChart =
        toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

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

    const labels = activities.data.map(activity => {
        const date = moment(activity.date, "MMMM Do YYYY, h:mm:ss a");
        const month = getAbbreviatedMonthStringFromNumber(date.get("month"));
        const year = date.year().toString();
        return month + " " + year.slice(2);
    });

    const datasets = {
        label: "Carbon Footprint Reductions",
        data: labels.map(month => {
            return activities.data.filter(
                activity =>
                    moment(activity.date, "MMMM Do YYYY, h:mm:ss a").month() ==
                    month
            );
        })
    };

    const stubLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];

    const stubDatasets = [
        {
            label: "Carbon Footprint Reductions",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ];

    const [loading, setLoading] = useState(false);

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
            <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
            {toggleCharts === "lineChart" ? (
                <LineChart
                    width={"100%"}
                    datasets={stubDatasets}
                    labels={stubLabels}
                    loading={loading}
                    style={spacing.sapUiContentPadding}
                />
            ) : (
                <BarChart
                    width={"100%"}
                    style={spacing.sapUiContentPadding}
                    datasets={datasets}
                    labels={labels}
                    loading={loading}
                />
            )}
        </Card>
    );
};

const mapStateToProps = ({ activities }) => ({ activities });

export default connect(mapStateToProps, null)(TrendsCard);
