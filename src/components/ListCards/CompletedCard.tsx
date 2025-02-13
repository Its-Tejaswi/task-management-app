import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TaskList from "../../screens/TaskList.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDroppable } from "@dnd-kit/core";

const CompletedCard = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <Accordion
      defaultExpanded
      className="bg-white shadow-lg rounded-2xl border border-gray-300 overflow-hidden w-full"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-gray-600" />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "#CEFFCC",
          transition: "all 0.2s",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          paddingX: "16px",
          paddingY: "12px",
        }}
      >
        <Typography
          component="span"
          className="text-lg font-semibold text-black-800"
        >
          Completed <span className="text-gray-700">({tasks?.length})</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-200 p-4">
        <TaskList nodeRef={setNodeRef} tasks={tasks} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CompletedCard;
