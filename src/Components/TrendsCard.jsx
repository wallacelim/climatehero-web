import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { Card, Icon, Text } from "@ui5/webcomponents-react";
import RetroactivePeriodSelector from "./RetroactivePeriodSelector";

import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart";
import "@ui5/webcomponents-icons/dist/icons/line-chart";
import { filterAndGroupActivitiesByTime } from "../util/activities";

const TrendsCard = ({ activities }) => {
    const [toggleCharts, setToggleCharts] = useState("lineChart");
    const [loading, setLoading] = useState(false);
    const [timeToActivityMapping, setTimeToActivityMapping] = useState(
        activities.data
    );
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});

    const contentTitle =
        toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
    const switchToChart =
        toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

    const handleFilter = useCallback(
        (timeValue, timeUnit) => {
            setTimeToActivityMapping(
                filterAndGroupActivitiesByTime(
                    activities.data,
                    timeValue,
                    timeUnit
                )
            );
        },
        [activities]
    );

    useEffect(() => {
        setLabels(Object.keys(timeToActivityMapping));
        setData([
            {
                label: "Carbon Footprint Reductions",
                data: Object.values(timeToActivityMapping)
            }
        ]);
    }, [timeToActivityMapping]);

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

    useEffect(() => {
        console.log(labels);
    }, [labels]);

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                    labels={labels}
                    loading={loading}
                    style={spacing.sapUiContentPadding}
                />
            ) : (
                <BarChart
                    width="100%"
                    style={spacing.sapUiContentPadding}
                    datasets={data}
                    labels={labels}
                    loading={loading}
                />
            )}
        </Card>
    );
};

const mapStateToProps = ({ activities }) => ({ activities });

export default connect(mapStateToProps, null)(TrendsCard);
