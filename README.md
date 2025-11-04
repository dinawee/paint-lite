# Paint Lite

Paint Lite is a lightweight React + TypeScript canvas drawing playground powered by Vite. It includes a selection of tools, a layer list, and a configurable control panel.

## Prerequisites

- Node.js `18.x` or later (tested with `v22.21.0`)
- [pnpm](https://pnpm.io/) (`>=9`). Enable via `corepack enable pnpm` if needed.

## Getting Started

From the repository root, install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The app will be available at the URL printed in the terminal (typically `http://localhost:5173`). Hot Module Reloading is enabled by default.

## Building for Production

Create an optimized production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Testing

Run the test runner in watch mode:

```bash
pnpm test
```

Generate a coverage report:

```bash
pnpm test:coverage
```

## Linting

Run ESLint checks:

```bash
pnpm lint
```

## Implementation Notes

- **React + Zustand:** The UI uses React function components with Zustand (`src/stores/usePaintStore.ts`) for lightweight global state—tracking the active tool, color selections, layer stack, and canvas registration.
- **Tool Abstractions:** Drawing tools follow a shared `Tool` contract (`src/types/Tool.ts`) implemented by specific tool classes in `src/tools/`. This keeps the switching logic simple and extensible.
- **Canvas Utilities:** Pointer handling sits in `src/hooks/useCanvas.ts` and `src/hooks/useCanvasTool.ts`, translating DOM events into canvas coordinates without relying on third-party canvas libraries.
- **Utility Layer:** Drawing utilities live under `src/utils/drawing.ts`, keeping rendering concerns isolated from the React components.
- **Pure Canvas Rendering:** All drawing is performed with the native HTML Canvas 2D context—no external canvas frameworks are used.
