import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import { useMap } from "../../context/useMap";

function MyLocationButton() {
  const { geolocate } = useMap();

  return (
    <Tooltip title="My Location" placement="left">
      <IconButton size="small" onClick={() => geolocate.current?.trigger()}>
        <GpsFixedRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default MyLocationButton;
