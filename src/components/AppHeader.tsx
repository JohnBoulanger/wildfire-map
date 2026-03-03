import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

function AppHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1.5,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <LocalFireDepartmentRoundedIcon
        sx={{ color: "primary.main", fontSize: 28 }}
      />
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
        Wildfire Map
      </Typography>
    </Box>
  );
}

export default AppHeader;
