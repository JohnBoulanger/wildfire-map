import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { FireData } from "../constants/wildfireConstants";

interface FireInfoPanelProps {
  marker: FireData;
  onClose: () => void;
}

const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

function FireInfoPanel({ marker, onClose }: FireInfoPanelProps) {
  // biome-ignore lint/suspicious/noExplicitAny: weather API response has no published TS types
  const [weather, setWeather] = useState<any | null>(null);
  const [weatherError, setWeatherError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setWeatherError(false);

        const location = `${marker.lat},${marker.lon}`;
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${encodeURIComponent(location)}`,
        );

        if (!res.ok) throw new Error("Weather API error");

        const data = await res.json();
        if (!data?.location || !data?.current) {
          throw new Error("Incomplete weather data");
        }

        setWeather(data);
      } catch {
        setWeather(null);
        setWeatherError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [marker]);

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ mt: 0.25, flexShrink: 0 }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={28} />
          ) : weather ? (
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {weather.location.name}, {weather.location.region}
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {weatherError ? "Location unavailable" : "Fire Event"}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {new Date(marker.timestamp).toLocaleString("en-CA", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Info grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        <InfoRow label="Severity" value={marker.severity} />
        <InfoRow
          label={!loading && weather?.location ? "Location" : "Coordinates"}
          value={
            loading
              ? null
              : weather?.location
                ? `${weather.location.name}, ${weather.location.region}`
                : `${marker.lat.toFixed(4)}, ${marker.lon.toFixed(4)}`
          }
          loading={loading}
        />
        <InfoRow
          label="Temperature"
          value={
            loading
              ? null
              : weather?.current?.temp_c != null
                ? `${weather.current.temp_c} °C`
                : "N/A"
          }
          loading={loading}
        />
        <InfoRow
          label="Wind"
          value={
            loading
              ? null
              : weather?.current
                ? `${weather.current.wind_kph} km/h ${weather.current.wind_dir}`
                : "N/A"
          }
          loading={loading}
        />
        <InfoRow
          label="Humidity"
          value={
            loading
              ? null
              : weather?.current?.humidity != null
                ? `${weather.current.humidity}%`
                : "N/A"
          }
          loading={loading}
        />
        <InfoRow
          label="Condition"
          value={loading ? null : (weather?.current?.condition?.text ?? "N/A")}
          loading={loading}
        />
      </Box>

      <Divider />

      {/* Satellite image */}
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
          backgroundColor: "rgba(0,0,0,0.03)",
        }}
      >
        <img
          src={marker.output_image_url}
          alt="Fire detection result"
          style={{
            maxWidth: "100%",
            maxHeight: 280,
            objectFit: "contain",
            borderRadius: 4,
          }}
        />
      </Paper>

    </Box>
  );
}

interface InfoRowProps {
  label: string;
  value: string | null;
  loading?: boolean;
}

function InfoRow({ label, value, loading = false }: InfoRowProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        {label}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width="70%" />
      ) : (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value ?? "—"}
        </Typography>
      )}
    </Box>
  );
}

export default FireInfoPanel;
