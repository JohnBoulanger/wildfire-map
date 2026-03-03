import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import { useMap } from "../../context/useMap";

const styleOptions = [
  {
    label: "Default",
    style: "mapbox://styles/johnboulanger/cmi0mloo9008g01s4bvqj2kh6",
  },
  { label: "Satellite", style: "mapbox://styles/mapbox/satellite-v9" },
  { label: "Streets", style: "mapbox://styles/mapbox/streets-v12" },
  { label: "Dark", style: "mapbox://styles/mapbox/dark-v11" },
  { label: "Outdoors", style: "mapbox://styles/mapbox/outdoors-v12" },
];

function MapStyleButton() {
  const { map } = useMap();
  const [activeStyle, setActiveStyle] = useState(styleOptions[0].style);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Map Style" placement="left">
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color={open ? "primary" : "default"}
        >
          <MapRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { minWidth: 160 } } }}
      >
        {styleOptions.map((option) => (
          <MenuItem
            key={option.label}
            selected={option.style === activeStyle}
            onClick={() => {
              map.current?.setStyle(option.style);
              setActiveStyle(option.style);
              setAnchorEl(null);
            }}
            sx={{ gap: 1 }}
          >
            <ListItemText primary={option.label} />
            {option.style === activeStyle && (
              <CheckRoundedIcon fontSize="small" color="primary" />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MapStyleButton;
