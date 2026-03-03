# Wildfire Map

A real-time wildfire monitoring dashboard built with React, TypeScript, and Mapbox GL. Fire detection events are fetched from an AWS backend, plotted on an interactive satellite map, and enriched with live weather data and ML model output imagery.

![Wildfire Map Screenshot](docs/screenshot.png)

## Features

- **Interactive satellite map** — Mapbox GL with switchable map styles, geolocation, and clickable fire markers
- **Fire event sidebar** — lists all detection events with stats (total events, high severity count, latest date)
- **Severity ranking** — events ranked Rank 1–6 with a color scale from yellow to red
- **Live weather** — per-event temperature, humidity, wind speed/direction, and conditions from WeatherAPI
- **ML model output** — displays the satellite image from the fire detection model with bounding boxes
- **Filters** — filter events by severity, location (Canada / United States), and date range
- **Map legend** — color-coded severity reference overlay

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Map | Mapbox GL JS v3 |
| UI components | MUI v7 (Material UI) + Emotion |
| Styling | Tailwind CSS v4 |
| Linting / Formatting | Biome |
| Backend | AWS API Gateway + S3 |
| Weather | WeatherAPI.com |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Mapbox](https://mapbox.com) access token
- A [WeatherAPI.com](https://www.weatherapi.com) API key

### Installation

```bash
git clone https://github.com/your-username/wildfire-map.git
cd wildfire-map
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check then build for production
npm run preview   # Preview the production build
npm run lint      # Lint with Biome
npm run format    # Format with Biome
```

## Architecture

### Data Flow

1. `MapView` fetches fire events on mount from the AWS API Gateway endpoint (`GET /fire-events`) and stores them as `FireData[]`.
2. Each `FireData` object contains: `event_id`, `severity` (Rank 1–6), `timestamp`, `lat`, `lon`, and `output_image_url`.
3. A `FireMarker` component renders each event as an interactive Mapbox GL marker styled by severity.
4. Clicking a marker opens `FireInfoPanel`, which fetches live weather from WeatherAPI and displays the ML model's satellite output image.

### Severity Scale

| Rank | Color |
|---|---|
| Rank 1 | `#ffd600` (yellow) |
| Rank 2 | `#ffc100` |
| Rank 3 | `#ff9a00` (orange) |
| Rank 4 | `#ff7400` |
| Rank 5 | `#ff4d00` |
| Rank 6 | `#ff0000` (red) |

Events with Rank 4–6 are counted as **high severity**.

### Context Providers

| Context | Purpose |
|---|---|
| `MapContext` | Holds the `mapboxgl.Map` ref and `GeolocateControl` instance |
| `MapUIContext` | UI toggle state (legend open/closed) |
| `MapFilterContext` | Active filters: severity set, location set, date range |

### AWS Backend

```
GET https://lloxbkzy0a.execute-api.us-east-2.amazonaws.com/prod/fire-events
```

Returns a `FireData[]` array. Output images are served from S3 and referenced via `output_image_url` on each event.

## Project Structure

```
src/
├── components/
│   ├── MapView.tsx          # Root view — map, markers, info panel
│   ├── Sidebar.tsx          # Left panel with stats and event list
│   ├── FireInfoPanel.tsx    # Selected event detail + ML output image
│   ├── FireMarker.tsx       # Imperative Mapbox GL marker per event
│   ├── FireEventList.tsx    # Scrollable list of fire events
│   ├── StatsBar.tsx         # Total / high severity / latest event stats
│   ├── MapToolbar.tsx       # Top-right map controls overlay
│   ├── MapLegend.tsx        # Severity color legend overlay
│   ├── SidebarFilters.tsx   # Filter panel in sidebar
│   ├── AppHeader.tsx        # App title header
│   ├── buttons/             # MapStyleButton, MyLocationButton, etc.
│   └── filters/             # SeverityFilter, LocationFilter, DateFilter
├── context/
│   ├── MapContext.tsx
│   ├── MapFilterContext.tsx
│   └── MapUIContext.tsx
├── constants/
│   └── wildfireConstants.ts # FireData interface, severity ranks, colors
├── utils/
│   └── filterUtils.ts
└── theme/
    └── appTheme.ts
```
