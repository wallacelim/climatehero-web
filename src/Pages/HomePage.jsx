import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
    FlexBoxDirection,
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
import { SampleCustomComponent} from '../Components/SampleCustomComponent'

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

    let history = useHistory();
    const handleProgressHeaderClick = () => {
        history.push("/detail");
    };

    return (
        <div>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap} >
                <Card
                    style={{ width: "300px", ...spacing.sapUiContentPadding }}
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
                <Card
                    heading="Your Carbon Footprint Reduction Goals"
                    subtitle="List"
                    style={{ width: "300px", ...spacing.sapUiContentPadding }}
                    headerInteractive
                    onHeaderClick={handleProgressHeaderClick} 
                    avatar={<Icon name='list' />}>
                    <List>
                        <StandardListItem info="finished" infoState={ValueState.Success}>
                            Line-dry laundry
                    </StandardListItem>
                        <StandardListItem info="failed" infoState={ValueState.Error}>
                            Sell the car, buy a horse
                    </StandardListItem>
                        <StandardListItem
                            info="in progress"
                            infoState={ValueState.Warning}
                            style={{ height: "80px" }}>
                            <FlexBox direction={FlexBoxDirection.Column}>
                                <Title level={TitleLevel.H5}>Eat veggie lunches</Title>
                                <ProgressIndicator
                                    displayValue="89%"
                                    percentValue={89}
                                    width="180px"
                                    state={ValueState.Success} />
                            </FlexBox>
                        </StandardListItem>
                        <StandardListItem
                            info="in progress"
                            infoState={ValueState.Warning}
                            style={{ height: "80px" }}>
                            <FlexBox direction={FlexBoxDirection.Column}>
                                <Title level={TitleLevel.H5}>Cycle to work</Title>
                                <ProgressIndicator
                                    displayValue="5%"
                                    percentValue={5}
                                    width="180px"
                                    state={ValueState.Error} />
                            </FlexBox>
                        </StandardListItem>
                    </List>
                </Card>
                <Card heading="AnalyticalTable" subtitle="List" style={{ width: "900px", ...spacing.sapUiContentPadding }} avatar={<Icon name="table-view" />}>
                    <AnalyticalTable data={tableData} columns={tableColumns} visibleRows={5} />
                </Card>
            </FlexBox>
            <SampleCustomComponent/>
        </div>
    )
}