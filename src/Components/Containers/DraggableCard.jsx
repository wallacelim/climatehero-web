import React from "react";
import { motion } from "framer-motion";
import HistoryCard from "../HistoryCard";
import GoalsCard from "../GoalsCard";
import TrendsCard from "../TrendsCard";

export default function DraggableCard({ cardType, style }) {
    const renderContent = (type) => {
        if (type === "Goals") {
            return <GoalsCard style={{ ...style, height: "100%" }} />;
        }
        if (type === "Trends") {
            return <TrendsCard style={{ ...style, height: "100%" }} />;
        }
        if (type === "History") {
            return <HistoryCard style={{ ...style, height: "100%" }} />;
        }
        throw new Error(`Attempted to render invalid Card: ${type}`);
    };

    return (
        <motion.div
            style={{
                width: "auto",
                height: "100%",
                justifyContent: "center",
                alignItems: "top",
                display: "block",
            }}
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            {renderContent(cardType)}
        </motion.div>
    );
}
