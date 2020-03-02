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
import GoalsCard from "../Components/GoalsCard";
import TrendsCard from "../Components/TrendsCard";
import HistoryCard from "../Components/HistoryCard";

export function HomePage() {
    return (
        <motion.div animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap}
            >
                <Row className="container-fluid">
                    <Col xs={12} md={3}>
                        <motion.div
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "top"
                            }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                        >
                            <TrendsCard
                                style={{ ...spacing.sapUiContentPadding }}
                            />
                        </motion.div>
                    </Col>

                    {/* Goals */}
                    <Col xs={12} md={3}>
                        <motion.div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "top"
                            }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                        >
                            <GoalsCard
                                style={{ ...spacing.sapUiContentPadding }}
                            />
                        </motion.div>
                    </Col>
                    <Col xs={12} md={6}>
                        <motion.div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "top"
                            }}
                            drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                        >
                            <HistoryCard style={spacing.sapUiContentPadding} />
                        </motion.div>
                    </Col>
                </Row>
            </FlexBox>
            <SampleCustomComponent />
        </motion.div>
    );
}
