import { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  BookOpen,
  Users,
  Building2,
  Handshake,
  FileText,
  Eye,
  Gavel,
  ArrowRight,
  CheckSquare,
  Download,
  ExternalLink,
  HelpCircle,
  MessageSquare,
  Heart,
  Shield,
  Leaf,
  Home,
  Briefcase,
  GraduationCap,
  DollarSign,
  Truck,
  Star,
  Baby,
  Info,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Role = "community" | "municipal" | "developer";

interface BenefitCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  examples: string[];
}

interface StepSubItem {
  title: string;
  description: string;
  checklist?: string[];
  type?: "example" | "template" | "worksheet";
}

interface Step {
  id: number;
  slug: string;
  label: string;
  tagline: string;
  color: string;
  textColor: string;
  bgLight: string;
  subItems: StepSubItem[];
}

interface ResourceItem {
  title: string;
  type: "template" | "case-study" | "external" | "worksheet";
  step: string;
  description: string;
  tags: string[];
}

interface GlossaryTerm {
  term: string;
  abbr?: string;
  definition: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const BENEFIT_CATEGORIES: BenefitCategory[] = [
  {
    id: "childcare",
    label: "Childcare",
    icon: <Baby size={18} />,
    color: "#f59e0b",
    description: "Subsidized childcare, on-site facilities, or childcare funds for affected community members.",
    examples: ["On-site childcare center", "Subsidy vouchers for local families", "After-school program funding"],
  },
  {
    id: "community-investment",
    label: "Community Investment",
    icon: <Heart size={18} />,
    color: "#ec4899",
    description: "Funds or programs directed toward community-identified needs and long-term improvement.",
    examples: ["$250K annual community fund", "Cultural center construction", "Public art installations"],
  },
  {
    id: "direct-finances",
    label: "Direct Finances",
    icon: <DollarSign size={18} />,
    color: "#16a34a",
    description: "Lump-sum or recurring payments to the municipality or community trust fund.",
    examples: ["Host community annual payments", "Lump-sum infrastructure grant", "Revenue sharing agreements"],
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap size={18} />,
    color: "#7c3aed",
    description: "Scholarships, STEM partnerships, vocational training, and school facility improvements.",
    examples: ["10 annual scholarships", "STEM lab partnership", "Vocational training program"],
  },
  {
    id: "environment",
    label: "Environment & Sustainability",
    icon: <Leaf size={18} />,
    color: "#059669",
    description: "Mitigation of environmental impacts, habitat protection, and sustainability commitments.",
    examples: ["Air quality monitoring stations", "Stormwater improvements", "Habitat buffer creation"],
  },
  {
    id: "housing",
    label: "Affordable Housing",
    icon: <Home size={18} />,
    color: "#0891b2",
    description: "Affordable housing units, trust fund contributions, and anti-displacement protections.",
    examples: ["10% units at 60% AMI", "Housing trust fund contribution", "Anti-displacement fund"],
  },
  {
    id: "landowner",
    label: "Landowner Protections",
    icon: <Shield size={18} />,
    color: "#b45309",
    description: "Protections for adjacent landowners against negative project impacts.",
    examples: ["Property value guarantees", "Noise buffer requirements", "Fishery access agreements"],
  },
  {
    id: "local-business",
    label: "Local Business",
    icon: <Briefcase size={18} />,
    color: "#dc2626",
    description: "Contracting requirements and procurement commitments favoring local businesses.",
    examples: ["30% local procurement", "MWBE participation goals", "Small business support fund"],
  },
  {
    id: "local-hiring",
    label: "Local Hiring",
    icon: <Users size={18} />,
    color: "#1d4ed8",
    description: "Local and diverse hiring requirements tied to project milestones.",
    examples: ["30% local construction hires", "Living wage requirements", "Apprenticeship programs"],
  },
  {
    id: "safety",
    label: "Safety",
    icon: <Shield size={18} />,
    color: "#9333ea",
    description: "Safety commitments including traffic mitigation, lighting, and emergency access.",
    examples: ["Traffic signal upgrades", "Site lighting requirements", "Emergency response plans"],
  },
  {
    id: "traffic",
    label: "Traffic & Transportation",
    icon: <Truck size={18} />,
    color: "#ea580c",
    description: "Mitigation of construction and operational traffic impacts on local roads.",
    examples: ["Road improvement fund", "Off-peak construction hours", "Transit shuttle service"],
  },
  {
    id: "specialized",
    label: "Specialized / Project-Specific",
    icon: <Star size={18} />,
    color: "#0f766e",
    description: "Unique benefits tailored to the specific project type, location, and community needs.",
    examples: ["Fishery assistance (offshore wind)", "Farmer transition support (solar)", "Tribal consultation commitments"],
  },
];

const STEPS: Step[] = [
  {
    id: 1,
    slug: "prepare",
    label: "Prepare",
    tagline: "What communities and municipalities should do before any negotiation begins",
    color: "#1d4ed8",
    textColor: "#ffffff",
    bgLight: "#eff6ff",
    subItems: [
      {
        title: "Understand the Project Context",
        description: "Before discussing benefits, understand what the developer needs — permits, zoning approvals, subsidies, or community support. That's your leverage. Pin down approvals the project depends on, likely impacts, ownership structure, and what developers have offered in other communities.",
        checklist: [
          "Review the developer's permit applications and zoning requests",
          "Ask for a project timeline and funding source information",
          "Research the developer's previous CBAs in other towns",
          "Document potential impacts (traffic, noise, environment)",
          "Confirm ownership structure and future transfer plans",
        ],
        type: "worksheet",
      },
      {
        title: "Identify Stakeholders & Build a Representative Team",
        description: "A CBA is only as strong as the people at the table. The most successful agreements come from broad, inclusive coalitions. Consider: local boards, municipal staff, residents (owners, renters, unhoused), EJ groups, faith and cultural groups, youth and elder advocates, regional planning agencies, and tribes.",
        checklist: [
          "Map stakeholders visually, listing who is affected and who holds decision power",
          "Invite representatives from underrepresented groups early",
          "Establish clear roles within the coalition",
          "Create a shared contact list and meeting schedule",
          "Draft a coalition agreement outlining decision-making rules",
        ],
      },
      {
        title: "Define Community Priorities Early",
        description: "Don't start with what the developer offers. Start with what your community actually needs. Use a priorities worksheet to identify the most important benefits, distinguish essential from negotiable commitments, and translate broad goals into measurable outcomes.",
        checklist: [
          "Use surveys or listening sessions to identify top concerns",
          "Rank priorities using a scoring matrix (impact, feasibility, urgency)",
          "Translate broad goals into measurable outcomes (e.g., X% local hires within 2 years)",
          "Document essential vs. negotiable benefits",
          "Revisit priorities before each negotiation phase",
        ],
        type: "worksheet",
      },
      {
        title: "Assess Your Capacity & Identify Support Needs",
        description: "Communities often walk into negotiations at a disadvantage. Use a readiness checklist to assess legal support, negotiation strategy expertise, organizational stability, monitoring capacity, and whether outside help is needed.",
        checklist: [
          "Contact local universities for pro bono legal or planning assistance",
          "Reach out to state EJ offices for technical help with environmental review",
          "Identify funding for community consultants or translators",
          "Build a small advisory group (law, finance, construction)",
          "Schedule capacity check-ins every few months",
        ],
        type: "template",
      },
      {
        title: "Bring in a Neutral Facilitator or Mediator",
        description: "A neutral facilitator convenes all the right people, sets ground rules, builds a shared fact base, and prevents power imbalances from derailing negotiations. Agreements reached through facilitated processes tend to be more durable and easier to enforce.",
        checklist: [
          "Choose someone with experience in land-use or public-sector negotiation",
          "Verify neutrality (no ties to the developer)",
          "Ask them to draft ground rules and a shared fact-finding plan",
          "Use structured agendas and time limits to keep meetings productive",
          "Ensure the facilitator documents agreements and distributes summaries",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "engage",
    label: "Engage",
    tagline: "How to build meaningful, inclusive, and effective community engagement before negotiations begin",
    color: "#7c3aed",
    textColor: "#ffffff",
    bgLight: "#f5f3ff",
    subItems: [
      {
        title: "Start Engagement Early and Make It Continuous",
        description: "Communities need to be involved before major decisions are made — not after the project is already designed. Early engagement gives residents a real chance to influence site selection, project design, mitigation measures, and benefit priorities.",
        checklist: [
          "Begin outreach at least two months before permit submission",
          "Maintain updates through newsletters or a project webpage",
          "Host quarterly community briefings during construction and operation",
        ],
      },
      {
        title: "Make Engagement Inclusive and Accessible",
        description: "People most affected by a project are often least likely to be at the table. Hold meetings at accessible locations, schedule at times that work for working families, provide childcare and translation, and use multiple outreach channels.",
        checklist: [
          "Consider providing childcare and food at meetings",
          "Offer interpretation in languages spoken locally",
          "Use multiple formats (in-person, virtual, pop-up)",
          "Partner with trusted local organizations to co-host sessions",
        ],
      },
      {
        title: "Map the Community and Identify Who Needs to Be at the Table",
        description: "Engagement starts with understanding who is affected and who has been historically excluded. Consider residents, EJ communities, neighborhood associations, faith-based groups, youth and elder advocates, local businesses, unions, tribes, and municipal boards.",
        checklist: [
          "Create a stakeholder map showing influence and impact",
          "Use demographic data to ensure EJ community representation",
        ],
      },
      {
        title: "Create a Clear, Transparent Engagement Plan",
        description: "A strong engagement plan sets expectations and builds trust. It should explain goals, outreach strategies, timeline, language access supports, how input will be collected and used, and how results will be shared back.",
        checklist: [
          "Publish the plan online and in print",
          "Include a timeline of engagement milestones",
          "Define how feedback will be incorporated into project design",
          "Assign responsibility for follow-up communication",
        ],
        type: "template",
      },
      {
        title: "Document What You Hear and Show How It Shapes the Project",
        description: "Communities need to see that their input matters. Track all comments, identify recurring themes, show how feedback influenced design, and publish accessible summaries. This is essential for legitimacy — as demonstrated in Calverton vs. Hunter's Point.",
        checklist: [
          "Use a comment-tracking spreadsheet (theme, response, action taken)",
          "Summarize findings in plain-language reports",
          'Present examples to demonstrate responsiveness ("You said, We did")',
          "Archive all materials for future monitoring",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "negotiate",
    label: "Negotiate",
    tagline: "Designing a fair, transparent, and enforceable negotiation process",
    color: "#db2777",
    textColor: "#ffffff",
    bgLight: "#fdf2f8",
    subItems: [
      {
        title: "Sample Negotiation Timelines",
        description: "Successful CBAs follow a predictable sequence. Phase 1: Pre-Negotiation (2–6 weeks) — coalition alignment, ground rules. Phase 2: Issue Identification (2–8 weeks) — priorities and developer constraints. Phase 3: Option Development (4–12 weeks) — brainstorming, vetting. Phase 4: Drafting & Closure (2–6 weeks). Phase 5: Implementation Planning (1–4 weeks).",
        checklist: [
          "Include estimated durations for each phase and responsible parties",
          "Use shared calendars to track deadlines",
          "Schedule debriefs after each phase to review progress",
        ],
      },
      {
        title: "Guidance on Neutral Facilitation",
        description: "Neutral facilitation is one of the strongest predictors of enforceable agreements. A facilitator levels the playing field, supports joint fact-finding, and helps translate broad commitments into implementable terms. Bring in a neutral when power disparities are significant, trust is low, or negotiations stall.",
        checklist: [
          "Facilitators should prepare joint fact-finding summaries before each meeting",
          "Use consensus-building techniques like interest-based negotiation",
          "Consider rotating meeting chairs to balance participation",
        ],
      },
      {
        title: "Meeting Facilitation Guides",
        description: "Effective meetings prevent drift and domination by a single party. Before: circulate agenda and ground rules. During: begin with ground rules restatement, use structured rounds, track issues visually. After: distribute summary within 48 hours, identify next steps.",
        checklist: [
          "Begin with a brief recap of previous agreements",
          "Use visual aids to track issues",
          "End each meeting with a written summary and next-step assignments",
        ],
        type: "template",
      },
      {
        title: "Negotiation Preparation Worksheet",
        description: "Enter negotiations with clarity on your interests and priorities, constraints and opportunities, information needs, draft benefit concepts, and enforcement preferences. Specify which data is missing, what enforcement penalties apply, and get coalition sign-off before formal talks.",
        checklist: [
          "What data is missing? (traffic counts, wage benchmarks, emissions)",
          "Specify enforcement penalties and reporting intervals",
          "Receive coalition sign-off before entering formal talks",
        ],
        type: "worksheet",
      },
      {
        title: "Understanding Power Dynamics",
        description: "Developers have greater financial and legal resources, control over timelines, and can wait out coalitions. Municipalities have permitting authority and ability to condition approvals. Counter these imbalances through neutral facilitation, joint fact-finding, broad coalitions, and securing pro bono legal support.",
        checklist: [
          "Counter developer advantages by pooling community resources",
          "Use media coverage strategically to maintain transparency",
          "Document all offers and counter-offers to prevent misrepresentation",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "draft",
    label: "Draft",
    tagline: "Translate negotiated commitments into clear, enforceable, durable language",
    color: "#ea580c",
    textColor: "#ffffff",
    bgLight: "#fff7ed",
    subItems: [
      {
        title: "CBA Structure Template",
        description: "A strong CBA includes: (A) Preamble / Purpose, (B) Definitions, (C) Benefit Commitments organized by category — each with specific deliverable, timeline, responsible party, and reporting requirements, (D) Implementation & Monitoring, (E) Dispute Resolution, (F) Enforcement with successor/assigns clause, (G) Term & Amendments, (H) Signatures.",
        checklist: [
          "Use consistent numbering and defined terms throughout",
          "Include appendices for data reporting formats",
          "Require signatures from all parties and witnesses",
        ],
        type: "template",
      },
      {
        title: "Menu of Example Benefits",
        description: "Workforce & Economic: local hiring, living wage, apprenticeships, MWBE participation. Environmental: noise/air mitigation, green space, stormwater. Community Investment: investment funds, cultural preservation, parks. Education: scholarships, STEM partnerships. Housing: affordable units, trust fund contributions. Project-Specific: traffic, fishery assistance, landowner protections.",
        checklist: [
          "Local hiring ex: 30% of construction jobs for residents within 10 miles",
          "Environmental ex: Install air-quality monitors and publish quarterly data",
          "Community investment ex: $250,000 annual fund administered by a local nonprofit",
          "Housing ex: 10% of units reserved for households earning below 60% AMI",
        ],
      },
      {
        title: "Model Clauses (Benefits, Reporting, Enforcement)",
        description: 'Key clauses: Benefit Delivery — "The Developer shall provide [specific benefit] by [date]." Reporting — quarterly progress reports with metrics and expenditures, publicly accessible. Monitoring Committee — meets regularly to review compliance. Notice and Cure — 30–90 day cure period. Successor Clause — all obligations bind successors for project duration.',
        checklist: [
          "Include deadlines and documentation requirements in each clause",
          "Specify who verifies completion (committee, agency, third party)",
          "Ensure dispute-resolution timelines are realistic (30–60 days)",
        ],
      },
      {
        title: "Checklist for Enforceability",
        description: "Before signing, verify: Clarity & Specificity (each benefit is measurable, timelines explicit, responsible parties named). Monitoring & Oversight (committee established, reporting schedule defined, data access guaranteed). Dispute Resolution (notice and cure process, mediation option). Legal Enforceability (enforceable in court, performance bond, successor clause). Durability (term defined, amendment process specified).",
        checklist: [
          "Review checklist jointly with legal counsel before signing",
          "Store signed copies with the municipality and/or coalition",
          "Schedule annual reviews to confirm ongoing compliance",
        ],
        type: "worksheet",
      },
      {
        title: "Common Drafting Mistakes",
        description: "Avoid: vague or aspirational language ('will seek to hire locally'), missing timelines (benefits without deadlines rarely materialize), no monitoring structure, no successor clause (a major failure point), overreliance on goodwill, overly complex benefit packages, and no amendment procedure.",
        checklist: [
          'Conduct a "plain-language audit" to remove ambiguous terms',
          "Cross-reference all benefits with monitoring sections",
          "Include amendment procedures to adapt to project changes",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "monitor",
    label: "Monitor",
    tagline: "Ensure commitments are implemented, tracked, and publicly accountable",
    color: "#16a34a",
    textColor: "#ffffff",
    bgLight: "#f0fdf4",
    subItems: [
      {
        title: "Monitoring Frameworks",
        description: "The strongest frameworks share four core components: clear responsibilities, regular reporting, transparent review, and escalation pathways. Options: (A) Developer Self-Reporting — simple but risks selective reporting. (B) Joint Monitoring Committee — shared oversight, highly effective. (C) Third-Party Independent Monitoring — independence and expertise. (D) Public Agency Monitoring — regulatory authority. (E) Hybrid Models — redundancy and resilience.",
        checklist: [
          "Developer self-reporting ex: Quarterly progress reports with metrics and photos",
          "Joint committee ex: Meet bi-monthly, publish minutes online",
          "Independent monitoring ex: Hire a consultant for annual compliance audits",
          "Hybrid model ex: Combine community review with independent oversight",
        ],
      },
      {
        title: "Monitoring Committee Structure",
        description: "Monitoring committees are one of the strongest predictors of successful enforcement. Composition: 2–5 community reps, 1–2 developer reps, optional municipal staff, optional independent expert. Responsibilities include reviewing reports, requesting site visits, tracking progress, issuing findings, and maintaining public transparency. Committees without authority tend to dissolve (see Hunter's Point).",
        checklist: [
          "Include equal representation from community, developer, and municipality",
          "Choose a chair and secretary for record-keeping",
          "Define quorum and voting procedures",
          "Establish a public comment period for each meeting",
        ],
      },
      {
        title: "Reporting Form Template",
        description: "A standardized reporting form increases transparency and reduces disputes. Sections: (1) Summary of Progress, (2) Benefit Delivery Status table — benefit, deliverable, deadline, status, evidence, (3) Workforce & Hiring, (4) Environmental & Mitigation Measures, (5) Financial Commitments, (6) Community Investments, (7) Issues or Non-Compliance, (8) Attachments.",
        checklist: [
          "Require supporting documentation (receipts, photos, permits)",
          "Publish reports on municipal or coalition websites",
        ],
        type: "template",
      },
    ],
  },
  {
    id: 6,
    slug: "enforce",
    label: "Enforce",
    tagline: "Activate the tools that ensure commitments are delivered and know when to escalate",
    color: "#dc2626",
    textColor: "#ffffff",
    bgLight: "#fef2f2",
    subItems: [
      {
        title: "Enforcement Pathways",
        description: "Enforcement follows a four-stage escalation: (A) Informal Resolution — direct communication, adjusted timelines; most issues are administrative. (B) Notice and Cure — written notice, 30–90 day cure period, committee verifies completion. (C) Mediation or Arbitration — faster and cheaper than litigation, keeps relationships intact. (D) Legal Enforcement (last resort) — specific performance, injunctive relief, financial penalties, performance bonds.",
        checklist: [
          "Track every enforcement step in a shared log visible to all parties",
          "Use a standard Notice and Cure form to document issues clearly",
          "Set calendar reminders for cure periods and mediation dates",
          "Keep all correspondence in one folder for quick reference",
          "Confirm who has authority to initiate each stage before enforcement begins",
        ],
      },
      {
        title: "Examples of Successful Enforcement",
        description: "Block Island Wind Farm (RI): Clear reimbursement clause + full-time liaison → developer paid cable repair costs without litigation. Calverton Solar (NY): CBA embedded in municipal approval + town withheld certificate of occupancy → developer completed all commitments. Detroit CBO: City penalty authority + public reporting → multiple projects corrected non-compliance. NECEC (ME): Third-party fund administration → benefits continued despite project legal challenges. Hunter's Point (SF): Oversight collapsed after ACORN dissolved — monitoring bodies must be durable and independent.",
        type: "example",
      },
      {
        title: "When to Seek Legal Support",
        description: "Legal support is most valuable early, when issues are still fixable. Seek support when: developer repeatedly misses deadlines, cure periods expire unresolved, developer disputes clause meaning, ownership changes, committee needs help interpreting data. Seek IMMEDIATE support when: developer refuses to comply, a benefit is at risk of disappearing, environmental harms are occurring, or the developer challenges enforceability.",
        checklist: [
          "Contact a legal clinic or municipal attorney as soon as repeated non-compliance occurs",
          "Gather all relevant documentation before meeting with counsel",
          "Ask legal advisors to confirm successor obligations and enforcement options annually",
        ],
      },
    ],
  },
];

const RESOURCES: ResourceItem[] = [
  { title: "Community Priorities Worksheet", type: "worksheet", step: "Prepare", description: "Identify and rank community needs before negotiations begin.", tags: ["prepare", "community", "planning"] },
  { title: "Community Readiness Checklist", type: "template", step: "Prepare", description: "Assess your coalition's legal, technical, and organizational capacity.", tags: ["prepare", "capacity"] },
  { title: "Stakeholder Mapping Template", type: "template", step: "Prepare", description: "Visually map who is affected and who holds decision power.", tags: ["prepare", "stakeholders"] },
  { title: "Engagement Plan Template", type: "template", step: "Engage", description: "Structured plan for inclusive, transparent community outreach.", tags: ["engage", "outreach"] },
  { title: "Comment Tracking Spreadsheet", type: "template", step: "Engage", description: "Track community input by theme, response, and action taken.", tags: ["engage", "documentation"] },
  { title: "Negotiation Preparation Worksheet", type: "worksheet", step: "Negotiate", description: "Clarify interests, constraints, and enforcement preferences before talks.", tags: ["negotiate", "planning"] },
  { title: "Meeting Facilitation Guide", type: "template", step: "Negotiate", description: "Before/during/after meeting checklist for productive CBA negotiations.", tags: ["negotiate", "facilitation"] },
  { title: "CBA Structure Template", type: "template", step: "Draft", description: "Full legal structure from preamble to signatures with all key sections.", tags: ["draft", "legal"] },
  { title: "Enforceability Checklist", type: "worksheet", step: "Draft", description: "Verify clarity, monitoring, dispute resolution, and legal enforceability.", tags: ["draft", "enforcement"] },
  { title: "CBA Reporting Form Template", type: "template", step: "Monitor", description: "Standardized quarterly reporting with all required sections.", tags: ["monitor", "reporting"] },
  { title: "Notice and Cure Form", type: "template", step: "Enforce", description: "Document non-compliance formally and track cure period deadlines.", tags: ["enforce", "legal"] },
  { title: "Block Island Wind Farm Case Study", type: "case-study", step: "Enforce", description: "Rhode Island offshore wind CBA — successful reimbursement clause and community liaison model.", tags: ["case-study", "renewable-energy", "enforce"] },
  { title: "Calverton Solar Energy Center Case Study", type: "case-study", step: "Enforce", description: "New York solar CBA embedded in municipal approval — regulatory enforcement success.", tags: ["case-study", "solar", "enforce", "monitor"] },
  { title: "Detroit Community Benefits Ordinance Case Study", type: "case-study", step: "Enforce", description: "City-mandated CBA process with institutionalized enforcement and public reporting.", tags: ["case-study", "urban", "municipal"] },
  { title: "Hunter's Point Shipyard Case Study (Cautionary)", type: "case-study", step: "Monitor", description: "San Francisco CBA where oversight collapsed after coalition dissolved — key lessons on durability.", tags: ["case-study", "cautionary", "monitor"] },
  { title: "NECEC Maine Case Study", type: "case-study", step: "Monitor", description: "Maine transmission line CBA with independent fund administration that survived legal challenges.", tags: ["case-study", "renewable-energy", "monitor"] },
  { title: "Offshore Wind CBAs in California (Berkeley Law)", type: "external", step: "Prepare", description: "Comprehensive analysis of offshore wind community benefits agreements.", tags: ["external", "renewable-energy", "research"] },
  { title: "Community Benefits Agreements Case Studies (CATF)", type: "external", step: "Prepare", description: "Federal guidelines and best practices for community benefits agreements.", tags: ["external", "research", "federal"] },
  { title: "Columbia Law CBA Database", type: "external", step: "Prepare", description: "Searchable database of community benefits agreements nationwide.", tags: ["external", "research", "database"] },
  { title: "Wind Energy Community Benefits Guide (DOE)", type: "external", step: "Engage", description: "Department of Energy guide to community benefits in wind energy projects.", tags: ["external", "renewable-energy", "federal"] },
];

const GLOSSARY: GlossaryTerm[] = [
  { term: "Community Benefits Agreement", abbr: "CBA", definition: "A legally binding contract between a developer and a community coalition or municipality that outlines specific benefits the developer must deliver in exchange for community support or non-opposition to a project." },
  { term: "Community Benefit Plan", abbr: "CBP", definition: "A non-binding plan required in some federal funding applications (e.g., DOE) that outlines how a project will engage and benefit local communities." },
  { term: "Cumulative Impact Analysis", abbr: "CIA", definition: "An assessment of cumulative environmental and social burdens required for certain energy infrastructure projects under Massachusetts state law." },
  { term: "Environmental Justice Principles", abbr: "EJ", definition: "Principles ensuring meaningful involvement and equitable distribution of environmental benefits and burdens regardless of race, income, or other protected characteristics." },
  { term: "Key Stakeholders", definition: "Residents, community groups, local officials, EJ communities, tribes, and others within or near the project area who may be affected by a development project." },
  { term: "Meaningful Engagement", definition: "Early, continuous, accessible, culturally competent engagement that genuinely informs decision-making — not a one-off meeting or box-checking exercise." },
  { term: "Monitoring Committee", definition: "A body of community, developer, and sometimes municipal representatives that reviews compliance reports, requests documentation, and issues findings on a regular schedule." },
  { term: "Notice and Cure", definition: "A formal non-adversarial enforcement mechanism where a written notice of non-compliance is issued and the developer has a defined period (typically 30–90 days) to correct the breach before escalation." },
  { term: "Successor Clause", definition: "A CBA provision ensuring that all obligations bind future owners or operators of the project for its duration — preventing benefits from disappearing when ownership changes." },
  { term: "Performance Bond", definition: "A financial instrument that can be drawn upon if the developer fails to meet specific commitments, providing enforceable financial backing for CBA obligations." },
  { term: "Joint Fact-Finding", definition: "A collaborative process in which all parties agree on a shared fact base — reducing information asymmetry and disputes over technical data during negotiations." },
  { term: "Area Median Income", abbr: "AMI", definition: "The median household income for a specific metropolitan statistical area, used as a benchmark for affordable housing commitments in CBAs." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function RoleSelector({ selected, onChange }: { selected: Role; onChange: (r: Role) => void }) {
  const roles: { id: Role; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "community", label: "Community Organizer", icon: <Users size={20} />, desc: "EJ advocates, neighborhood groups, residents" },
    { id: "municipal", label: "Municipal Official", icon: <Building2 size={20} />, desc: "Town staff, planners, selectboards, local boards" },
    { id: "developer", label: "Developer / Proponent", icon: <Handshake size={20} />, desc: "Project developers seeking community support" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => onChange(r.id)}
          className={`flex-1 flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            selected === r.id
              ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-105"
              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-md"
          }`}
        >
          <span className={selected === r.id ? "text-white" : "text-blue-600"}>{r.icon}</span>
          <span className="font-semibold text-sm leading-tight text-center">{r.label}</span>
          <span className={`text-xs leading-tight text-center ${selected === r.id ? "text-blue-100" : "text-gray-400"}`}>{r.desc}</span>
        </button>
      ))}
    </div>
  );
}

function BenefitCategoryCard({ cat }: { cat: BenefitCategory }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md hover:scale-105"
        style={{
          borderColor: hovered ? cat.color : "transparent",
          backgroundColor: hovered ? cat.color + "20" : "#ffffff",
          boxShadow: hovered ? `0 4px 12px ${cat.color}30` : undefined,
        }}
      >
        <span style={{ color: cat.color }}>{cat.icon}</span>
        <span className="text-sm font-medium text-gray-800">{cat.label}</span>
      </div>
      {hovered && (
        <div
          className="absolute z-50 left-0 top-full mt-2 w-72 rounded-xl shadow-2xl p-4 border"
          style={{ backgroundColor: "#ffffff", borderColor: cat.color + "40" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: cat.color }}>{cat.icon}</span>
            <h4 className="font-bold text-gray-900 text-sm">{cat.label}</h4>
          </div>
          <p className="text-xs text-gray-600 mb-3">{cat.description}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Examples</p>
            {cat.examples.map((ex, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <ArrowRight size={10} className="mt-0.5 shrink-0" style={{ color: cat.color }} />
                <span className="text-xs text-gray-700">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepModule({ step, defaultOpen = false }: { step: Step; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  const typeLabel: Record<string, string> = {
    template: "Template available",
    worksheet: "Worksheet available",
    example: "Case examples",
  };

  const typeBadgeColor: Record<string, string> = {
    template: "#1d4ed8",
    worksheet: "#7c3aed",
    example: "#16a34a",
  };

  return (
    <div className="rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md" style={{ borderColor: step.color + "40" }}>
      <button
        className="w-full flex items-center justify-between px-6 py-5 transition-colors duration-200"
        style={{ backgroundColor: open ? step.color : step.bgLight }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg font-mono"
            style={{ backgroundColor: open ? "rgba(255,255,255,0.25)" : step.color, color: open ? "#ffffff" : "#ffffff" }}
          >
            {step.id}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: open ? "#ffffff" : step.color }}>
                STEP {step.id}: {step.label.toUpperCase()}
              </span>
            </div>
            <p className={`text-sm mt-0.5 ${open ? "text-white/80" : "text-gray-500"}`}>{step.tagline}</p>
          </div>
        </div>
        <div style={{ color: open ? "#ffffff" : step.color }}>
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {open && (
        <div className="p-6 space-y-3" style={{ backgroundColor: step.bgLight }}>
          {step.subItems.map((item, idx) => (
            <div key={idx} className="rounded-xl border bg-white overflow-hidden shadow-sm" style={{ borderColor: step.color + "25" }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{item.title}</span>
                  {item.type && (
                    <span
                      className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: typeBadgeColor[item.type] }}
                    >
                      {typeLabel[item.type]}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 ml-2 shrink-0">
                  {openItems.includes(idx) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {openItems.includes(idx) && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: step.color + "20" }}>
                  <p className="text-gray-700 text-sm leading-relaxed mt-4">{item.description}</p>
                  {item.checklist && item.checklist.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Action Checklist</p>
                      {item.checklist.map((check, ci) => (
                        <div key={ci} className="flex items-start gap-2.5">
                          <CheckSquare size={14} className="mt-0.5 shrink-0" style={{ color: step.color }} />
                          <span className="text-sm text-gray-700">{check}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.type && (
                    <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: step.color }}>
                      <Download size={14} />
                      Download {typeLabel[item.type].replace(" available", "")}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceCard({ item, onTagClick }: { item: ResourceItem; onTagClick: (tag: string) => void }) {
  const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    template: { icon: <FileText size={14} />, color: "#1d4ed8", bg: "#eff6ff" },
    worksheet: { icon: <CheckSquare size={14} />, color: "#7c3aed", bg: "#f5f3ff" },
    "case-study": { icon: <BookOpen size={14} />, color: "#16a34a", bg: "#f0fdf4" },
    external: { icon: <ExternalLink size={14} />, color: "#ea580c", bg: "#fff7ed" },
  };

  const cfg = typeConfig[item.type];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug">{item.title}</h4>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium shrink-0" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
          {cfg.icon}
          {item.type === "case-study" ? "Case Study" : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors capitalize"
            >
              {tag}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors shrink-0">
          {item.type === "external" ? <ExternalLink size={12} /> : <Download size={12} />}
          {item.type === "external" ? "Open" : "Download"}
        </button>
      </div>
    </div>
  );
}

function GlossarySection() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      (g.abbr && g.abbr.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="Search terms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {filtered.map((g) => (
          <div key={g.term} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === g.term ? null : g.term)}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">{g.term}</span>
                {g.abbr && (
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono font-bold">{g.abbr}</span>
                )}
              </div>
              {expanded === g.term ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
            {expanded === g.term && (
              <div className="px-5 pb-4 border-t border-gray-50">
                <p className="text-sm text-gray-600 leading-relaxed mt-3">{g.definition}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No terms found.</p>
        )}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState<Role>("community");
  const [resourceSearch, setResourceSearch] = useState("");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [activeSection, setActiveSection] = useState("home");

  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    steps: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
    glossary: useRef<HTMLDivElement>(null),
  };

  const scrollTo = (section: keyof typeof sectionsRef) => {
    sectionsRef[section].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
  };

  const filteredResources = RESOURCES.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(resourceSearch.toLowerCase());
    const matchFilter =
      resourceFilter === "all" ||
      r.type === resourceFilter ||
      r.tags.includes(resourceFilter) ||
      r.step.toLowerCase() === resourceFilter;
    return matchSearch && matchFilter;
  });

  const filterOptions = [
    { value: "all", label: "All Resources" },
    { value: "template", label: "Templates" },
    { value: "worksheet", label: "Worksheets" },
    { value: "case-study", label: "Case Studies" },
    { value: "external", label: "External Links" },
    { value: "prepare", label: "Prepare" },
    { value: "engage", label: "Engage" },
    { value: "negotiate", label: "Negotiate" },
    { value: "draft", label: "Draft" },
    { value: "monitor", label: "Monitor" },
    { value: "enforce", label: "Enforce" },
  ];

  const roleContent: Record<Role, { headline: string; emphasis: string[] }> = {
    community: {
      headline: "Level the playing field in negotiations",
      emphasis: ["Access legal basics", "Build coalition capacity", "Identify your leverage"],
    },
    municipal: {
      headline: "Navigate CBA processes with clear frameworks",
      emphasis: ["Templates for every stage", "State-level requirements", "Enforcement tools"],
    },
    developer: {
      headline: "Understand community expectations and reduce project risk",
      emphasis: ["Common benefit categories", "Negotiation timelines", "Build community trust"],
    },
  };

  const rc = roleContent[role];

  return (
    <div className="min-h-screen" style={{ fontFamily: "DM Sans, sans-serif", backgroundColor: "#f7f4ef" }}>
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm" style={{ borderColor: "rgba(26,26,46,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: "DM Mono, monospace" }}>CBA</span>
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:block" style={{ fontFamily: "Fraunces, serif" }}>CBA Toolkit</span>
          </button>
          <div className="flex items-center gap-1 sm:gap-2">
            {(["home", "steps", "resources", "glossary"] as const).map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeSection === s
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {s === "steps" ? "6 Steps" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero / Landing ───────────────────────────────────────────────── */}
      <div ref={sectionsRef.home}>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 40%, #0f766e 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 40%)" }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Massachusetts Pilot — Spring 2026
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4" style={{ fontFamily: "Fraunces, serif" }}>
                Community Benefits{" "}
                <span style={{ color: "#fbbf24" }}>Agreement</span>{" "}
                Toolkit
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                A step-by-step interactive guide to negotiating, drafting, monitoring, and enforcing Community Benefits Agreements — for communities, municipalities, and developers.
              </p>

              {/* Role selector */}
              <div className="mb-8">
                <p className="text-blue-200 text-sm mb-3 font-medium">I am a…</p>
                <RoleSelector selected={role} onChange={setRole} />
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">{rc.headline}</p>
                <div className="flex flex-wrap gap-3">
                  {rc.emphasis.map((e, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-white text-sm">
                      <ArrowRight size={12} className="text-amber-400" />
                      {e}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => scrollTo("steps")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-gray-900 font-bold hover:bg-amber-300 transition-colors"
                >
                  Start the 6-Step Process
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("resources")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Browse Resources
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What is a CBA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "Fraunces, serif" }}>
              What is a CBA?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A Community Benefits Agreement is a <strong>legally binding contract</strong> between a developer and a community coalition or municipality that outlines specific benefits the developer must deliver in exchange for community support or non-opposition to a project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Can do */}
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <h3 className="font-bold text-green-900 text-lg" style={{ fontFamily: "Fraunces, serif" }}>What a CBA CAN do</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Create legally enforceable obligations communities can hold developers to",
                  "Ensure benefits are specific, measurable, and tied to project milestones",
                  "Build trust and transparency through structured negotiation and oversight",
                  "Reduce conflict and delays by addressing community concerns early",
                  "Strengthen long-term accountability with monitoring committees and successor clauses",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                    <ArrowRight size={12} className="mt-1 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cannot do */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-lg">✕</span>
                </div>
                <h3 className="font-bold text-red-900 text-lg" style={{ fontFamily: "Fraunces, serif" }}>What a CBA CANNOT do</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Replace meaningful community engagement or fix a broken process retroactively",
                  "Guarantee equitable outcomes if community coalitions lack capacity or representation",
                  "Function effectively without clear commitments, independent oversight, and ongoing monitoring",
                  "Ensure compliance if benefits are vague, unenforceable, or dependent solely on goodwill",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <X size={12} className="mt-1 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why might you want one */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Fraunces, serif" }}>
              Why might you want one?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { n: "1", title: "Create Enforceable Commitments", desc: "Benefits are not just promises but legal obligations. Example: Block Island's reimbursement clause was honored years later without litigation.", color: "#1d4ed8" },
                { n: "2", title: "Reduce Conflict & Delays", desc: "Developers negotiate CBAs to secure local support, avoid opposition, and streamline permitting.", color: "#7c3aed" },
                { n: "3", title: "Improve Equity & Procedural Justice", desc: "CBAs rebalance power by giving communities a structured role in shaping project outcomes.", color: "#db2777" },
                { n: "4", title: "Build Long-Term Trust", desc: "Community liaisons, advisory committees, and transparent reporting foster durable collaboration.", color: "#ea580c" },
                { n: "5", title: "Protect Communities from Risk", desc: "Successor clauses, performance bonds, and monitoring committees ensure benefits persist even when ownership changes.", color: "#16a34a" },
              ].map((item) => (
                <div key={item.n} className="rounded-xl p-4 border" style={{ borderColor: item.color + "30", backgroundColor: item.color + "08" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3" style={{ backgroundColor: item.color }}>
                    {item.n}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefit Categories */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>
                Common Community Benefit Categories
              </h3>
              <div className="relative group">
                <Info size={16} className="text-gray-400 cursor-help" />
                <div className="absolute left-0 top-full mt-1 w-56 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Hover over each category card to see descriptions and real examples.
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">Hover over each category to see descriptions and examples ↓</p>
            <div className="flex flex-wrap gap-2">
              {BENEFIT_CATEGORIES.map((cat) => (
                <BenefitCategoryCard key={cat.id} cat={cat} />
              ))}
            </div>
          </div>

          {/* Who is this for */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: "Fraunces, serif" }}>
              Who This Dashboard Is For
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Users size={22} />,
                  title: "Community Organizers & EJ Advocates",
                  badge: "Primary",
                  badgeColor: "#1d4ed8",
                  desc: "Often working part-time or as volunteers, these users need accessible tools to level the playing field and articulate community priorities.",
                  color: "#1d4ed8",
                },
                {
                  icon: <Building2 size={22} />,
                  title: "Municipal Officials & Staff",
                  badge: "Primary",
                  badgeColor: "#7c3aed",
                  desc: "Town managers, planners, sustainability coordinators, conservation commissions, selectboards, and zoning boards needing clear frameworks and templates.",
                  color: "#7c3aed",
                },
                {
                  icon: <Gavel size={22} />,
                  title: "Local Government Boards",
                  badge: "Primary",
                  badgeColor: "#db2777",
                  desc: "Volunteer boards responsible for decisions affecting land use, permitting, and community well-being.",
                  color: "#db2777",
                },
                {
                  icon: <Handshake size={22} />,
                  title: "Developers & Project Proponents",
                  badge: "Secondary",
                  badgeColor: "#ea580c",
                  desc: "Seeking to understand community expectations, reduce project risk, and negotiate durable agreements.",
                  color: "#ea580c",
                },
                {
                  icon: <BookOpen size={22} />,
                  title: "Consultants & Technical Advisors",
                  badge: "Secondary",
                  badgeColor: "#16a34a",
                  desc: "Supporting municipalities or communities in negotiation, engagement, or monitoring processes.",
                  color: "#16a34a",
                },
                {
                  icon: <GraduationCap size={22} />,
                  title: "Researchers & Students",
                  badge: "Secondary",
                  badgeColor: "#0891b2",
                  desc: "Studying community engagement, energy transitions, or planning processes.",
                  color: "#0891b2",
                },
              ].map((a) => (
                <div key={a.title} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all duration-200" style={{ borderColor: a.color + "30" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: a.color + "15", color: a.color }}>
                      {a.icon}
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: a.badgeColor }}>
                      {a.badge}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">{a.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to use */}
          <div className="rounded-2xl p-6 sm:p-8 border-2 border-amber-200 bg-amber-50">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={20} className="text-amber-600" />
              <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: "Fraunces, serif" }}>How to Use This Dashboard</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { num: "01", text: "Use the six step modules below to navigate the CBA process — Prepare → Engage → Negotiate → Draft → Monitor → Enforce. Each step expands to reveal guidance, checklists, and downloadable resources." },
                { num: "02", text: "Click on any sub-item within a step to read detailed guidance and action checklists. Look for Template, Worksheet, and Case Example badges to find downloadable materials." },
                { num: "03", text: "Scroll down to the Resource Library to browse, search, and filter the complete collection of templates, worksheets, case studies, and external resources." },
                { num: "04", text: "Terms that appear in the Glossary are defined — hover over or tap highlighted terms throughout the dashboard for quick definitions." },
              ].map((item) => (
                <div key={item.num} className="flex gap-3">
                  <span className="text-2xl font-black text-amber-300 leading-none shrink-0" style={{ fontFamily: "Fraunces, serif" }}>{item.num}</span>
                  <p className="text-sm text-amber-800 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* State-level updates */}
          <div className="mt-8 rounded-2xl p-6 bg-blue-900 text-white flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
              <Building2 size={18} />
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{ fontFamily: "Fraunces, serif" }}>Massachusetts State-Level Legislative Updates</h4>
              <p className="text-blue-200 text-sm leading-relaxed">
                This dashboard pilots in a Massachusetts setting and will eventually include requirements for additional states. Massachusetts requires Cumulative Impact Analysis (CIA) for certain energy infrastructure projects and has active EJ community protections under MassEEA guidance.
              </p>
              <button className="mt-3 inline-flex items-center gap-1.5 text-sm text-amber-300 font-medium hover:text-amber-200 transition-colors">
                View MA State Documents <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Step Modules ─────────────────────────────────────────────────── */}
      <div ref={sectionsRef.steps} className="border-t" style={{ borderColor: "rgba(26,26,46,0.1)" }}>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "Fraunces, serif" }}>
              The 6-Step CBA Process
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Click each step to expand detailed guidance, action checklists, and downloadable resources. Steps 1 and 2 are open by default.
            </p>
          </div>

          {/* Step progress bar */}
          <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center shrink-0">
                <div
                  className="flex flex-col items-center gap-1 px-2"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.id}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">{step.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-8 h-0.5 mb-5" style={{ background: `linear-gradient(to right, ${step.color}, ${STEPS[i + 1].color})` }} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <StepModule key={step.id} step={step} defaultOpen={i < 2} />
            ))}
          </div>
        </section>
      </div>

      {/* ── Resource Library ─────────────────────────────────────────────── */}
      <div ref={sectionsRef.resources} className="border-t" style={{ borderColor: "rgba(26,26,46,0.1)", backgroundColor: "#f0ece5" }}>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "Fraunces, serif" }}>
              Resource Library
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Templates, worksheets, case studies, and external resources — searchable and filterable.
            </p>
          </div>

          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                placeholder="Search resources…"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setResourceFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  resourceFilter === opt.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((item, i) => (
              <ResourceCard key={i} item={item} onTagClick={(tag) => setResourceFilter(tag)} />
            ))}
          </div>
          {filteredResources.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>No resources match your search.</p>
            </div>
          )}
        </section>
      </div>

      {/* ── Glossary ─────────────────────────────────────────────────────── */}
      <div ref={sectionsRef.glossary} className="border-t" style={{ borderColor: "rgba(26,26,46,0.1)" }}>
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "Fraunces, serif" }}>
              Glossary
            </h2>
            <p className="text-gray-500 text-sm">Key terms used throughout this dashboard, with plain-language definitions.</p>
          </div>
          <GlossarySection />
        </section>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t bg-gray-900 text-white" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold" style={{ fontFamily: "DM Mono, monospace" }}>CBA</span>
                </div>
                <span className="font-bold text-white" style={{ fontFamily: "Fraunces, serif" }}>CBA Toolkit</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A step-by-step toolkit to guide communities, municipalities, and developers through the Community Benefits Agreement process.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">Navigate</h4>
              <div className="space-y-2">
                {(["home", "steps", "resources", "glossary"] as const).map((s) => (
                  <button key={s} onClick={() => scrollTo(s)} className="block text-gray-400 text-sm hover:text-white transition-colors capitalize">
                    {s === "steps" ? "6-Step Process" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">Help & Feedback</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                  <HelpCircle size={14} /> Help & FAQ
                </button>
                <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                  <MessageSquare size={14} /> Send Feedback
                </button>
                <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                  <Heart size={14} /> Acknowledgements
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-xs">
              CBA Dashboard — Spring 2026 · Massachusetts Pilot
            </p>
            <p className="text-gray-500 text-xs">
              Built to support community organizing and environmental justice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
