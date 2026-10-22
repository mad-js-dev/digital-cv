# M3Surface Development State

## Current Architecture
- **Component**: `M3Surface.vue`
- **Specs**: `specs.ts` (Contains SURFACE_SIZE_PROFILES, SURFACE_DEPTH_MAP, SURFACE_ROLES)
- **Core Logic**: 
  - Radius: Symmetric/Asymmetric/Numeric.
  - Color: Role-based with automatic contrast resolution (On-Role $\rightarrow$ Base On-Role $\rightarrow$ onSurface).
  - Elevation: `drop-shadow` filters (level0 to level4).
  - Profiles: Size-driven automation (XS, SM, MD, LG, XL).

## Showcase Progress (`M3SurfaceView.vue`)
- **Pedagogical Order**:
  1. Corner Radius & Geometry (Symmetric, Asymmetric, Custom).
  2. Corner Morphing (Live Transitions).
  3. Color Control (Brand, Tonal, Neutral, Utility, Depth palettes + Contrast Engine explanation).
  4. Elevation System (Static levels + Elevation Morphing).
  5. Neutral Depth Hierarchy.
  6. Content Adaptation (Content-First sizing proof).
  7. Size-Driven Profiles (The automation).
  8. Interactive Morphing Lab.

## Pending/Next Steps
- Final polish of the Showcase UI.
- Integration of M3Surface into other components (M3Button already migrated).

## Critical Bug Fixes applied
- Fixed 'invisible text' by implementing contrast fallbacks in `resolveHex`.
- Fixed `M3Suface` typos.
- Fixed `surfaceBright` and `surfaceDim` values in `colors.ts`.
