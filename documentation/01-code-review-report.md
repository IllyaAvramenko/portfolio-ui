# Portfolio UI — Code Review Report v0.1.0

**Date:** 2026-03-22
**Project:** ann-portfolio (portfolio-ui)
**Stack:** React 19, TypeScript 4.9.5, CRA, i18next, Formik, Swiper, Axios
**Total LOC:** ~2500

---

## Overall Grade: 4.2 / 10

| Category | Grade | Status |
|---|---|---|
| React Components | 4/10 | Needs significant work |
| CSS / Styling | 3.5/10 | Needs significant work |
| Project Structure | 4.5/10 | Needs significant work |
| HTML / Accessibility (a11y) | 3/10 | Critical state |
| TypeScript Typing | 5/10 | Satisfactory |
| Testing | 0/10 | Absent |
| DX (Developer Experience) | 3/10 | Needs significant work |

---

## Issues Summary

| Severity | Components | CSS | Structure | HTML/a11y | **Total** |
|---|---|---|---|---|---|
| **Critical** | 6 | 3 | 3 | 5 | **17** |
| **Major** | 6 | 6 | 5 | 12 | **29** |
| **Minor** | 10 | 5 | 9 | 12 | **36** |
| **Total** | 22 | 14 | 17 | 29 | **82** |

---

## 1. React Components Review

### Critical

#### 1.1. `@ts-ignore` and `any` types
- `src/pages/Home/HomePage.tsx:57-61` — Double `@ts-ignore` in Swiper `onInit` handler. Parameter `swiper` typed as `any`. Bypasses TypeScript, may cause runtime errors on Swiper update.
- `src/components/Modal/Modal.tsx:72-73` — `@ts-ignore` for `event.target.classList`. Should use `(event.target as HTMLElement).classList.contains(...)`.
- `src/components/LanguageSwitcher/LanguageSwitcher.tsx:6` — `FaChevronDown as FC<any>` — explicit `any`.
- `src/components/Footer/Footer.tsx:6` — `FaFacebookF as FC` and `FaInstagram as FC` — cast without props typing.

#### 1.2. Hardcoded data
- `src/components/ArtworkGrid/ArtworkGrid.tsx:13-38` — `artworks` array hardcoded with test picsum.photos URLs. Data should come from props or API.
- `src/pages/Home/HomePage.tsx:9-16` — `imageUrls` array with picsum.photos hardcoded. Commented-out Dropbox URLs on lines 18-23 left in production code.

#### 1.3. Hardcoded strings without i18n
- `src/pages/Contact/ContactPage.tsx:25` — `"Thank you! Your message has been successfully submitted."` — not translated.
- `src/pages/Contact/ContactPage.tsx:29` — `"Oops! Something went wrong. Please try again later."` — not translated.
- `src/pages/Contact/ContactPage.tsx:10-14` — Yup validation messages (`'Required field'`, `'Invalid email'`) — not translated.
- `src/components/Tabs/Tabs.tsx:107` — `"Tab not found"` — not translated.
- `src/components/Tabs/ResponsiveTabs/ResponsiveTabs.tsx:29` — `"Close Menu"` / `"Open Menu"` — not translated.
- `src/api/api.ts:18` — `'Something went wrong'` — not translated.

### Major

#### 2.1. Code duplication and overlapping responsibilities

- **Text vs Title + Paragraph**: `Text` component (`src/components/Text/Text.tsx`) renders `<h2>` + array of `<p>`, while separate `Title` and `Paragraph` components exist. `Text` does not compose `Title`/`Paragraph` — logic duplication. Recommendation: compose `Text` from `Title` + `Paragraph` or eliminate duplication.

- **Duplicate resize listener**: Mobile detection logic (`window.innerWidth <= 768`) duplicated in `Header.tsx:66-78` and `Tabs.tsx:27-38`. Should be a shared `useIsMobile()` hook.

- **Duplicate body overflow**: Direct `document.body.style.overflow` manipulation duplicated in `HamburgerMenu.tsx:23-24` and `Modal.tsx:59-68`. Should be a shared `useBodyScrollLock()` hook.

- **ResponsiveTabs vs Tabs**: `ResponsiveTabs` (`src/components/Tabs/ResponsiveTabs/ResponsiveTabs.tsx`) duplicates accordion functionality from `Tabs`. Not exported from `components/index.ts`, likely unused.

#### 2.2. Architectural issues

- `src/components/ArtworkGrid/ArtworkGrid.tsx:41` — `const [isSingleColumn] = useState(false)` — state without setter, effectively a constant. Commented-out `toggleColumn` on line 44. Dead code.
- `src/components/ArtworkGrid/ArtworkGrid.tsx:57` — CSS class logic inverted: `${!isSingleColumn ? "single-column" : ""}` — when `isSingleColumn` is `false`, class `"single-column"` is added.

#### 2.3. Modal component — too specific

- `src/components/Modal/Modal.tsx` — Modal accepts `imageSrc`, `title`, `dimensions`, `medium` instead of `children`. Not reusable. Generic Modal should accept `children` as content.

#### 2.4. Direct DOM manipulation

- `src/components/LanguageSwitcher/LanguageSwitcher.tsx:20-22,27-29` — Direct `ref.current.style.visibility` setting instead of React state. Anti-pattern in React.

### Minor

#### 3.1. Index as key
- `src/components/Header/Header.tsx:91,94` — `key={i}` for nav items. Better to use `item.url`.
- `src/components/ArtworkGrid/ArtworkGrid.tsx:59` — `key={index}` for artworks.
- `src/pages/Home/HomePage.tsx:75` — `key={index}` for slides.

#### 3.2. Commented-out code
- `src/components/Footer/Footer.tsx:5,12-20` — Commented-out FacebookIcon and its markup.
- `src/components/ArtworkGrid/ArtworkGrid.tsx:44,51-56` — Commented-out toggleColumn and button.
- `src/pages/Home/HomePage.tsx:18-23` — Commented-out Dropbox URLs.
- `src/components/Header/Header.tsx:43-46` — Commented-out Mentoring menu item.

#### 3.3. Inconsistent naming
- File `src/pages/About/About.tsx` exports `AboutPage`, but file is named `About.tsx`, not `AboutPage.tsx`. All other pages have `Page` suffix in filename.

#### 3.4. Inconsistent type definitions
- Some components use `interface` (Button, Input, Main, Text), others use `type` (Modal, ArtworkItem, CardIcon, HamburgerMenu). Should pick one approach.

#### 3.5. Input tightly coupled to Formik
- `src/components/Input/Input.tsx` — uses `useField` from Formik, making component unusable outside Formik context. For a general component library, better to have a base Input without form library dependency.

#### 3.6. Semantic HTML
- `src/pages/Home/HomePage.tsx:40` — `<main>` inside `Main` component which already renders `<main>`. Creates nested `<main>` — HTML semantics violation.

#### 3.7. Missing memoization
- `src/components/Header/Header.tsx:68` — `getHeaderNavigation(t)` called on every render. Should be wrapped in `useMemo`.

#### 3.8. API layer
- `src/api/api.ts:17-18` — `catch (err)` swallows original error, throws new `Error` with generic message. Loses useful debug information.

---

## 2. CSS / Styling Review

### Critical

#### 1.1. `.artwork-item` duplicated in two files
- `src/components/ArtworkGrid/ArtworkGrid.css:11-14` — defines `.artwork-item` with `flex`, `box-sizing`
- `src/components/ArtworkItem/ArtworkItem.css:1-7` — defines `.artwork-item` with same properties + `cursor` and `transition`

Same for `.artwork-item img` — duplicated in both files. Direct style conflict; load order determines which styles apply.

#### 1.2. No CSS variables for colors
Colors hardcoded everywhere:
- `#201a16` — Header.css:2, Footer.css:2, HamburgerMenu.css:42, LanguageSwitcher.css:40, ContactPage.css:64
- `#1a1613` — Button.css:2,20, Input.css:46, ContactPage.css:64
- `#9c9999` — Header.css:34, HamburgerMenu.css:83, LanguageSwitcher.css:68
- `white` / `#fff` — everywhere
- `#555` — ArtworkGrid.css:35, Input.css:11
- `crimson` — Input.css:17,54,61,68

#### 1.3. Wrong media query order in ContactPage.css
- `@media (max-width: 768px)` on line 89
- `@media (max-width: 992px)` on line 113
- `@media (max-width: 1024px)` on line 124

Order is **wrong** for desktop-first — should be from largest to smallest. 768px styles get overridden by 992px styles. **This is a rendering bug.**

### Major

#### 2.1. `.form-row` duplicated
- `src/components/Input/Input.css:22-26` — `.form-row`
- `src/pages/Contact/ContactPage.css:57-61` — `.form-row` (different properties)

#### 2.2. `.submit-btn` vs `.button`
- `src/pages/Contact/ContactPage.css:63-72` — `.submit-btn` repeats styles from `src/components/Button/Button.css:1-17`. Should use shared Button component.

#### 2.3. Duplicate `.tab-label` and `.accordion-tab-label`
- `src/components/Tabs/Tabs.css:30-52` vs `src/components/Tabs/Tabs.css:100-123` — nearly identical styles within the same file.

#### 2.4. Breakpoint variables defined but never used
- `src/index.css:27-33` — `--breakpoint-xs` through `--breakpoint-xl` defined but no CSS file uses `var(--breakpoint-*)`. Note: CSS custom properties cannot be used in media queries without `@custom-media`.

#### 2.5. Inconsistent breakpoints
8 different breakpoints used: `480px`, `600px`, `768px`, `880px`, `992px`, `1024px`, `1200px`. Some non-standard (880px, 600px). No unified system.

#### 2.6. Magic numbers
Many hardcoded values without explanation:
- `Main.css:11` — `width: 78%`
- `LanguageSwitcher.css:4` — `margin-bottom: -3px` (hack)
- `Loader.css:12` — `left: calc(50% - 12px)` instead of `transform: translateX(-50%)`

### Minor

#### 3.1. Naming convention inconsistency
Mix of BEM-like (`.footer__icon`, `.nav__item`), flat (`.button`, `.tabs`), component-based (`.hamburger-menu`), and page-specific (`.contact-wrapper`).

#### 3.2. No CSS Grid usage
`ArtworkGrid.css` uses flexbox with `flex-wrap` where CSS Grid would be more natural.

#### 3.3. Global CSS (no CSS Modules)
All classes global — risk of name conflicts (`.hidden` in CardIcon.css:18, `.menu` in ResponsiveTabs.css:13).

#### 3.4. `outline: none` without alternative
- `ArtworkGrid.css:58` — `.button-toggle:focus { outline: none }` without alternative focus indicator
- `LanguageSwitcher.css:23` — `.dropdown-toggle:focus { outline: none }`

#### 3.5. Duplicate margin declarations
- `HamburgerMenu.css:90-92` — `margin-left: 15px; margin-top: 10px;` immediately overridden by `margin: 10px 0 10px 15px;`
- `ContactPage.css:103-105` — `margin: 0;` immediately overridden by `margin: 1rem 0 0 0;`

### Positive
- No `!important` anywhere
- Flexbox used well and consistently
- Transitions are smooth (0.2s-0.3s)
- Dropdown animation uses `opacity` + `transform` (GPU-accelerated)

---

## 3. Project Structure Review

### Critical

#### 1.1. CRA deprecated
Project uses Create React App (`react-scripts 5.0.1`) — `package.json:24`. CRA is officially deprecated. Security issues with outdated dependencies, slow builds.

**Recommendation:** Migrate to Vite.

#### 1.2. TypeScript 4.9.5 with React 19
`package.json:26` — too old. React 19 requires TS 5.x for proper type support. Update to TypeScript 5.4+.

#### 1.3. IE11 in browserslist + polyfills
`package.json:48` includes `"ie 11"`. React 19 **does not support IE11**. `core-js`, `whatwg-fetch` in `src/index.tsx:2-3` are dead code increasing bundle size. Also `"Android >= 5"` and `"Chrome >= 49"` are too aggressive for 2026.

### Major

#### 2.1. Testing libraries in dependencies
`@testing-library/*`, `@types/jest` in `dependencies` instead of `devDependencies` (`package.json:6-10`). Not needed in production bundle.

#### 2.2. Outdated @types/node
`@types/node: ^16.18.126` (`package.json:11`) — very old. Update to `^20` or `^22`.

#### 2.3. API error handling
`api.ts:17-18` — original error ignored, generic `'Something went wrong'` thrown instead.

#### 2.4. No tests
`setupTests.ts` exists but **no actual tests** in the project. Testing libraries installed but unused.

#### 2.5. Minimal code quality tooling
ESLint configured minimally via `package.json:37-41` — only basic `react-app` config. No Prettier, Husky, lint-staged.

### Minor

- `@types/react-icons: ^3.0.0` deprecated — `react-icons` v5 includes own types
- `web-vitals: ^2.1.4` not used anywhere in code
- `tsconfig.json:3` — `"target": "es5"` unnecessary with React 19
- `.ts` extension in import (`src/api/index.ts:1`) — non-standard practice
- Language code `ua` in `i18n.ts:13` — non-standard ISO 639-1. Correct code is `uk`
- Inconsistent page naming (`About.tsx` vs `HomePage.tsx`)
- `BrowserRouter` used in v6 compatibility mode with react-router-dom v7
- No 404 page (silent redirect to `/`)
- Google Fonts loaded synchronously in `index.html:5` (render-blocking)

### Positive
- Folder structure is logical: `components/`, `pages/`, `api/`, `i18n/`
- Each component has its own folder with `.tsx` + `.css`
- Barrel exports are consistent and complete
- `.gitignore` is adequate
- Translations (en.json, ua.json) are complete and well-structured

---

## 4. HTML / Accessibility (a11y) Review

### Critical

#### 1.1. Modal is completely inaccessible
`src/components/Modal/Modal.tsx:80-108`:
- No `role="dialog"` or `aria-modal="true"` — screen readers don't recognize it as modal
- No `aria-label` or `aria-labelledby`
- No focus trap — user can Tab out of modal
- No Escape key handling
- No focus management on open/close
- Close button has no `aria-label="Close"`

**WCAG violations:** 2.1.1, 2.1.2, 2.4.3, 4.1.2

#### 1.2. Clickable `<div>` without keyboard support
- `src/components/ArtworkItem/ArtworkItem.tsx:17` — Clickable `<div>` without `role="button"`, `tabIndex={0}`, or `onKeyDown`. Inaccessible from keyboard. **WCAG 2.1.1**

#### 1.3. Tabs without ARIA roles
`src/components/Tabs/Tabs.tsx:86-98` — Tabs lack `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`. **WCAG 4.1.2**

#### 1.4. Duplicate `<main>` landmark
`src/pages/Home/HomePage.tsx:40` — `<main>` inside `Main.tsx` which already renders `<main>`. Only one `<main>` landmark allowed per page. **WCAG 1.3.1**

#### 1.5. Modal focus management
After opening modal, focus doesn't move to it. After closing, focus doesn't return to trigger element. **WCAG 2.4.3**

### Major

#### 2.1. Keyboard inaccessible interactive elements
- `Header.tsx:82` — Logo is `<div>` with `onClick`. Should be `<a>` or `<button>`. **WCAG 2.1.1**
- `Tabs.tsx:60-67, 88-90` — Tab labels are `<div>` with `onClick`. Should be `<button>`. **WCAG 2.1.1**
- `HamburgerMenu.tsx:48-53` — Menu items with submenu are `<div>` with `onClick`. **WCAG 2.1.1**
- `LanguageSwitcher.tsx:40-48` — `<li>` elements have `onClick` but no `tabIndex` or keyboard handling. **WCAG 2.1.1**
- `ResponsiveTabs.tsx:35-46` — Menu items are `<div>` with `onClick`. **WCAG 2.1.1**

#### 2.2. Missing ARIA attributes
- `Tabs.tsx:51` — Accordion toggle uses `<div>` with `onClick` instead of `<button>`. No `aria-expanded`. **WCAG 4.1.2**
- `LanguageSwitcher.tsx:32-51` — Dropdown without `aria-haspopup`, `aria-expanded`, `role="listbox"`. **WCAG 4.1.2**
- `HamburgerMenu.tsx:38` — Hamburger button has no `aria-label`, `aria-expanded`, `aria-controls`. **WCAG 4.1.2**
- `Loader.tsx:5` — Empty `<div>` without `role="status"`, `aria-live="polite"`. **WCAG 4.1.3**

#### 2.3. LanguageSwitcher accessibility
Works only via CSS hover — inaccessible on touch devices, inaccessible from keyboard, doesn't update `lang` attribute on `<html>`.

#### 2.4. HamburgerMenu focus management
After opening menu, focus doesn't move inside. After closing, doesn't return to hamburger button.

#### 2.5. No `<h1>` on HomePage
`src/pages/Home/HomePage.tsx` — Page has no `<h1>`. **WCAG 1.3.1**

#### 2.6. Accordion toggle misuses heading
`Tabs.tsx:52-54` — Uses `<Title level={2}>` for "+/-" symbol, semantically meaningless.

### Minor

- `Input.tsx:22-26` — `htmlFor={props.name}` but `<input>`/`<textarea>` lack `id={props.name}`. Label-input association broken. **WCAG 1.3.1, 4.1.2**
- `ContactPage.tsx:87-88` — Success/error messages lack `role="alert"` or `aria-live="assertive"`. **WCAG 4.1.3**
- `HomePage.tsx:76` — Alt text `"Slide ${index}"` not descriptive. **WCAG 1.1.1**
- `ContactPage.tsx:68` — Alt text `"Painting"` too generic.
- `HomePage.tsx:48,83` — Slider nav buttons lack `aria-label`. Symbols `‹` and `›` not descriptive.
- `CardIcon.tsx:14-49` — SVG button has no `aria-label`.
- `index.html:2` — `lang="en"` hardcoded. Not updated when switching to UA. **WCAG 3.1.1**
- `index.html:24` — No `<meta name="description">`. No Open Graph meta tags.
- No `loading="lazy"` on images.
- No responsive images (`srcset`, `<picture>`).
- `Tabs.tsx:52-54` — `<Title level={2}>` for "+/-" symbol is semantically meaningless.
- Slider buttons use character symbols without accessible labels.

### Positive
- `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` used properly
- `<blockquote>` and `<cite>` used correctly on HomePage
- Footer external link has `target="_blank"` with `rel="noopener noreferrer"` and `aria-label`
- Navigation uses `<Link>` from react-router
- `Title` component supports dynamic heading levels
- `Image` component accepts `alt` as prop

---

## Refactoring Plan (Phases)

### Phase 1: Infrastructure
1. Migrate CRA -> Vite
2. TypeScript 4.9 -> 5.4+
3. Remove IE11 from browserslist, remove polyfills
4. Configure Prettier + ESLint + Husky + lint-staged
5. Move test dependencies to devDependencies

### Phase 2: CSS System
6. Create CSS variables (`:root`) for colors, spacing, typography
7. Standardize breakpoints (4-5 instead of 8)
8. Eliminate style duplication
9. Migrate to CSS Modules
10. Fix media query order

### Phase 3: Components
11. Remove all `@ts-ignore` / `any` — proper typing
12. Create shared hooks: `useIsMobile()`, `useBodyScrollLock()`
13. Make Modal universal (`children`)
14. Compose Text from Title + Paragraph
15. Move data to API/config
16. Remove commented-out code

### Phase 4: Accessibility (a11y)
17. Modal: `role="dialog"`, focus trap, Escape, focus management
18. Replace clickable `<div>` with `<button>` / `<a>`
19. Tabs: ARIA roles (tablist/tab/tabpanel)
20. Input: add `id` for label association
21. LanguageSwitcher: keyboard accessibility + update `lang`

### Phase 5: i18n & Quality
22. Translate all hardcoded strings
23. Fix language code `ua` -> `uk`
24. Add `<meta name="description">`, OG tags
25. Add `loading="lazy"` to images

### Phase 6: Testing
26. Write unit/integration tests for components
