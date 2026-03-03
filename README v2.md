# TalentOS — AI Hiring Platform Simulator

**React UI Prototype · Switzerland-based AI Hiring Platform**  
`TalentOS-Launcher.jsx` — Version switcher entry point

---

## Project Overview

The AI Sourcing Hub is a module for a Switzerland-based AI-native hiring platform (Talentos), enabling HR teams and recruitment agencies to search for passive candidates sourced from millions of external profiles. All profiles are anonymised until explicitly unlocked. The feature uses a **pay-per-unlock credit model** — 1 credit reveals a full candidate profile including name, email, phone, LinkedIn, and employer.

The prototype was built incrementally across multiple sessions, each adding meaningful capability. The project now spans two major artefacts:

- **AI Sourcing Hub (v5.0)** — The standalone ATS platform with AI search, candidate pools, job pipelines, outreach workflows, GDPR compliance, and corporate dashboard.
- **Integrated Simulator (v6.0)** — The Hub combined with the AI Talent Scout browser extension, demonstrating bidirectional data flow from external profile capture to ATS pipeline.

A **TalentOS Launcher** serves as the unified entry point, letting you choose which version to run.

---

## Quick Start

```bash
# Clone the repo
git clone <your-repo-url>
cd simulators

# Drop into an existing React project
cp TalentOS-Launcher.jsx src/App.jsx
cp AI-Sourcing-Hub_v5.jsx src/AI-Sourcing-Hub_v5.jsx
cp AI-Sourcing-Hub-Integrated-v6.jsx src/AI-Sourcing-Hub-Integrated-v6.jsx

# Install deps if needed
npm install react react-dom

# Run
npm start
```

To run a specific version directly (bypassing the launcher):
```bash
# Run v5 standalone
cp AI-Sourcing-Hub_v5.jsx src/App.jsx

# Run v6 standalone
cp AI-Sourcing-Hub-Integrated-v6.jsx src/App.jsx
```

Each component has no external dependencies beyond React itself. Fonts are loaded from Google Fonts via a `<style>` injection at runtime.

---

## File Structure

```
/simulators
  ├── TalentOS-Launcher.jsx                ← Entry point: version switcher UI
  ├── AI-Sourcing-Hub_v5.jsx               ← Standalone ATS (1,808 lines)
  │   └── export default function AppV5()
  ├── AI-Sourcing-Hub-Integrated-v6.jsx    ← Hub + Extension (755 lines)
  │   └── export default function AppV6()
  ├── ai-talent-scout-simulator.jsx        ← Standalone extension reference (1,419 lines)
  └── README.md                            ← This file
```

### Launcher Wiring

The launcher contains inline stub placeholders that render when imports are unavailable (e.g. in artifact environments). In your actual git repo, connect the real components:

```jsx
// In TalentOS-Launcher.jsx — replace stubs with imports:
import AppV5 from './AI-Sourcing-Hub_v5';
import AppV6 from './AI-Sourcing-Hub-Integrated-v6';

// Then in the VERSIONS array, replace:
Component: AppV5Stub,   →   Component: AppV5,
Component: AppV6Stub,   →   Component: AppV6,
```

---

## Architecture

| Aspect | v5 (Hub) | v6 (Integrated) |
|---|---|---|
| Framework | React 18 (hooks only) | React 18 (hooks only) |
| Styling | Inline styles + injected `<style>` | Inline styles + injected `<style>` |
| Fonts | Playfair Display + Plus Jakarta Sans | Playfair Display + Plus Jakarta Sans + JetBrains Mono |
| State | Local `useState` / `useEffect` | Shared candidate store via lifted state |
| Data | 10 Swiss profiles, 5 jobs, transactions | Hub profiles + extension mock profiles (LinkedIn, GitHub, Indeed, Xing) |
| Theme | Light/Dark toggle, light default | Light/Dark toggle in both Hub and Extension views |
| Lines | 1,808 | 755 |

---

## Version History

---

### v0.1 — Product Specification Document
**Date:** 23 Feb 2026  
**Session:** `2026-02-24-09-01-54-ai-sourcing-hub-product-design.txt`  
**Output:** `AI_Sourcing_Hub_Workflows.docx` (26-page Word document)

This was not a UI session — it was a product management and specification session that laid the entire conceptual foundation for all subsequent UI work.

**What was defined:**

**User Personas**
- **Persona A — Corporate HR Team (In-house Recruiter):** Internal HR/HRBP filling their own roles. Moderate volume (5–30 open roles). Data Controller under GDPR. Credits managed as internal budget. Pain point: low inbound quality for niche/senior roles.
- **Persona B — Recruitment Agency Recruiter:** Sources on behalf of multiple clients. High volume. Data Processor for client Data Controllers. Agency-level credit pools with per-consultant sub-limits. Pain point: speed and scale of sourcing.

**Workflow A — Corporate HR (8 steps):**
1. Credit balance check on module entry; warning threshold alerts
2. AI Search Panel — role title, skills (multi-tag), experience level, location, industry, education, languages, availability signals
3. AI match generation — anonymised profile cards with match score (colour-coded), role title, YOE, skills, location, availability signal. No PII shown.
4. Filter and sort — real-time refinement, saved searches, duplicate exclusion toggles
5. Profile preview drawer — non-identifying career timeline, skill breakdown, AI suitability narrative
6. Profile unlock — compliance attestation checkbox, credit deduction (1 credit), full PII reveal, GDPR Art. 14 notification triggered
7. Post-unlock actions — Add to Candidate Pool, Add to Job Pipeline, Save to Shortlist
8. Outreach and engagement tracking — email templates, outreach status, follow-up reminders

**Workflow B — Agency Recruiter (7 steps):**
1. Sourcing Brief setup — client-linked or speculative, named project reference
2. Advanced search — boolean keyword overlay, competitor exclusion, target employer filter, multi-location, salary band, notice period
3. Bulk review — list view mode, quick-shortlist hover action, sequential batch preview
4. Unlock — individual or batch (up to 10 at once); credit approval workflow for sub-limit overruns; per-candidate GDPR notifications (not combined)
5. Client shortlist — annotate profiles, shareable time-limited links, client view portal
6. Multi-client pool management — multi-brief tagging, free re-use of already-unlocked profiles, conflict detection
7. Pipeline submission and outcome tracking — placement attribution, source ROI

**Credit Model defined:**
- Search: free
- Preview (anonymised): free
- Unlock (full PII): 1 credit
- Batch unlock: 1 credit per profile
- Re-use of already-unlocked profile: free
- Failed unlock: 0 credits

**Credit bundles:** Starter (50), Growth (200 + 10% bonus), Professional (500 + 15% bonus), Enterprise (custom)

**Anonymisation tiers:**
- Pre-unlock: name hidden, photo hidden, email hidden, phone hidden, LinkedIn hidden, employer anonymised as "Large Technology Company", location city-level only
- Post-unlock: all fields revealed

**Compliance framework (GDPR Art. 14 / Swiss nDSG Art. 19):**
- Legal basis: Legitimate Interests + publicly available data
- Candidate notification on every unlock (platform-managed, not manual)
- Opt-out link in every notification → immediate suppression + 72h provider propagation
- Full data subject rights: access, erasure, rectification, objection, portability
- Data provider certification requirements: ISO 27001, 90-day update cycle, no special category data
- Max data retention: 12 months from unlock; audit log retained 3 years

**Recommended improvements captured:** JD auto-parser, saved searches + alerts, compare profiles (4-way), AI outreach draft generator, credit trial allocation (5 free credits), cost estimator, client feedback integration, blind scoring collaboration, source ROI metrics, candidate opt-out portal, DPIA documentation tool.

**4-phase rollout plan:**
- Phase 1 (M1–3): Core search, anonymised results, single unlock, GDPR notification
- Phase 2 (M4–6): JD parser, saved searches, compare, AI outreach draft, batch unlock
- Phase 3 (M7–9): Agency briefs, client portal, blind scoring, multi-brief pools
- Phase 4 (M10–12): ROI analytics, diversity signals, AI role decomposition, LinkedIn integration

---

### v1.0 — Initial React UI
**Date:** 24 Feb 2026 (afternoon)  
**Session:** `2026-02-24-16-27-59-ai-sourcing-hub-ui-redesign.txt`

First working React implementation. Built from scratch as a fully interactive browser prototype.

**Design system:**
- Dark glassmorphism aesthetic — deep navy base (`#080C14`), frosted glass cards
- Teal/violet gradient accents
- Fonts: Syne (headings) + DM Sans (body)

**Pages implemented:**
- **AI Sourcing Hub** — search page with source toggle buttons (LinkedIn, GitHub, Indeed, Xing, Glassdoor, Stack Overflow), AI vs Manual search filter modes presented as prominent button pair
- **Results page** — anonymised profile cards with match score badges (colour-coded green/amber/red), matched skills highlighted in teal, availability signal, quick-view expand
- **Profile modal** — tabbed view (Overview, Skills, Career, Insights), animated unlock workflow, post-unlock contact grid revealing full PII, actions bar (Add to Pool, Add to Pipeline)
- **Candidate Pool** — table view of unlocked candidates with status, job assignment
- **Credits dashboard** — balance hero widget, usage breakdown bar chart, credit cost table, top-up bundle cards, transaction history

**Data:** 8 Swiss candidate profiles hardcoded with realistic details (Zürich, Basel, Geneva, Bern, etc.), 5 open jobs, transaction history.

**Credit system live:** Unlock deducts 1 credit from balance; balance updates in header in real time.

**Toast notification system:** Non-blocking corner toasts for unlock confirmations, pipeline adds, pool adds.

**GDPR compliance visible:** Privacy notice on search page, compliance attestation checkbox in unlock modal, GDPR notification confirmation in toast copy.

---

### v2.0 → v3.0 — Theme Toggle + Professional Typography + Candidate Pool
**Date:** 24 Feb 2026  
**Session:** `2026-02-24-16-38-27-ai-sourcing-hub-v3-upgrade.txt`

**Changes from v1.0 to v3.0:**

**Light/Dark theme toggle:**
- Full dual-theme system with `THEMES` object holding both token sets
- Toggle button in sidebar footer — persists within session
- All colours, backgrounds, borders, shadows respond to theme

**Typography upgrade:**
- Replaced Syne + DM Sans with **Playfair Display** (headings, numbers) + **Plus Jakarta Sans** (body, UI)
- More professional, enterprise-appropriate feel
- Refined font sizing hierarchy

**Candidate Pool page — rebuilt:**
- Full table with sortable columns: Name, Score, Location, Experience, Assigned Job, Date Added
- Search/filter bar to find candidates within pool
- Bulk job assignment — select multiple candidates → "Assign to Job" → dropdown modal → confirm
- Pool stats: total count, assigned count, unassigned count, average score
- Remove-from-pool action
- Empty state illustration when pool is empty

**Unlocked profile sample data expanded:**
- 8 candidates with full PII for post-unlock display: name, email, phone, LinkedIn URL, GitHub, employer
- Realistic Swiss contacts (e.g., `lena.muller@email.ch`, `+41 79 234 5678`)

**Minor UX improvements:**
- Hover state refinements on cards
- Better active state on nav items
- Smooth transition on theme change

---

### v3.x — Bug Fixes
**Date:** 24 Feb 2026  
**Session:** `2026-02-24-17-02-03-conversation_summary.md`

Three critical bugs prevented the app from rendering. Fixed in this session:

| Bug | Location | Cause | Fix |
|---|---|---|---|
| JSX syntax error | Line 1091 | Stray quote character in inline style object | Removed erroneous `"` |
| ProfileModal crash | `ProfileModal` component | `_startUnlocked` prop referenced before definition | Moved prop to correct position in destructuring |
| Unused import warning (build break) | Top of file | `useCallback` imported but never used | Removed unused import |

**Git workflow also documented** in this session — instructions for committing and pushing to GitHub provided to user.

---

### v4.0 — AI Prompt Search · Smart Shortlist · Grid/List View · Bulk Unlock · Job Pipeline
**Date:** 24 Feb 2026  
**Session:** Current session

The most significant feature release. Six new features added in a complete rewrite of the component.

---

#### 1. Light Mode as Default
The `isDark` state is now initialised to `false`. Light mode is the primary experience. The dark theme remains fully available via the sidebar toggle (🌙 / ☀️).

**Light theme tokens refined:** softer shadows, higher contrast text, `#F5F7FA` page background, `#FFFFFF` card surfaces.

---

#### 2. Clean LLM-Style Search Interface
The search page was redesigned around a large, minimal textarea — matching the interaction pattern of AI chat interfaces.

**Before (v3):** Prominent AI / Manual filter buttons side by side at the top; sources as large labelled buttons.

**After (v4):**
- Large textarea: `"Describe who you're looking for…"` placeholder
- `⌘↵ to run` hint in the input footer
- Mode toggle moved to two small icon buttons in the top-right corner: `✦` (AI) and `⊞` (Manual) — visually quiet until needed
- Source selection redesigned as compact emoji+label pills: `💼 LinkedIn`, `🐙 GitHub`, `🔍 Indeed`, `✦ Xing`, `🚪 Glassdoor`, `📚 Stack Overflow` — with individual colour accents on selection
- All/None quick toggles for sources
- Four suggested prompt chips below the input for one-click inspiration

---

#### 3. Manual / Boolean Search Mode
Toggling `⊞` reveals a structured filter panel that slides in with a `fadeIn` animation.

**Fields:**
- **Keyword / Boolean search** — supports `AND`, `OR`, `NOT` operators and quoted phrases. Hint text: `"DevOps" AND ("Kubernetes" OR "K8s") NOT "Junior"`
- **Location** — free text (e.g., `Zürich, Switzerland`)
- **Experience Level** — dropdown: Any / Junior (0–2 yrs) / Mid (3–5 yrs) / Senior (6–10 yrs) / Lead/Principal (10+ yrs)
- **Required Skills** — tag builder with `+ Add` button and `×` remove; Enter key also adds a skill

Both modes share the same source pills, Smart Shortlist button, and Search button.

---

#### 4. Smart Shortlist Feature (10 credits)
Accessible via the amber **✦ Smart Shortlist** button on both AI and Manual search pages.

**Flow:**
1. User clicks Smart Shortlist → confirmation modal opens
2. Modal shows cost breakdown: 10 credits · 10 profiles unlocked · balance after
3. "What you get" checklist: AI ranking, all 10 unlocked, GDPR notifications sent automatically
4. GDPR attestation checkbox (required)
5. Confirm → loading state → navigates to Smart Shortlist results page

**Smart Shortlist results page:**
- Rank badges `#1` – `#10` (top 3 in amber, rest grey)
- First 3 profiles fully unlocked (name, email, phone visible in card)
- Profiles 4–10 locked with individual "Unlock – 1 cr" button
- Checkbox selection on unlocked profiles → "Add X to Pool" bulk action
- "✦ 10 credits used" and "AI Selected" tags in page header
- Compliance footer: notification confirmation + 90-day retention notice

---

#### 5. Results Page — Grid / List View Toggle
The results page now has a view toggle in the top-right: `⊟` (Grid) and `☰` (List).

**Grid view:** Responsive CSS grid (`auto-fill, minmax(288px, 1fr)`), score-colour accent bar at top of each card, skill pills, availability indicator, hover lift effect.

**List view:** Table layout with columns: checkbox · Candidate (title + industry) · Score · Location · Experience · Availability · Action. Dense and scannable.

**Filter sidebar (both views):**
- Sort by Match Score or Experience (toggle buttons)
- Minimum score slider (0–90%, step 5)
- Availability toggle (open signals only)
- Live selection counter with Bulk Unlock CTA when profiles are selected

---

#### 6. Bulk Unlock
Multi-select checkboxes appear on every profile card (grid) and every row (list).

**Selection UX:**
- Individual checkbox on each card/row
- "Select All" button in results header
- Selection count shown in sidebar filter panel and in header
- Bulk Unlock button appears dynamically when ≥1 profile selected

**Bulk Unlock modal:**
- Total cost (N credits)
- Number of profiles
- GDPR attestation checkbox
- Confirm → loading spinner → success state with notification count
- On success: closes modal, clears selection, triggers toast

---

#### 7. Frictionless Single Unlock
Individual unlocks (from profile modal) also improved:

**Before (v3):** Unlock button opened the full unlock state directly.

**After (v4):** Unlock button → compact sub-modal within the modal (not a separate modal) showing:
- Cost (1 credit) and balance after
- GDPR attestation checkbox
- Cancel / Confirm buttons
- Loading state with spinner
- On confirm: profile data reveals, modal transitions to unlocked view with green "🔓 Unlocked" tag

---

#### 8. Profile Modal — Enhanced Unlocked State
When a profile is unlocked, the Overview tab shows a teal-highlighted contact grid:

- 👤 Name · 📧 Email · 📞 Phone · 🔗 LinkedIn · 💻 GitHub · 🏢 Employer

All in a 3-column grid with teal borders and background.

**New action bar (unlocked state):**
- Add to Pool · Add to Pipeline · AI Interview (3 credits, violet)
- Job assignment dropdown — select a job role → "Assign →" button links candidate to that pipeline
- All actions show confirmation states (✓ In Pool, ✓ In Pipeline, ✓ Scheduled)

**AI Interview sub-modal:**
- Cost: 3 credits · balance after
- Features summary: custom screening, auto scoring, video analysis, report
- GDPR confirmation checkbox
- Violet styled confirm button

---

#### 9. Job Pipeline Page
Full implementation (was a placeholder in v3).

**Left sidebar:** List of 5 open jobs with dept, location, open position count, candidate count badge. Active job highlighted with teal border.

**Job header:** Title, open count badge, location, department. Full JD preview in a subtle callout block.

**Source Candidates for this Role button:** The key integration feature.
- Clicking this button navigates to the AI Sourcing Hub search page
- The job description is pre-filled into the AI prompt textarea automatically
- Format: `{job.jd} Location: {job.location}. Role: {job.title}.`
- Toast confirms: `"Sourcing launched for: {job.title}"`

**Kanban board:** 6 stages — Sourced · Contacted · Screening · Interview · Offer · Hired
- Stage headers with per-stage candidate count badges, colour-coded per stage
- Candidate cards showing avatar, name, title, score badge, location
- Click any card → opens Profile Modal in unlocked state
- Empty columns show "No candidates" placeholder
- Demo data populates the board on first load

---

### v5.0 — Corporate Dashboard · Outreach Workflows · GDPR Notification Log
**Date:** 25 Feb 2026  
**File:** `AI-Sourcing-Hub_v5.jsx` (1,808 lines)

The ATS platform reaches feature-complete status with three major additions: a Corporate HR Dashboard as the default landing page, a full outreach workflow system, and a GDPR candidate notification log.

---

#### 1. Corporate HR Dashboard (Default Page)
The dashboard replaces the AI Sourcing Hub as the default landing page. Designed for corporate HR managers who need an at-a-glance view of their sourcing pipeline.

**KPI Cards (top row):**
- Credits remaining (with balance and usage trend)
- Profiles unlocked (cumulative count)
- Candidates in pool (with unassigned highlight)
- Active pipeline candidates (across all jobs)
- AI Interviews scheduled

**Welcome banner:**
- Greeting with user name
- Quick-action buttons: "◎ Start Sourcing" and "⟳ View Pipeline"
- Summary text describing current hiring activity

**Quick-access cards (bottom):**
- Three cards linking to AI Sourcing Hub, Job Pipeline, and Credits
- Hover lift effect with colour-coded accents

---

#### 2. Outreach Workflow System
Full outreach management page accessible from the sidebar navigation.

**Candidate list (left panel):**
- All candidates in outreach pipeline with status indicators
- Statuses: Not Contacted, Contacted, Responded, Meeting Booked
- Colour-coded status dots (grey → blue → green → teal)
- Click to select and view conversation thread

**Message thread (right panel):**
- Chronological message history with directional indicators (outbound/inbound)
- Date stamps and message previews
- Colour-coded borders: teal for outbound, default for inbound

**Outreach templates:**
- Three pre-built templates: Introduction, Role Pitch, Follow-up
- Template selector dropdown
- Subject and body fields with `{{name}}` and `{{role}}` merge variables
- "Send Outreach" button with confirmation toast

**Empty state:**
- When no candidate is selected, shows a centred mail icon with "Select a candidate" prompt

---

#### 3. GDPR / nDSG Candidate Notification Log
Dedicated notifications page tracking all compliance communications.

**Notification table:**
- Columns: Candidate, Type, Status, Date, Opt-out
- Types: Profile Unlock, AI Interview, Outreach
- Statuses: Sent, Delivered, Opened, Opt-out Requested
- Colour-coded status badges

**Opt-out tracking:**
- Candidates who opt out are flagged with a red "Opt-out" badge
- Opt-out processing simulation: click to process → status updates to "Processed"
- 72-hour propagation notice displayed

**Compliance summary cards:**
- Total notifications sent
- Delivery rate
- Opt-out rate
- Average response time

---

#### 4. Navigation Updates
Sidebar navigation expanded to include:
- ◉ Dashboard (new default)
- ◎ AI Sourcing Hub
- ⟳ Job Pipelines
- ❑ Candidate Pool
- ✉ Outreach (new)
- 🔔 Notifications (new)
- ⬡ Credits

---

### v5.1 — Browser Extension PRD
**Date:** 1 Mar 2026  
**Output:** `AI-Talent-Scout-Browser-Extension-PRD.docx`

Product Requirements Document for the AI Talent Scout browser extension — the companion tool that captures candidate profiles from external platforms and imports them into the AI Sourcing Hub.

**Competitive analysis covered:** Greenhouse Sourcing, Lever Sourcing, Workable Sourcing, hireEZ Chrome Extension, Recruit CRM Chrome Extension, Kaspr Extension.

**Key specifications:**
- **Platform support:** LinkedIn, GitHub, Indeed, Xing, Glassdoor, Stack Overflow
- **Capture workflow:** 3 clicks maximum — parse profile → review/enrich → import to ATS
- **AI features:** Match scoring against open roles, skills extraction, seniority detection, job recommendations
- **Duplicate detection:** Exact match (>95% confidence) and probable match handling with merge/create/view options
- **GDPR / Swiss FADP compliance:** Legitimate interest basis, 30-day transparency notice, auto-retention policies, audit logging
- **ATS integration:** Captured candidates enter the "Sourced" stage, can be moved through outreach → AI interviews → pipeline progression
- **Success metrics:** <15s capture time, ≤3 clicks, >95% parse accuracy, >98% duplicate detection

---

### v5.2 — Standalone Extension Simulator
**Date:** 1 Mar 2026  
**File:** `ai-talent-scout-simulator.jsx` (1,419 lines)

A standalone React simulator implementing the browser extension UX as specified in the PRD. Not yet connected to the Hub — functions as an independent demo.

**Features:**
- **Fake browser chrome:** Address bar, traffic light buttons, extension icon with activation pulse
- **Platform tabs:** LinkedIn, GitHub, Indeed, Xing — each with a mock profile page
- **Extension sidebar:** Slides in from the right with parsing animation
- **Profile parsing:** Simulated extraction with progress bar, populates editable fields
- **Editable capture form:** Name, title, company, location, email — click any field to edit
- **Job assignment:** Dropdown with search, AI match score computation (animated)
- **Pool assignment:** Multi-select checkboxes for talent pools
- **Tags and notes:** Recruiter can add custom tags and freeform notes
- **Duplicate detection:** LinkedIn profile (Sarah Chen) triggers duplicate modal with merge/create/view options
- **GDPR compliance panel:** Legitimate interest documentation, expandable details, audit log confirmation
- **Import workflow:** 3-step animated checklist (duplicate check → audit log → record creation)
- **Success state:** Confirmation with GDPR summary and action buttons ("View in ATS", "Start Outreach" — not yet connected)
- **Guided walkthrough:** 6-step guide bar with progress dots
- **Dark theme:** Extension uses a dark theme throughout

---

### v6.0 — Integrated Simulator (Hub + Extension)
**Date:** 2 Mar 2026  
**File:** `AI-Sourcing-Hub-Integrated-v6.jsx` (755 lines)

The unified simulator that connects the browser extension with the AI Sourcing Hub, demonstrating the full candidate journey from external profile capture to ATS pipeline management.

---

#### 1. Architecture — Shared Candidate Store
The root `App` component manages a shared state layer:
- `poolCandidates[]` — candidates in the talent pool
- `pipelineCandidates[]` — candidates assigned to job pipelines
- `extensionCandidates[]` — tracks which candidates came from the extension

Extension callbacks (`onAddToPool`, `onAddToPipeline`) push candidates into the Hub's state. Hub views render all candidates regardless of source, with extension-sourced candidates tagged for attribution.

---

#### 2. Launch Page (Version Router)
A unified entry screen with two cards:
- **AI Sourcing Hub** — launches the full ATS platform (Dashboard, Pool, Pipeline, Outreach, Credits)
- **Browser Extension** — launches the extension simulator

Each card shows feature tags, a gradient accent, and hover lift animation. An integration status badge at the bottom confirms bidirectional data sync.

---

#### 3. Extension → Hub Data Flow
When a candidate is captured in the extension:

**With a job selected:**
- `onAddToPipeline(candidate)` fires
- Candidate is added to both `pipelineCandidates` and `extensionCandidates`
- Appears in the Pipeline kanban under the assigned job's "Sourced" column with a 🧩 badge
- Toast: `"🧩 {name} added to Job Pipeline via Extension"`

**Without a job:**
- `onAddToPool(candidate)` fires
- Candidate is added to both `poolCandidates` and `extensionCandidates`
- Appears in the Pool table with "🧩 Extension" source tag
- Toast: `"🧩 {name} added to Candidate Pool via Extension"`

---

#### 4. Candidate Data Conversion
The `toATSCandidate()` function converts extension profile format to Hub candidate object:

```js
{
  id, name, title, employer, loc, yoe, score, skills, av,
  source: "extension",
  sourcePlatform: "LinkedIn" | "GitHub" | "Indeed" | "Xing",
  sourceUrl: "linkedin.com/in/sarah-chen-ml",
  email, summary, tags, notes,
  assignedJob: "1" | null,
  captureDate: "2026-03-02T14:30:00.000Z",
  gdprDeadline: "2026-04-01"   // 30 days from capture
}
```

---

#### 5. Hub Views — Extension Source Attribution
Extension-sourced candidates are visible across all Hub pages:

**Dashboard:**
- "Recently Sourced via Extension" section with 🧩 icon
- Extension count in the KPI cards row
- Each candidate shows source platform badge and pool/pipeline assignment

**Candidate Pool:**
- Source filter dropdown: "All Sources" / "🧩 Extension Only" / "Hub Only"
- Statistics cards show Hub vs Extension breakdown
- Extension candidates display with violet "🧩 {Platform}" badge

**Pipeline:**
- Extension candidates appear in the kanban with "🧩 Ext" badge
- Source attribution visible alongside match score

**Outreach:**
- Extension-sourced candidates auto-appear with "Not Contacted" status
- 🧩 badge in the candidate list

---

#### 6. Extension Success → Hub Navigation
From the extension's success screen, two integration buttons:

**"◎ View in AI Sourcing Hub →"**
- Switches to Hub mode
- Opens the Candidate Pool page
- Opens the Profile Detail modal for the captured candidate (300ms delay for transition)

**"✉ Start Outreach in Hub"**
- Switches to Hub mode
- Opens the Outreach page
- Toast confirms outreach context

---

#### 7. Profile Detail Modal
Shared modal component showing candidate details with source-aware display:
- Extension-sourced candidates show: source platform, capture URL, GDPR transparency deadline, recruiter tags, recruiter notes
- Hub-sourced candidates show standard profile information
- GDPR deadline highlighted in amber panel: "Privacy notice must be sent by {deadline}"

---

#### 8. Light/Dark Mode — Extension Theme System
The extension now supports both light and dark modes (previously dark-only).

**Implementation:** Two complete extension theme palettes — `XLT` (light, 50+ tokens) and `XDK` (dark, 50+ tokens) — covering every UI element:
- Browser chrome, sidebar, dropdowns, cards, inputs
- Tags, GDPR sections, duplicate modal, success state, action buttons
- Profile page mock content, skills, section backgrounds

**Theme toggle** in the extension header bar (☀️/🌙 button), shared with the Hub so toggling in either module stays in sync.

---

### Launcher v1.0 — Version Switcher
**Date:** 3 Mar 2026  
**File:** `TalentOS-Launcher.jsx`

A lightweight entry point that lets you choose between v5 and v6 at runtime.

**Features:**
- Dark-themed launcher screen with atmospheric background (radial gradients, subtle grid pattern)
- Two version cards with feature tags, line counts, status badges ("Stable" / "Latest"), and gradient accents
- Hover effects: card lift, border glow, arrow slide
- Click a card → renders that version full-screen
- Floating "← Launcher" button (top-right) to return to version picker
- Staggered entrance animations
- Git repo structure hint displayed at the bottom
- Inline stub placeholders for artifact environments (replaceable with real imports)

---

## Data Model

### Candidate Profile (Hub — v5)
```js
{
  id, name, title, employer, loc, yoe, score, edu, industry,
  skills: [...],         // array of skill strings
  matched,               // how many skills match the active search
  avail,                 // boolean — open to opportunities signal
  email, phone, linkedin, github,  // revealed on unlock
  av,                    // avatar colour index
  source,                // source platform id
  summary                // professional summary paragraph
}
```

### Candidate Profile (Extension-sourced — v6)
```js
{
  id, name, title, employer, loc, yoe, score, skills,
  av,                    // avatar colour index
  source: "extension",   // always "extension" for ext-sourced
  sourcePlatform,        // "LinkedIn" | "GitHub" | "Indeed" | "Xing"
  sourceUrl,             // original profile URL
  email, summary, tags, notes,
  assignedJob,           // job ID string or null
  captureDate,           // ISO timestamp
  gdprDeadline           // date string (30 days from capture)
}
```

### Job
```js
{ id, title, dept, location, open, jd }
```

### Transaction (v5)
```js
{ id, type, label, cost, date, icon }
// types: "unlock" | "interview" | "smartlist" | "topup"
```

---

## Credit Costs (as implemented)

| Action | Cost |
|---|---|
| Search | Free |
| View anonymised profile | Free |
| Unlock profile (full PII) | 1 credit |
| Smart Shortlist (10 profiles, all unlocked) | 10 credits |
| AI Interview scheduling | 3 credits |
| Bulk unlock | 1 credit × N profiles |
| Re-use already-unlocked profile | Free |
| Extension capture (no PII reveal) | Free |

---

## GDPR / nDSG Compliance Signals in the UI

Every user-facing unlock action in the prototype includes:
- A compliance attestation checkbox the user must tick before confirming
- Explicit mention of GDPR Art. 14 and Swiss nDSG Art. 19 notification obligations
- Toast copy confirming "GDPR notification sent to candidate"
- Smart Shortlist modal confirms notifications sent to all 10 candidates automatically
- Privacy notice on the search page explaining the anonymisation model

**Extension-specific compliance (v6):**
- Legitimate Interest documentation panel with expandable details
- 30-day transparency deadline tracked per candidate
- Audit log recorded on every import
- Auto-archive at 6 months, auto-delete at 12 months
- Erasure on request supported
- GDPR metadata flows through to the Hub's notification page

---

## Pages / Navigation

### v5 — AI Sourcing Hub (Standalone)

| Nav Item | Status | Description |
|---|---|---|
| ◉ Dashboard | ✅ Complete | KPI cards, welcome banner, quick-access links |
| ◎ AI Sourcing Hub | ✅ Complete | Search (AI + Manual), Results (Grid + List), Smart Shortlist |
| ⟳ Job Pipelines | ✅ Complete | Kanban board, job selector, pipeline-sourcing integration |
| ❑ Candidate Pool | ✅ Complete | Table view, bulk job assignment, search/filter |
| ✉ Outreach | ✅ Complete | Message threads, templates, status tracking |
| 🔔 Notifications | ✅ Complete | GDPR notification log, opt-out tracking |
| ⬡ Credits | ✅ Complete | Balance, usage, pricing, top-up, transactions |
| ◷ AI Interviews | ⚙ Placeholder | Module coming soon |
| ≡ Jobs | ⚙ Placeholder | Module coming soon |
| ⚙ Settings | ⚙ Placeholder | Module coming soon |

### v6 — Integrated Simulator

| Component | Status | Description |
|---|---|---|
| Launch Page | ✅ Complete | Version router: Hub vs Extension selection |
| Browser Extension | ✅ Complete | Full capture flow: parse → enrich → import |
| Dashboard | ✅ Complete | Extension-sourced candidates section, KPI cards |
| Candidate Pool | ✅ Complete | Source filter (All/Extension/Hub), attribution badges |
| Pipeline | ✅ Complete | Kanban with extension source badges |
| Outreach | ✅ Complete | Extension candidates auto-added, message threads |
| AI Sourcing | ⚙ Placeholder | Links to extension (full search in v5) |
| Credits | ⚙ Placeholder | Balance display (full dashboard in v5) |
| Profile Modal | ✅ Complete | Source-aware display, GDPR deadline, tags/notes |

---

## Known Limitations / Not Yet Implemented

- No real API calls — all data is static mock data
- No persistent state — refresh resets everything
- Drag-and-drop between Kanban stages is visual only (no actual state move)
- Saved searches feature (specified in v0.1 but not yet built in UI)
- Compare profiles side-by-side (specified in v0.1 but not yet built in UI)
- AI outreach draft generation (specified in v0.1 but not yet built in UI)
- Email/LinkedIn outreach workflow (templates exist, no real send)
- Agency multi-tier account hierarchy (Admin / Senior / Junior roles)
- Client sharing portal
- v6 does not include the full AI Search / Smart Shortlist — these are in v5 only
- Extension batch queue (specified in PRD, partially implemented in standalone simulator)

---

*Last updated: 3 Mar 2026 · Launcher v1.0 · Hub v5.0 · Integrated v6.0*
