import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SeverityFilter from "./filters/SeverityFilter";
import LocationFilter from "./filters/LocationFilter";
import DateFilter from "./filters/DateFilter";
import { useMapFilters } from "../context/useMapFilters";
import {
  FireSeverity,
  CompatibleLocations,
} from "../constants/wildfireConstants";

function SidebarFilters() {
  const { filters } = useMapFilters();
  const [expanded, setExpanded] = useState<string | false>(false);

  const severityInactive = FireSeverity.length - filters.severity.size;
  const locationInactive = CompatibleLocations.length - filters.location.size;
  const dateActive = filters.date.start || filters.date.end ? 1 : 0;

  function handleChange(panel: string) {
    setExpanded((prev) => (prev === panel ? false : panel));
  }

  const accordionSx = {
    boxShadow: "none",
    border: "none",
    "&:before": { display: "none" },
    backgroundColor: "transparent",
  };

  const summarySx = {
    minHeight: 44,
    px: 2,
    "&.Mui-expanded": { minHeight: 44 },
    "& .MuiAccordionSummary-content": {
      my: 0.75,
      alignItems: "center",
      gap: 1,
    },
  };

  return (
    <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Accordion
        expanded={expanded === "severity"}
        onChange={() => handleChange("severity")}
        disableGutters
        sx={accordionSx}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Severity
          </Typography>
          {severityInactive > 0 && (
            <Chip
              label={`${severityInactive} hidden`}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 1.5 }}>
          <SeverityFilter />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "location"}
        onChange={() => handleChange("location")}
        disableGutters
        sx={accordionSx}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Location
          </Typography>
          {locationInactive > 0 && (
            <Chip
              label={`${locationInactive} hidden`}
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 1.5 }}>
          <LocationFilter />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "date"}
        onChange={() => handleChange("date")}
        disableGutters
        sx={accordionSx}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Date Range
          </Typography>
          {dateActive > 0 && (
            <Chip
              label="active"
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: "0.65rem" }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0, pb: 1.5 }}>
          <DateFilter />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default SidebarFilters;
