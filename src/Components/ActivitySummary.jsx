import React, { useState, useEffect } from 'react';
import { AnalyticalTable } from '@ui5/webcomponents-react';
import { spacing } from "@ui5/webcomponents-react-base";

export function ActivitySummary() {
  const [reductionData, setReductionData] = useState({});
  const [hasError, setErrors] = useState(false);
  const user_id = 1;
  const activityData = new Array(5).fill(null).map((_, index) => {
    return {
      date: new Date(),
      activityType: (Math.round(Math.random())) ? 'Bus' : 'Bike',
      activity: (Math.random() * 15).toFixed(2),
      reduction: (Math.random() * 10).toFixed(2),
      recurrence: (Math.round(Math.random())) ? 'Weekly' : 'N/A'
    };
  });

  const activityColumns = [
    {
      Header: "Date",
      accessor: "date" // String-based value accessors!
    },
    {
      Header: "Activity Type",
      accessor: "activityType"
    },
    {
      Header: "Activity",
      accessor: "activity"
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

  async function fetchActivityData() {
    const res = await fetch(`/api/reductions/user=${user_id}`);
    res
      .json()
      .then(res => setReductionData(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchActivityData();
  });

  return (
    <AnalyticalTable
      columns={activityColumns}
      data={activityData}>
      style={{ width: "100%", ...spacing.sapUiContentPadding }}>
        </AnalyticalTable>
  )
}