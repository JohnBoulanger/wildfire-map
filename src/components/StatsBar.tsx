import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { FireData } from "../constants/wildfireConstants";

interface StatsBarProps {
  events: FireData[];
}

function StatsBar({ events }: StatsBarProps) {
  const total = events.length;
  const highSeverity = events.filter((e) =>
    ["Rank 4", "Rank 5", "Rank 6"].includes(e.severity),
  ).length;

  const latestDate =
    events.length > 0
      ? new Date(
          Math.max(...events.map((e) => new Date(e.timestamp).getTime())),
        ).toLocaleDateString("en-CA", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const stats = [
    { label: "Total Events", value: total },
    { label: "High Severity", value: highSeverity },
    { label: "Latest Event", value: latestDate },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {stats.map((stat, i) => (
        <Box
          key={stat.label}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1.5,
            px: 1,
            borderRight: i < stats.length - 1 ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.2 }}
          >
            {stat.value}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 0.25 }}
          >
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default StatsBar;
