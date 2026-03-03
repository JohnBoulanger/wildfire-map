import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MapStyleButton from "./buttons/MapStyleButton";
import MyLocationButton from "./buttons/MyLocationButton";
import MapLegendButton from "./buttons/MapLegendButton";

function MapToolbar() {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        p: 0.75,
        zIndex: 10,
        backgroundColor: "rgba(30, 37, 48, 0.90)",
        backdropFilter: "blur(8px)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <MapStyleButton />
        <MyLocationButton />
        <MapLegendButton />
      </Box>
    </Paper>
  );
}

export default MapToolbar;
