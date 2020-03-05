import React from 'react';
import { Dialog, Select, Input, Option, Button, ButtonDesign, InputType, FlexBox, FlexBoxDirection, FlexBoxJustifyContent } from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
import { sapUiContentPadding } from '@ui5/webcomponents-react-base/lib/spacing';

import "@ui5/webcomponents-icons/dist/icons/meal.js";
import "@ui5/webcomponents-icons/dist/icons/passenger-train.js";
import "@ui5/webcomponents-icons/dist/icons/physical-activity.js";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport.js";
import "@material-ui/icons/DirectionsBike.js";

export function ActivityDialog() {
  const [openDialog, setOpenDialog] = React.useState(true);
  const [activities, setActivities] = React.useState(0);
  const handleActivityChange = React.useCallback((event) => {
    const activity = event.originalEvent.target.value;
    console.log(activity);
    setActivities(activity);
  }, [setActivities]);
  const handleAddClick = React.useCallback(() => {
    setOpenDialog(false);
    console.log(`Steps: ${activities}`);
  }, [setOpenDialog]);
  return (
    <div>
      {/* <Button design={ButtonDesign.Emphasized} onClick={handleButtonClick}>Open Dialog</Button> */}
      <Dialog
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
            <Select style={{...spacing.sapUiSmallMarginBottom}}>
              <Option icon="physical-activity">Steps</Option>
              <Option icon="DirectionsBike">Bike</Option>
              <Option icon="bus-public-transport">Bus</Option>
              <Option icon="passenger-train">Train</Option>
              <Option icon="meal">Vegetarian Meal</Option>
            </Select>
            <Input type={InputType.Number} value={activities} onChange={handleActivityChange}></Input>
          </FlexBox>
        </section>
      </Dialog>
    </div>
  );
}