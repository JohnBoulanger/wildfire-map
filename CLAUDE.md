# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check (tsc -b) then build for production
npm run lint      # Lint with Biome
npm run format    # Format with Biome (--write)
npm run preview   # Preview production build
```

There are no tests in this project.

## Environment Variables

Create a `.env` file at the project root with:
- `VITE_MAPBOX_TOKEN` — Mapbox GL access token (used in `MapView.tsx`)
- `VITE_WEATHER_API_KEY` — WeatherAPI.com key (used in `FireInfoPanel.tsx`)

## Architecture

This is a **wildfire monitoring dashboard** — a single-page React + TypeScript app built with Vite. The app displays fire detection events on an interactive map, fetched from an AWS backend.

### Data Flow

1. `MapView` fetches fire events on mount from the AWS API Gateway endpoint (`/fire-events`) and stores them as `FireData[]`.
2. Each `FireData` object (defined in `src/constants/wildfireConstants.ts`) has: `event_id`, `severity` (Rank 1–6), `timestamp`, `lat`, `lon`, `output_image_url`.
3. A `FireMarker` component is rendered per event — it creates a Mapbox GL marker imperatively and applies active filter state from `MapFilterContext`.
4. Clicking a marker opens `FireInfoPanel`, which fetches live weather from WeatherAPI and displays the fire's satellite output image (S3 URL stored in `output_image_url`).

### Context Providers (nested in `App.tsx`)

| Context | Purpose |
|---|---|
| `MapContext` | Holds `useRef` for the `mapboxgl.Map` instance and `GeolocateControl` — shared so child components can add markers without prop drilling |
| `MapUIContext` | UI toggle state (currently: `legendOpen`) |
| `MapFilterContext` | Active filters: severity (Set), location (Set), date range — defaults to all-enabled |

Each context has a companion hook in `src/context/` (e.g., `useMap.ts`, `useMapUI.ts`, `useMapFilters.ts`).

### Key Component Relationships

- `MapView` — root view; owns `fireEvents` state and `activeMarker` state; renders map container, markers, info panel, legend, and toolbar
- `MapToolbar` — fixed top-right overlay with four icon buttons: Filters, Style, My Location, Legend
- `FireMarker` — renders no DOM; imperatively creates/removes a Mapbox GL marker; re-runs when `isActive` or `filters` change
- `MapFiltersDropdown` — generic dropdown wrapper (click-outside-to-close) used by filter buttons

### Styling

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (configured in `vite.config.ts`)
- **MUI v7** (`@mui/material`) with Emotion for more complex UI components
- **Emotion styled** (`@emotion/styled`) used directly in `FireInfoPanel` for the panel's dark glass-morphism style
- Biome is the formatter/linter (replaces Prettier + ESLint); config in `biome.json` — double quotes, 2-space indent, trailing commas

### AWS Backend

The frontend calls a single REST endpoint:
- `GET https://lloxbkzy0a.execute-api.us-east-2.amazonaws.com/prod/fire-events` → returns `FireData[]`

Output images are served from S3 and referenced via `output_image_url` in each event.
