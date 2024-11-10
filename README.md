# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Be sure to add a .env file with the following:
```
VITE_API_KEY=your-api-key-here
VITE_APP_ID=your-app-id-here
VITE_SESSION_NAME="postgres"
VITE_SESSION_PASSWORD="postgres"
```

## Interactive Map Instructions
- Navigate: Click and drag to move; use zoom controls to zoom in/out.
- Add a Pin: Click on any location to drop a pin instantly visible to all users.
- Add Comments: After placing a pin, enter a description (e.g., "Great burger place") and hit Submit. Comments cannot be edited once submitted.
- View Comments: Click any pin to see comments left by others.
- Click on the Comment to open Google Maps.
- Real-Time Updates: All pins and comments update live.
- Remove Pins: Only the user who created a pin can delete it by clicking Delete on their pin.

## Google Maps API
Enable the following APIs for your project:
- Geolocation API
- Geocoding API
- Maps Embed API
- Maps JavaScript API
- Places API
- Places API (New)
