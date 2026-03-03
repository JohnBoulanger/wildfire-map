import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CompatibleLocations } from "../../constants/wildfireConstants";
import { useMapFilters } from "../../context/useMapFilters";

function LocationFilter() {
  const { filters, setFilters } = useMapFilters();

  function toggle(value: string) {
    setFilters((prev) => ({
      ...prev,
      location: (() => {
        const next = new Set(prev.location);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      })(),
    }));
  }

  return (
    <FormGroup>
      {CompatibleLocations.map((location) => (
        <FormControlLabel
          key={location}
          control={
            <Checkbox
              size="small"
              checked={filters.location.has(location)}
              onChange={() => toggle(location)}
              sx={{ py: 0.25 }}
            />
          }
          label={location}
          sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem" } }}
        />
      ))}
    </FormGroup>
  );
}

export default LocationFilter;
