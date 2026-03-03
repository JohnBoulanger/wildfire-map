import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMapFilters } from "../../context/useMapFilters";

function DateFilter() {
  const { filters, setFilters } = useMapFilters();

  function setDate(key: "start" | "end", value: string | null) {
    setFilters((prev) => ({
      ...prev,
      date: {
        ...prev.date,
        [key]: value || null,
      },
    }));
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <TextField
        label="Start Date"
        type="date"
        size="small"
        value={filters.date.start || ""}
        onChange={(e) => setDate("start", e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
      <TextField
        label="End Date"
        type="date"
        size="small"
        value={filters.date.end || ""}
        onChange={(e) => setDate("end", e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
    </Box>
  );
}

export default DateFilter;
