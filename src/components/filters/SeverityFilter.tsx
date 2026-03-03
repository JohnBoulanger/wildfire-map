import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FireSeverity } from "../../constants/wildfireConstants";
import { useMapFilters } from "../../context/useMapFilters";

function SeverityFilter() {
  const { filters, setFilters } = useMapFilters();

  function toggle(value: string) {
    setFilters((prev) => ({
      ...prev,
      severity: (() => {
        const next = new Set(prev.severity);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      })(),
    }));
  }

  return (
    <FormGroup>
      {FireSeverity.map((severity) => (
        <FormControlLabel
          key={severity}
          control={
            <Checkbox
              size="small"
              checked={filters.severity.has(severity)}
              onChange={() => toggle(severity)}
              sx={{ py: 0.25 }}
            />
          }
          label={severity}
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem" } }}
        />
      ))}
    </FormGroup>
  );
}

export default SeverityFilter;
