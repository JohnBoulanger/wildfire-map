import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LegendToggleRoundedIcon from "@mui/icons-material/LegendToggleRounded";
import { useMapUI } from "../../context/useMapUI";

function MapLegendButton() {
  const { ui, setUI } = useMapUI();
  const legendOpen = ui.legendOpen;

  return (
    <Tooltip title="Toggle Legend" placement="left">
      <IconButton
        size="small"
        color={legendOpen ? "primary" : "default"}
        onClick={() =>
          setUI((prev) => ({ ...prev, legendOpen: !prev.legendOpen }))
        }
      >
        <LegendToggleRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default MapLegendButton;
