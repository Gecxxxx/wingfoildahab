# WingFoilDahab

Code-based migration of [wingfoildahab.com](https://wingfoildahab.com) from Tilda.

## Current routes

- `/` — English home page
- `/ru` — Russian home page
- `/equipment` — English equipment and rental page
- `/equipment-ru` — Russian equipment and rental page
- `/organizers` — English page for camp organizers
- `/organizers-ru` — Russian page for camp organizers

## Local preview

```bash
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

## Production build

```bash
npm run build
```

The resulting static site is written to `dist/` and can be served directly by Nginx.

## Migration status

The production tree is fully code-native and contains no Tilda runtime, exported pages, styles, scripts, or remote Tilda assets.
