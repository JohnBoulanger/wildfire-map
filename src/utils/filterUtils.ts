import type { FireData } from "../constants/wildfireConstants";
import type { MapFilterState } from "../context/MapFilterContext";

export function passesFilter(
  marker: FireData,
  filters: MapFilterState,
): boolean {
  if (!filters.severity.has(marker.severity)) return false;

  const { start, end } = filters.date;
  const fireTime = new Date(marker.timestamp).getTime();

  if (start) {
    const startTime = new Date(start).getTime();
    if (fireTime < startTime) return false;
  }

  if (end) {
    const endTime = new Date(end).getTime();
    if (fireTime > endTime) return false;
  }

  return true;
}
