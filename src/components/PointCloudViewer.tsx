import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const DEFAULT_EPT_PATH = "/pointcloud/entwine_pointcloud/ept.json";

interface ArrowCoords {
  x: number;
  y: number;
  z: number;
}

interface PointCloudPanelProps {
  onClose: () => void;
  eptPath?: string;
  arrowCoords?: ArrowCoords;
}

function PointCloudPanel({
  onClose,
  eptPath = DEFAULT_EPT_PATH,
  arrowCoords,
}: PointCloudPanelProps) {
  const arrowParams = arrowCoords
    ? `&arrowX=${arrowCoords.x}&arrowY=${arrowCoords.y}&arrowZ=${arrowCoords.z}`
    : "";
  const viewerUrl = `/potree/viewer.html?ept=${encodeURIComponent(eptPath)}${arrowParams}`;

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        bottom: 16,
        width: 480,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          3D Point Cloud
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Potree viewer iframe */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <iframe
          src={viewerUrl}
          title="3D Point Cloud Viewer"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          allow="fullscreen"
        />
      </Box>
    </Paper>
  );
}

export default PointCloudPanel;
