import React, { useState } from "react";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { Card, Text, Icon } from "@ui5/webcomponents-react";

export default function TrendsCard(props) {
    const [toggleCharts, setToggleCharts] = useState("lineChart");

    const handleHeaderClick = () => {
        if (toggleCharts === "lineChart") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("barChart");
            }, 2000);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("lineChart");
            }, 2000);
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
                    datasets={datasets}
                    labels={labels}
                    loading={loading}
                />
            ) : (
                <BarChart
                    datasets={datasets}
                    labels={labels}
                    loading={loading}
                />
            )}
        </Card>
    );
}
