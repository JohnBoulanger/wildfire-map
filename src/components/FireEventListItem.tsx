import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import type { FireData } from "../constants/wildfireConstants";
import { severityToColor } from "../constants/wildfireConstants";

interface FireEventListItemProps {
  event: FireData;
  isSelected: boolean;
  onClick: () => void;
}

function FireEventListItem({
  event,
  isSelected,
  onClick,
}: FireEventListItemProps) {
  const date = new Date(event.timestamp).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = new Date(event.timestamp).toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ListItemButton
      selected={isSelected}
      onClick={onClick}
      sx={{ px: 2, py: 1.25, gap: 1.5 }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          flexShrink: 0,
          backgroundColor: severityToColor[event.severity] ?? "#999",
          mt: 0.25,
        }}
      />
      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{ fontSize: "0.8rem", color: "text.secondary" }}
            >
              {date} · {time}
            </Box>
            <Chip
              label={event.severity}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                backgroundColor: severityToColor[event.severity] ?? "#999",
                color: "#fff",
                fontWeight: 700,
              }}
            />
          </Box>
        }
        secondary={
          <Box
            component="span"
            sx={{ fontSize: "0.75rem", fontFamily: "monospace" }}
          >
            {event.lat.toFixed(4)}, {event.lon.toFixed(4)}
          </Box>
        }
        primaryTypographyProps={{ component: "div" }}
        secondaryTypographyProps={{ component: "div" }}
      />
    </ListItemButton>
  );
}

export default FireEventListItem;
