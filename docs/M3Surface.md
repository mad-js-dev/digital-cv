# M3Surface Specification

`M3Surface` is the foundational layout component for the DigitalCV design system. It implements the Material Design 3 (M3) "Surface" concept, focusing on a content-first approach to geometry, elevation, and color.

## 1. Content-First Philosophy

Unlike traditional components that rely on fixed widths and heights, `M3Surface` acts as a **semantic wrapper**. 

- **Dynamic Sizing**: It uses `inline-flex` by default, allowing the surface to shrink-wrap its content or expand to fill its container based on CSS layout rules.
- **Abstracted Geometry**: Geometry (radius, elevation) is decoupled from the component's role (e.g., "Button" vs "Card") and instead tied to a **Size Profile**.

## 2. Property Map

### Geometry
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `radius` | `string \| number` | `FULL` | Manual override for corner radius. Accepts M3 tokens or pixel values. |
| `elevation` | `number` | `0` | Surface elevation level (0-5). Maps to specific `drop-shadow` filters. |
| `shape` | `SurfaceShape` | `undefined` | Preset shapes (e.g., `CAPPED`, `SQUIRCLE`). |

### Color & Role
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `role` | `SurfaceRole` | `surface` | The M3 color role used for the background (e.g., `surfaceContainer`, `primaryContainer`). |
| `variant` | `SurfaceVariant` | `default` | Modifies the intensity or a specific state of the role. |

## 3. Automatic Contrast Engine

To ensure accessibility and prevent "invisible text," `M3Surface` implements a hierarchical contrast resolution system. It automatically determines the appropriate text color (On-Color) based on the selected background role.

### Resolution Hierarchy:
1. **Explicit Token**: If `role` is `primaryContainer`, it first looks for `onPrimaryContainer`.
2. **Base On-Role**: If the specific container token is missing, it falls back to the base role (e.g., `onPrimary`).
3. **Global Fallback**: If all else fails, it defaults to the global `onSurface` token.

This ensures that regardless of the palette changes, text remains legible.

## 4. The Profile Matrix (Size-Driven Identity)

The `size` prop simplifies the implementation of M3's complex depth and radius rules. Instead of managing radius and elevation separately, the `size` prop applies a coordinated profile.

| Size | Radius | Elevation | Background Role (Typical) | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **XS** | `4px` | `0` | `surfaceContainerLow` | Small tags, indicators |
| **SM** | `8px` | `1` | `surfaceContainer` | Buttons, small inputs |
| **MD** | `12px` | `2` | `surfaceContainerHigh` | Cards, list items |
| **LG** | `16px` | `3` | `surfaceContainerHighest` | Modals, section blocks |
| **XL** | `24px` | `4` | `surface` | Page wrappers, main containers |

## 5. Implementation Details

- **Morphing**: All transitions for `border-radius` and `background-color` are handled via CSS transitions to ensure GPU-accelerated smoothness.
- **Shadows**: Uses `drop-shadow()` filters instead of `box-shadow` to maintain visual fidelity during radius morphing and to respect transparency in the surface.
