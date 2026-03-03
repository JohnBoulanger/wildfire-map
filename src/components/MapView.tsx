import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Box from "@mui/material/Box";
import MapToolbar from "./MapToolbar";
import type { FireData } from "../constants/wildfireConstants";
import FireMarker from "./FireMarker";
import { useMap } from "../context/useMap";
import MapLegend from "./MapLegend";
import { useMapUI } from "../context/useMapUI";
import Sidebar from "./Sidebar";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function MapView() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [fireEvents, setFireEvents] = useState<FireData[]>([]);
  const [activeMarker, setActiveMarker] = useState<FireData | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { map, geolocate } = useMap();
  const { ui } = useMapUI();

  const legendOpen = ui.legendOpen;

  // initialize map (once)
  // biome-ignore lint/correctness/useExhaustiveDependencies: map/geolocate are stable refs; intentionally runs once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/johnboulanger/cmi0mloo9008g01s4bvqj2kh6",
      center: [-115.57, 51.18],
      zoom: 7,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true,
    });

    map.current.addControl(geolocateControl);
    geolocate.current = geolocateControl;

    map.current.on("load", () => setMapLoaded(true));

    return () => map.current?.remove();
  }, []);

  // fetch FireEvents from backend
  useEffect(() => {
    fetch(
      "https://lloxbkzy0a.execute-api.us-east-2.amazonaws.com/prod/fire-events",
    )
      .then((res) => res.json())
      .then((data: FireData[]) => setFireEvents(data))
      .catch((err) => console.error("Failed to load fire events", err));
  }, []);

  const handleMarkerClick = (marker: FireData) => {
    setActiveMarker(marker);
    map.current?.flyTo({
      center: [marker.lon, marker.lat],
      zoom: 10,
      duration: 800,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar
        events={fireEvents}
        activeMarker={activeMarker}
        onSelectEvent={handleMarkerClick}
        onClosePanel={() => setActiveMarker(null)}
      />

      {/* Map region */}
      <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%" }} ref={mapContainerRef} />

        {mapLoaded &&
          fireEvents.map((marker) => (
            <FireMarker
              key={marker.event_id}
              marker={marker}
              isActive={activeMarker?.event_id === marker.event_id}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

        {legendOpen && <MapLegend />}

        <MapToolbar />
      </Box>
    </Box>
  );
}

export default MapView;
