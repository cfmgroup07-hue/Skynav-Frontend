# Skynav Frontend

React frontend application for Skynav Flight Booking.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Build

```bash
npm run build
```

## Test

```bash
npm test
npm run test:watch
```

## Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/          # Custom hooks
│   ├── contexts/       # React contexts
│   ├── data/           # Static data
│   └── utils/          # Utility functions
├── index.html
├── vite.config.js
└── package.json
```

## Environment Variables

Frontend uses Vite environment variables (prefixed with `VITE_`):
- `VITE_YPSILON_XML_USER`
- `VITE_YPSILON_XML_PASSWORD`
- `VITE_YPSILON_IBE_URL`
- `VITE_YPSILON_AGENT_ID`

These should be in the root `.env` file.

