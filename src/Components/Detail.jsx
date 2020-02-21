import React from "react";
import { CustomListItem } from "@ui5/webcomponents-react/lib/CustomListItem";
import { List, ListMode, ListSeparators, Button, Input, InputType, FlexBox, Text, FlexBoxDirection, FlexBoxAlignItems, FlexBoxJustifyContent, Title, TitleLevel, ButtonDesign } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

export function Detail() {
  const [steps, setSteps] = React.useState(0);
  const [bikeMins, setBikeMins] = React.useState(0);
  const [busMins, setBusMins] = React.useState(0);
  const [veggieMeals, setVeggieMeals] = React.useState(0);
  const handleStepsChange = React.useCallback((event) => {
    console.log(event);
    const step = event.originalEvent.target.value;
    setSteps(step);
  }, [setSteps]);
  const handleBikeMinsChange = React.useCallback((event) => {
    const bikeMin = event.originalEvent.target.value;
    setBikeMins(bikeMin);
  }, [setBikeMins]);
  const handleBusMinsChange = React.useCallback((event) => {
    const busMin = event.originalEvent.target.value;
    setBusMins(busMin);
  }, [setBusMins]);
  const handleVeggieMealsChange = React.useCallback((event) => {
    const veggieMeal = event.originalEvent.target.value;
    setVeggieMeals(veggieMeal);
  }, [setVeggieMeals]);
  const handleClick = e => {
    e.preventDefault();
    alert(`Steps ${steps}, Bike Minutes ${bikeMins}, Bus Minutes ${busMins}, VeggieMeasl ${veggieMeals}`);
  };
  return (
    <div>
      <List
        headerText='My Activities'
        footerText=''
        inset={false}
        mode={ListMode.None}
        noDataText='No Data available'
        separators={ListSeparators}
        header={null}
        style={spacing.sapUiContentPadding}
      >
        <CustomListItem>
          <FlexBox direction={FlexBoxDirection.Row} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween} width="100%">
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Column} width="100%">
              <Title level={TitleLevel.H5} style={spacing.sapUiContentPadding}>Steps</Title>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.End} direction={FlexBoxDirection.Row} width="100%">
              <Input type={InputType.Number} style={{ width: "100px", ...spacing.sapUiSmallMargin }} onChange={handleStepsChange} value="0" />
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Row} width="200px">
              <Text style={{ "padding": "1.5rem 1.5rem 1.5rem 0" }}>steps</Text>
            </FlexBox>
          </FlexBox>
        </CustomListItem>
        <CustomListItem>
          <FlexBox direction={FlexBoxDirection.Row} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween} width="100%">
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Column} width="100%">
              <Title level={TitleLevel.H5} style={spacing.sapUiContentPadding}>Bike</Title>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.End} direction={FlexBoxDirection.Row} width="100%">
              <Input type={InputType.Number} style={{ width: "100px", ...spacing.sapUiSmallMargin }} value={bikeMins} onChange={handleBikeMinsChange}></Input>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Row} width="200px">
              <Text style={{ "padding": "1.5rem 1.5rem 1.5rem 0" }}>minutes</Text>
            </FlexBox>
          </FlexBox>
        </CustomListItem>
        <CustomListItem>
          <FlexBox direction={FlexBoxDirection.Row} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween} width="100%">
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Column} width="100%">
              <Title level={TitleLevel.H5} style={spacing.sapUiContentPadding}>Bus</Title>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.End} direction={FlexBoxDirection.Row} width="100%">
              <Input type={InputType.Number} style={{ width: "100px", ...spacing.sapUiSmallMargin }} value={busMins} onChange={handleBusMinsChange}></Input>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Row} width="200px">
              <Text style={{ "padding": "1.5rem 1.5rem 1.5rem 0" }}>minutes</Text>
            </FlexBox>
          </FlexBox>
        </CustomListItem>
        <CustomListItem>
          <FlexBox direction={FlexBoxDirection.Row} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween} width="100%">
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Column} width="100%">
              <Title level={TitleLevel.H5} style={spacing.sapUiContentPadding}>Veggie Meals</Title>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.End} direction={FlexBoxDirection.Row} width="100%">
              <Input type={InputType.Number} style={{ width: "100px", ...spacing.sapUiSmallMargin }} value={veggieMeals} onChange={handleVeggieMealsChange}></Input>
            </FlexBox>
            <FlexBox justifyContent={FlexBoxJustifyContent.Start} direction={FlexBoxDirection.Row} width="200px">
              <Text style={{ "padding": "1.5rem 1.5rem 1.5rem 0" }}>meals</Text>
            </FlexBox>
          </FlexBox>
        </CustomListItem>
      </List>
      <FlexBox style={spacing.sapUiLargeMargin} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center}>
        <Button design={ButtonDesign.Emphasized} onClick={handleClick}>Calculate CO<sub>2</sub> Reduction</Button>
      </FlexBox>
    </div>
  );
}