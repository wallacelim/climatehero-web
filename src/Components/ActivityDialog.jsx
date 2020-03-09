import React, { useEffect } from 'react';
import { Dialog, Select, Input, Option, Button, ButtonDesign, InputType, FlexBox, FlexBoxDirection, FlexBoxJustifyContent } from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import { sapUiContentPadding } from '@ui5/webcomponents-react-base/lib/spacing';

import "@ui5/webcomponents-icons/dist/icons/meal.js";
import "@ui5/webcomponents-icons/dist/icons/passenger-train.js";
import "@ui5/webcomponents-icons/dist/icons/physical-activity.js";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport.js";

export function ActivityDialog({openDialog}) {
  // const [openDialog, setOpenDialog] = React.useState(true);
  const [activities, setActivities] = React.useState(0);
  const [activityTypes, setActivityTypes] = React.useState("step");

  const handleActivityChange = React.useCallback((event) => {
    const activity = event.originalEvent.target.value;
    setActivities(activity);
  }, [setActivities]);
  const handleActivitySelectChange = React.useCallback((event) => {
    const activityType = event.parameters.selectedOption.value;
    setActivityTypes(activityType);
  }, [setActivityTypes]);
  // const handleAddClick = React.useCallback(() => {
  //   setOpenDialog(false);
  //   console.log(`${activityTypes}: ${activities}`);
  // }, [activityTypes, activities, setOpenDialog]);

  const handleAddClick = () => {
    openDialog = false;
  };

  // useEffect(() =>
  //   fetch("/api/reduction")
  //     .then(res => res.json())
  //     .then(res => this.setState({ planets: res }))
  //     .catch(() => this.setState({ hasErrors: true }))
  // );

  return (
    <div>
      {openDialog && <Dialog
        style={sapUiContentPadding}
        headerText="Track Your Activity"
        stretch={false}
        open={openDialog}
        footer={<div>
          <FlexBox justifyContent={FlexBoxJustifyContent.Center} style={{...spacing.sapUiTinyMargin}}>
            <Button design={ButtonDesign.Emphasized} onClick={handleAddClick}>Add</Button>
          </FlexBox></div>}>
        <section>
          <FlexBox
            style={sapUiContentPadding}
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}>
            <Select style={{...spacing.sapUiSmallMarginBottom}} onChange={handleActivitySelectChange}>
              <Option icon="physical-activity" value="steps">Steps</Option>
              <Option icon="" value="bike">Bike(km)</Option>
              <Option icon="bus-public-transport" value="bus">Bus(km)</Option>
              <Option icon="passenger-train" value="train">Train(km)</Option>
              <Option icon="meal" value="vegetarianMeal">Vegetarian Meal</Option>
            </Select>
            <Input type={InputType.Number} value={activities} onChange={handleActivityChange}></Input>
          </FlexBox>
        </section>
      </Dialog>}
    </div>
  );
}
