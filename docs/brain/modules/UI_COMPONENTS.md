# UI Component Library Module

> **Source**: `src/components/ui/`  
> **Last Verified**: 2026-11-09

---

## Overview

31 shadcn/ui components are installed. These are copied into the project — they are NOT a runtime npm dependency. The `components.json` file controls the CLI configuration.

---

## Components Used in Portfolio Page

| Component | Used For |
|-----------|---------|
| `Badge` | Intro pill, skill badges, date labels, project tags |
| `Button` | All buttons (CTA, carousel arrows, social links, nav buttons) |
| `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` | All card layouts |
| `Sheet`, `SheetContent`, `SheetTrigger`, `SheetClose` | Mobile navigation drawer |
| `Separator` | Imported but not directly visible in current layout |

---

## Components Installed but Not Used

| Component | Available If Needed |
|-----------|---------------------|
| `Accordion` | FAQ sections, expandable content |
| `AlertDialog` | Confirmation dialogs |
| `Alert` | Notification banners |
| `Avatar` | User profile pictures |
| `Calendar` | Date selection |
| `Chart` | Data visualizations (uses recharts) |
| `Checkbox` | Form inputs |
| `Dialog` | Modals |
| `DropdownMenu` | Context menus |
| `Form` | Form wrapper with react-hook-form integration |
| `Input` | Text input fields |
| `Label` | Form labels |
| `Menubar` | Application menu bar |
| `Popover` | Floating content |
| `Progress` | Progress bars |
| `RadioGroup` | Radio button groups |
| `ScrollArea` | Custom scrollable containers |
| `Select` | Dropdown select |
| `Skeleton` | Loading state placeholders |
| `Slider` | Range input |
| `Switch` | Toggle switches |
| `Table` | Data tables |
| `Tabs` | Tab panels |
| `Textarea` | Multi-line text input |
| `Toast`, `Toaster` | Toast notifications (Toaster is in layout, but no toasts currently triggered) |
| `Tooltip` | Hover tooltips |

---

## Rules for shadcn/ui Components

1. Do NOT manually edit files in `src/components/ui/` unless absolutely necessary
2. To add a new component: `npx shadcn-ui add <component-name>`
3. To update an existing component: re-run `npx shadcn-ui add` (it will ask to overwrite)
4. The style is `"default"` with `"baseColor": "neutral"` (per `components.json`) — but the actual colors are overridden by `globals.css` custom properties

---

## Related Documents

- [architecture/FRONTEND.md](../architecture/FRONTEND.md)
- [TECH_STACK.md](../TECH_STACK.md)
