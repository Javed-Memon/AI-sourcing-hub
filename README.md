# TalentOS — AI Sourcing Hub

**React UI Prototype · Switzerland-based AI Hiring Platform**  
`AISourceHub.jsx` — Single-file React application

---

## Project Overview

The AI Sourcing Hub is a module for a Switzerland-based AI-native hiring platform, enabling HR teams and recruitment agencies to search for passive candidates sourced from millions of external profiles. All profiles are anonymised until explicitly unlocked. The feature uses a **pay-per-unlock credit model** — 1 credit reveals a full candidate profile including name, email, phone, LinkedIn, and employer.

The prototype was built incrementally across five sessions, each adding meaningful capability. This document captures the complete version history.

---

## Quick Start

```bash
# Drop the file into an existing React project
cp AISourceHub.jsx src/App.jsx

# Install deps if needed
npm install react react-dom

# Run
npm start
```

The component has no external dependencies beyond React itself. Fonts are loaded from Google Fonts via a `<style>` injection at runtime.

---

## Architecture

| Aspect | Detail |
|---|---|
| Framework | React 18 (functional components, hooks only) |
| Styling | Inline styles with a CSS string injected via `<style>` tag |
| Fonts | Playfair Display + Plus Jakarta Sans (Google Fonts) |
| State | Local `useState` / `useEffect` — no Redux or external store |
| Data | Hardcoded mock data (10 Swiss candidate profiles, 5 jobs, transaction history) |
| Theme | Light/Dark toggle; light is default |

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
**Date:** 24 Feb 2026 (current)  
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

## Data Model

### Candidate Profile
```js
{
  id, name, title, employer, loc, yoe, score, edu, industry,
  skills: [...],   // array of skill strings
  matched,         // how many skills match the active search
  avail,           // boolean — open to opportunities signal
  email, phone, linkedin, github,  // revealed on unlock
  av,              // avatar colour index
  source,          // source platform id
  summary          // professional summary paragraph
}
```

### Job
```js
{ id, title, dept, location, open, jd }
```

### Transaction
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

---

## GDPR / nDSG Compliance Signals in the UI

Every user-facing unlock action in the prototype includes:
- A compliance attestation checkbox the user must tick before confirming
- Explicit mention of GDPR Art. 14 and Swiss nDSG Art. 19 notification obligations
- Toast copy confirming "GDPR notification sent to candidate"
- Smart Shortlist modal confirms notifications sent to all 10 candidates automatically
- Privacy notice on the search page explaining the anonymisation model

---

## File Structure

```
AISourceHub.jsx          Single-file React component (~1,170 lines)
├── Data & constants     PROFILES, JOBS, TX_HISTORY, SOURCES, theme tokens (LT / DK)
├── makeCSS(T)           Dynamic CSS string injected at runtime
├── Atoms                Av, ScB, SKPill, IRow, Toast
├── Sidebar              Nav, user info, credits, theme toggle
├── Topbar               Page title, counters, credit balance
├── SearchPage           AI prompt + Manual Boolean modes, source pills, Smart Shortlist trigger
├── SmartShortlistModal  10-credit confirmation with GDPR attestation
├── SmartShortlistPage   Ranked top-10 results, top-3 unlocked
├── ResultsPage          Grid/List toggle, filter sidebar, bulk unlock
├── ProfileModal         4-tab profile view, single unlock flow, AI Interview, job assignment
├── CandidatePoolPage    Table view, bulk job assignment
├── PipelinePage         Job selector, kanban board, sourcing integration
├── CreditsDash          Balance hero, usage bars, pricing, transaction log
├── PlaceholderPage      Coming-soon stub for unbuilt pages
└── App                  Root: state management, routing between pages, handlers
```

---

## Pages / Navigation

| Nav Item | Status | Description |
|---|---|---|
| ◎ AI Sourcing Hub | ✅ Complete | Search (AI + Manual), Results (Grid + List), Smart Shortlist |
| ⟳ Job Pipelines | ✅ Complete | Kanban board, job selector, pipeline-sourcing integration |
| ❑ Candidate Pool | ✅ Complete | Table view, bulk job assignment |
| ◷ AI Interviews | ⚙ Placeholder | Module coming soon |
| ≡ Jobs | ⚙ Placeholder | Module coming soon |
| ⬡ Credits | ✅ Complete | Balance, usage, pricing, top-up, transactions |
| ⚙ Settings | ⚙ Placeholder | Module coming soon |

---

## Known Limitations / Not Yet Implemented

- No real API calls — all data is static mock data
- No persistent state — refresh resets everything
- Drag-and-drop between Kanban stages is visual only (no actual state move)
- Saved searches feature (specified in v0.1 but not yet built in UI)
- Compare profiles side-by-side (specified in v0.1 but not yet built in UI)
- AI outreach draft generation (specified in v0.1 but not yet built in UI)
- Email/LinkedIn outreach workflow
- Agency multi-tier account hierarchy (Admin / Senior / Junior roles)
- Client sharing portal

---

*Last updated: 24 Feb 2026 · v4.0*
