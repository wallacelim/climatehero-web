import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import {
    Card,
    Text,
    List,
    StandardListItem,
    ValueState,
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    AnalyticalTable,
    Icon
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import { SampleCustomComponent } from '../Components/SampleCustomComponent'
import { GoalsCard } from '../Components/GoalsCard'

export function HomePage() {

    const [toggleCharts, setToggleCharts] = useState("lineChart")

    const handleHeaderClick = () => {
        if (toggleCharts === "lineChart") {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setToggleCharts("barChart")
            }, 2000)
        } else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setToggleCharts("lineChart")
            }, 2000)
        }
    };

    const contentTitle = toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart"
    const switchToChart = toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart"

    const datasets = [{
        label: "Carbon Footprint Reductions",
        data: [65, 59, 80, 81, 56, 55, 40]
    }];

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];

    const [loading, setLoading] = useState(false)

    const tableData = new Array(500).fill(null).map((_, index) => {
        return {
            goal: `Goal #${index}`,
            datetime: new Date().toString(),
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: (Math.round(Math.random())) ? 'Weekly' : 'N/A'
        };
    });

    const tableColumns = [
        {
            Header: "Goal",
            accessor: "goal" // String-based value accessors!
        },
        {
            Header: "Date / Time",
            accessor: "datetime"
        },
        {
            Header: "Carbon Footprint Reduction",
            accessor: "reduction"
        },
        {
            Header: "Recurrence",
            accessor: "recurrence"
        }
    ];

    return (
        <motion.div animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap} >
                <Row className="container-fluid">
                    <Col xs={12} md={3}>
                        <motion.div
                            style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "top" }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}

                        >
                            <Card
                                style={{ ...spacing.sapUiContentPadding }}
                                headerInteractive
                                onHeaderClick={handleHeaderClick}
                                avatar={<Icon name={toggleCharts === "lineChart" ? 'line-chart' : 'horizontal-bar-chart'} />}
                                heading="Your Reduction Trends"
                                subtitle={`Click me to switch to ${switchToChart}`}>
                                <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
                                {toggleCharts === "lineChart" ?
                                    <LineChart datasets={datasets} labels={labels} loading={loading} />
                                    :
                                    <BarChart datasets={datasets} labels={labels} loading={loading} />
                                }
                            </Card>
                        </motion.div>
                    </Col>

                    {/* Goals */}
                    <Col xs={12} md={3}>
                        <motion.div
                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "top" }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}

                        >
                            <GoalsCard style={{...spacing.sapUiContentPadding}}/>
                        </motion.div>
                    </Col>
                    <Col xs={12} md={6}>
                        <motion.div
                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "top" }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <Card heading="Your Reduction History" subtitle="List" style={{ ...spacing.sapUiContentPadding }} avatar={<Icon name="table-view" />}>
                                <AnalyticalTable data={tableData} columns={tableColumns} visibleRows={5} />
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </FlexBox>
            <SampleCustomComponent />
        </motion.div>
    )
}
