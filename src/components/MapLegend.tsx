import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FireSeverity, severityToColor } from "../constants/wildfireConstants";

function MapLegend() {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        bottom: 32,
        left: 16,
        p: 1.5,
        zIndex: 10,
        backgroundColor: "rgba(30, 37, 48, 0.90)",
        backdropFilter: "blur(8px)",
        borderRadius: 2,
        minWidth: 140,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          mb: 1,
          lineHeight: 1,
          fontWeight: 700,
          color: "text.secondary",
        }}
      >
        Fire Severity
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        {FireSeverity.map((severity) => (
          <Box
            key={severity}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "2px",
                backgroundColor: severityToColor[severity],
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
              {severity}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default MapLegend;
