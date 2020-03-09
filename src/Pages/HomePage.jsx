import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxWrap
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import { spacing } from "@ui5/webcomponents-react-base";
import SampleCustomComponent from "../Components/SampleCustomComponent";
import DraggableCard from "../Components/Containers/DraggableCard";

export function HomePage() {
    return (
        <motion.div animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap}
            >
                <Row className="container-fluid">
                    <Col xs={12} md={3}>
                        <DraggableCard
                            style={spacing.sapUiContentPadding}
                            card="Trends"
                        />
                    </Col>

                    {/* Goals */}
                    <Col xs={12} md={3}>
                        <DraggableCard
                            style={spacing.sapUiContentPadding}
                            card="Goals"
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <DraggableCard
                            style={spacing.sapUiContentPadding}
                            card="History"
                        />
                    </Col>
                </Row>
            </FlexBox>
            <SampleCustomComponent />
        </motion.div>
    );
}
