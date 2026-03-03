import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { FireData } from "../constants/wildfireConstants";
import { useMapFilters } from "../context/useMapFilters";
import { passesFilter } from "../utils/filterUtils";
import FireEventListItem from "./FireEventListItem";

interface FireEventListProps {
  events: FireData[];
  activeMarker: FireData | null;
  onSelect: (event: FireData) => void;
}

function FireEventList({ events, activeMarker, onSelect }: FireEventListProps) {
  const { filters } = useMapFilters();

  const filtered = events
    .filter((e) => passesFilter(e, filters))
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  if (filtered.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No events match the current filters.
        </Typography>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {filtered.map((event, i) => (
        <Box key={event.event_id}>
          <FireEventListItem
            event={event}
            isSelected={activeMarker?.event_id === event.event_id}
            onClick={() => onSelect(event)}
          />
          {i < filtered.length - 1 && <Divider component="li" />}
        </Box>
      ))}
    </List>
  );
}

export default FireEventList;
