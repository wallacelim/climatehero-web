import React from "react";
import { motion } from "framer-motion";
import GoalsCard from "../GoalsCard";
import TrendsCard from "../TrendsCard";
import HistoryCard from "../HistoryCard";

export default function DraggableCard(props) {
    const renderContent = card => {
        if (card === "Goals") {
            return <GoalsCard style={{ ...props.style, height: "100%" }} />;
        } else if (card === "Trends") {
            return <TrendsCard style={{ ...props.style, height: "100%" }} />;
        } else if (card === "History") {
            return <HistoryCard style={{ ...props.style, height: "100%" }} />;
        }
    };

    return (
        <motion.div
            style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "top",
                display: "block"
            }}
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            {renderContent(props.card)}
        </motion.div>
    );
}
