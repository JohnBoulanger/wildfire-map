export const FireSeverity = [
  "Rank 1",
  "Rank 2",
  "Rank 3",
  "Rank 4",
  "Rank 5",
  "Rank 6",
];

export const CompatibleLocations = ["Canada", "United States"];

export interface FireData {
  event_id: string;
  severity: string;
  timestamp: string;
  lat: number;
  lon: number;
  output_image_url: string;
}

export const severityToColor: Record<string, string> = {
  [FireSeverity[0]]: "#ffd600",
  [FireSeverity[1]]: "#ffc100",
  [FireSeverity[2]]: "#ff9a00",
  [FireSeverity[3]]: "#ff7400",
  [FireSeverity[4]]: "#ff4d00",
  [FireSeverity[5]]: "#ff0000",
};
