import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { severityToColor, type FireData } from "../constants/wildfireConstants";
import { useMap } from "../context/useMap";
import { useMapFilters } from "../context/useMapFilters";
import { passesFilter } from "../utils/filterUtils";

interface FireMarkerProps {
  marker: FireData;
  isActive: boolean;
  onClick: (marker: FireData) => void;
}

const FireMarker = ({ marker, isActive, onClick }: FireMarkerProps) => {
  const { map } = useMap();
  const { filters } = useMapFilters();
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: map is a stable ref; marker/onClick are stable per-event
  useEffect(() => {
    if (!map.current || !passesFilter(marker, filters)) return;

    markerRef.current = new mapboxgl.Marker({
      color: severityToColor[marker.severity],
      scale: isActive ? 1.8 : 1,
    })
      .setLngLat([marker.lon, marker.lat])
      .addTo(map.current);

    const element = markerRef.current.getElement();
    const handler = () => onClick(marker);
    element.addEventListener("click", handler);

    return () => {
      element.removeEventListener("click", handler);
      markerRef.current?.remove();
    };
  }, [isActive, filters]);

  return null;
};

export default FireMarker;
