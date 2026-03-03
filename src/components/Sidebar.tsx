import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppHeader from "./AppHeader";
import StatsBar from "./StatsBar";
import SidebarFilters from "./SidebarFilters";
import FireEventList from "./FireEventList";
import FireInfoPanel from "./FireInfoPanel";
import type { FireData } from "../constants/wildfireConstants";

interface SidebarProps {
  events: FireData[];
  activeMarker: FireData | null;
  onSelectEvent: (event: FireData) => void;
  onClosePanel: () => void;
}

function Sidebar({
  events,
  activeMarker,
  onSelectEvent,
  onClosePanel,
}: SidebarProps) {
  return (
    <Paper
      elevation={3}
      square
      sx={{
        width: 360,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        zIndex: 10,
        borderRight: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <AppHeader />
      <StatsBar events={events} />
      <SidebarFilters />

      {/* Scrollable content area */}
      <Box
        sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
        className="sidebar-scroll"
      >
        {activeMarker ? (
          <FireInfoPanel marker={activeMarker} onClose={onClosePanel} />
        ) : (
          <FireEventList
            events={events}
            activeMarker={activeMarker}
            onSelect={onSelectEvent}
          />
        )}
      </Box>
    </Paper>
  );
}

export default Sidebar;
