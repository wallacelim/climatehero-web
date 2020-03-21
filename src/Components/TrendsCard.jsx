import React, { useState } from "react";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";

export default function TrendsCard(props) {
    const [toggleCharts, setToggleCharts] = useState("lineChart");

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

    const contentTitle =
        toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
    const switchToChart =
        toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

    const datasets = [
        {
            label: "Carbon Footprint Reductions",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ];

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];

    const [loading, setLoading] = useState(false);

    return (
        <Card
            style={props.style}
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
            <Text style={props.style}>{contentTitle}</Text>
            {toggleCharts === "lineChart" ? (
                <LineChart
                    width={"100%"}
                    datasets={datasets}
                    labels={labels}
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
}
