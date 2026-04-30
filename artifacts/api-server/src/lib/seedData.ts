// Seed content for the RTO Standards 2025 Practice Guide.
// Content is written in plain, practitioner-facing language for vocational
// educators. The Standards themselves are paraphrased for the practice guide
// and grouped under the four Quality Areas of the 2025 framework.

export type SeedStrategyCategory =
  | "classroom"
  | "assessment"
  | "learner_support"
  | "workforce"
  | "governance"
  | "compliance"
  | "reflection";

export type SeedStrategyEffort = "quick_win" | "ongoing" | "deep_change";

export interface SeedStrategy {
  title: string;
  summary: string;
  steps: string[];
  category: SeedStrategyCategory;
  effort: SeedStrategyEffort;
  timeEstimate: string;
}

export interface SeedStandard {
  code: string;
  title: string;
  intent: string;
  whatItMeans: string;
  keyPractices: string[];
  evidenceExamples: string[];
  strategies: SeedStrategy[];
}

export interface SeedQualityArea {
  code: string;
  title: string;
  tagline: string;
  description: string;
  standards: SeedStandard[];
}

export const SEED_QUALITY_AREAS: SeedQualityArea[] = [
  {
    code: "QA1",
    title: "Training and Assessment",
    tagline: "What we teach, and how we know it stuck.",
    description:
      "The heart of vocational education: designing learning that mirrors real work, delivering it well, and assessing in ways that honestly show what someone can do on the job.",
    standards: [
      {
        code: "1.1",
        title: "Training meets the requirements of the training product",
        intent:
          "Every learner walks away with the full set of skills and knowledge described in their qualification, skill set or unit — not a watered-down version of it.",
        whatItMeans:
          "Your training plan, session plans and learning resources cover every performance criterion, performance evidence and knowledge evidence point in the unit. Nothing is skipped because it is hard, inconvenient or unfamiliar to the trainer.",
        keyPractices: [
          "Map every session and resource to the unit's elements, performance evidence and knowledge evidence",
          "Update your delivery plan when a training product is superseded",
          "Cross-check that learning, practice and feedback time is realistic for the AQF level",
        ],
        evidenceExamples: [
          "Unit-by-unit mapping document",
          "Session plans referencing specific performance criteria",
          "Version-controlled training and assessment strategy (TAS)",
        ],
        strategies: [
          {
            title: "Run a 30-minute mapping audit per unit",
            summary:
              "Open the unit alongside your session plan and tick off each performance criterion as you find it covered. Anything unticked is a gap.",
            steps: [
              "Print or split-screen the unit of competency",
              "Work through each session plan in delivery order",
              "Highlight any criterion not addressed and note where it will go",
              "Add a 'last reviewed' date on the session plan",
            ],
            category: "classroom",
            effort: "quick_win",
            timeEstimate: "30 min per unit",
          },
          {
            title: "Build a living unit map you actually use",
            summary:
              "Replace a one-off mapping document with a shared spreadsheet your team updates whenever a session changes.",
            steps: [
              "Create one row per performance criterion / evidence point",
              "Columns: session covered, activity, resource link, last reviewed",
              "Pin the link in your team channel and update it as you teach",
              "Review at the end of every cohort",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "2 hours setup, 10 min per change",
          },
          {
            title: "Pre-teach the awkward bits",
            summary:
              "Identify the criteria most often skipped and design a short, deliberate activity for each one before delivery starts.",
            steps: [
              "Ask your team which criteria they avoid or rush",
              "Design a focused 15-30 min activity for each",
              "Slot them in early in the unit, not as fillers at the end",
            ],
            category: "classroom",
            effort: "ongoing",
            timeEstimate: "1 hour per unit",
          },
        ],
      },
      {
        code: "1.2",
        title: "Training is engaging and reflects current industry practice",
        intent:
          "Learners are taught the way work is actually done today — using the tools, vocabulary and standards their future workplaces use right now.",
        whatItMeans:
          "Industry consultation is a real, ongoing conversation, not a one-page form on file. Your examples, equipment and language are current, and you adjust delivery when the industry moves.",
        keyPractices: [
          "Schedule industry conversations every 6-12 months",
          "Refresh case studies, scenarios and equipment lists annually",
          "Invite guest practitioners or workplace visits at least once per cohort",
        ],
        evidenceExamples: [
          "Notes from industry consultation meetings",
          "Photos of current-spec equipment in use",
          "Updated session plans with date-stamped scenarios",
        ],
        strategies: [
          {
            title: "Build an industry consultation rhythm",
            summary:
              "Replace ad-hoc 'forms in the drawer' with a calendar of short, structured industry chats.",
            steps: [
              "List 5-8 industry contacts per qualification",
              "Schedule a 30-minute call or visit each quarter",
              "Use 4 standing questions: what's changed, what's new in tools, what new errors do you see in juniors, what would you remove from training",
              "Log it as a dated, signed note",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "2 hours per quarter",
          },
          {
            title: "Run a 'current vs taught' workshop",
            summary:
              "Spend a team afternoon comparing what your delivery shows learners against how the work is done in industry today.",
            steps: [
              "Pull session plans onto the wall",
              "Have a recent industry guest review them",
              "Tag anything outdated red and anything missing yellow",
              "Pick the top 5 changes and assign owners",
            ],
            category: "classroom",
            effort: "deep_change",
            timeEstimate: "Half day team workshop",
          },
          {
            title: "Refresh one scenario per fortnight",
            summary:
              "Pick a single case study or scenario each fortnight and rewrite it to use a current workplace situation.",
            steps: [
              "Choose one scenario from upcoming delivery",
              "Use a recent project, news story or industry post for context",
              "Update names, tools, regulations and outcomes",
              "Date-stamp the resource",
            ],
            category: "classroom",
            effort: "quick_win",
            timeEstimate: "30 min fortnightly",
          },
        ],
      },
      {
        code: "1.3",
        title: "Assessment is fair, valid, reliable and flexible",
        intent:
          "Assessment evidence really proves competence — and it would do so consistently across different assessors, learners and days.",
        whatItMeans:
          "Tasks reflect real work, instructions are clear, the rules of evidence are met, and reasonable adjustments are offered without lowering the standard.",
        keyPractices: [
          "Use multiple assessment methods per unit",
          "Apply the principles of assessment and rules of evidence in every tool",
          "Offer reasonable adjustments and document them",
        ],
        evidenceExamples: [
          "Assessment tools with clear instructions and benchmarks",
          "Reasonable adjustment register",
          "Validated assessment plans",
        ],
        strategies: [
          {
            title: "Add a 'how I will be judged' page to every tool",
            summary:
              "A one-page learner-facing summary of what success looks like before they start the task.",
            steps: [
              "Write the task purpose in two sentences",
              "List observable behaviours that count as competent",
              "Show the format of evidence required",
              "Note the reasonable adjustment process",
            ],
            category: "assessment",
            effort: "quick_win",
            timeEstimate: "20 min per tool",
          },
          {
            title: "Pair-mark a sample to test reliability",
            summary:
              "Two assessors mark the same three submissions independently and compare decisions.",
            steps: [
              "Choose 3 recently submitted samples",
              "Both assessors mark blind",
              "Compare results in a 30-min conversation",
              "Capture any decision rules that emerge",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "1 hour per cycle",
          },
          {
            title: "Build a reasonable-adjustment menu",
            summary:
              "Pre-design a small set of common adjustments per unit so they are ready when needed.",
            steps: [
              "List adjustments your team has made before",
              "Confirm each preserves the unit requirements",
              "Document the adjustment, when to offer it, and how to record it",
              "Share with the team and learners",
            ],
            category: "learner_support",
            effort: "deep_change",
            timeEstimate: "Half day per qualification",
          },
        ],
      },
      {
        code: "1.4",
        title: "Assessment system is validated",
        intent:
          "The assessment system is reviewed often enough, and rigorously enough, that everyone can trust the decisions it produces.",
        whatItMeans:
          "Pre and post-assessment validation happens on a planned schedule, with the right people, and findings actually change the tools.",
        keyPractices: [
          "Plan validation across the full RTO scope on a five-year cycle",
          "Include a current industry expert in every validation",
          "Document changes made because of validation findings",
        ],
        evidenceExamples: [
          "Validation schedule",
          "Validation meeting minutes with action items",
          "Updated tools with version history",
        ],
        strategies: [
          {
            title: "Run a 90-minute focused validation",
            summary:
              "Pick one assessment tool and use a fixed agenda to validate it well, instead of trying to do everything at once.",
            steps: [
              "Pick one tool and three completed submissions",
              "Invite an assessor, a non-assessor SME and an industry rep",
              "Walk through tool design, evidence quality, decisions",
              "Capture 1-3 actions and assign owners",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "90 min per tool",
          },
          {
            title: "Map your five-year validation calendar",
            summary:
              "Replace random reviews with a scheduled cycle that covers your whole scope.",
            steps: [
              "List every unit on scope",
              "Spread units across 5 years using risk and volume",
              "Lock dates into a shared calendar",
              "Review the plan annually",
            ],
            category: "governance",
            effort: "deep_change",
            timeEstimate: "1 day to plan, ongoing to maintain",
          },
        ],
      },
      {
        code: "1.5",
        title: "Recognition of prior learning is genuinely available",
        intent:
          "Learners are not made to redo what they can already do — RPL is offered, easy to start and rigorous to complete.",
        whatItMeans:
          "Information about RPL is upfront, the process is supported, and decisions are based on the same evidence rules as standard assessment.",
        keyPractices: [
          "Promote RPL in pre-enrolment information",
          "Provide an RPL kit with worked examples",
          "Apply the same rules of evidence as standard assessment",
        ],
        evidenceExamples: [
          "RPL kits per qualification",
          "RPL applications with mapped evidence",
          "RPL outcome letters",
        ],
        strategies: [
          {
            title: "Write a one-page 'is RPL for me?' guide",
            summary:
              "A short plain-language guide that helps learners decide whether to apply, with examples of evidence that works.",
            steps: [
              "Use second-person plain language",
              "Show 3 example evidence types per unit",
              "Include time and cost estimates",
              "Link to the full RPL kit",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "2 hours per qualification",
          },
          {
            title: "Run an RPL conversation, not a paperwork exercise",
            summary:
              "Open every RPL with a 30-minute structured conversation that maps experience to units before any forms come out.",
            steps: [
              "Use a unit-by-unit prompt sheet",
              "Record the conversation with permission",
              "Identify gaps and likely evidence sources",
              "Agree on next steps in writing",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "30-45 min per learner",
          },
        ],
      },
    ],
  },
  {
    code: "QA2",
    title: "VET Workforce",
    tagline: "Trainers and assessors who keep growing.",
    description:
      "Vocational education is delivered by people. This area is about hiring trainers and assessors who can do the work, keeping their skills current, and giving them time to grow.",
    standards: [
      {
        code: "2.1",
        title: "Trainers and assessors hold the right credentials",
        intent:
          "Every trainer and assessor has the formal credentials and the vocational competency the role requires — not just one or the other.",
        whatItMeans:
          "TAE credentials are current and held to the required level, vocational qualifications are at least at the level being delivered, and equivalence is documented when claimed.",
        keyPractices: [
          "Maintain a credentials matrix per trainer",
          "Verify credentials annually",
          "Document equivalence where TAE alternatives are used",
        ],
        evidenceExamples: [
          "Up to date credentials matrix",
          "Verified copies of qualifications",
          "Equivalence statements with mapped evidence",
        ],
        strategies: [
          {
            title: "Build a one-page trainer profile",
            summary:
              "A single page per trainer that shows credentials, vocational currency and what they are approved to deliver.",
            steps: [
              "Pull existing HR files into a single template",
              "Add 'approved to deliver' list per trainer",
              "Get the trainer to sign and date",
              "Set a 12-month review reminder",
            ],
            category: "workforce",
            effort: "quick_win",
            timeEstimate: "30 min per trainer",
          },
          {
            title: "Annual credentials health check",
            summary:
              "Block one afternoon a year to verify every credential held by every trainer.",
            steps: [
              "Collect originals or verified copies",
              "Cross-check expiry dates and currency",
              "Update the matrix and flag actions",
              "Communicate any required upskilling",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "Half day per year",
          },
        ],
      },
      {
        code: "2.2",
        title: "Trainers and assessors maintain industry currency",
        intent:
          "The people teaching the work are still close to how the work is being done — through projects, secondments, professional bodies or active practice.",
        whatItMeans:
          "Industry currency is planned, evidenced and refreshed yearly. It is more than 'I've been a trainer for 10 years'.",
        keyPractices: [
          "Plan annual currency activities per trainer",
          "Mix workplace exposure, professional reading and networks",
          "Capture currency in a usable log",
        ],
        evidenceExamples: [
          "Annual professional development plan",
          "Currency log with dated entries",
          "Reflections on impact on practice",
        ],
        strategies: [
          {
            title: "Plan the trainer's PD year up front",
            summary:
              "Replace reactive PD with a 12-month plan negotiated with each trainer.",
            steps: [
              "Discuss the trainer's goals and gaps",
              "Pick 4-6 currency activities across the year",
              "Block dates and budget early",
              "Review impact at the end of each cycle",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "1 hour per trainer per year",
          },
          {
            title: "Workplace shadow days twice a year",
            summary:
              "Each trainer spends 1-2 days on a real workplace floor in their industry, twice a year.",
            steps: [
              "Identify host workplaces and contacts",
              "Define learning goals before each visit",
              "Capture short reflections after",
              "Update teaching examples within 4 weeks",
            ],
            category: "workforce",
            effort: "deep_change",
            timeEstimate: "2-4 days per trainer per year",
          },
          {
            title: "Five-minute team currency stand-up",
            summary:
              "At each team meeting, one trainer shares one current industry insight in five minutes.",
            steps: [
              "Add it as a standing agenda item",
              "Rotate the speaker",
              "Capture one action per share",
              "Track it on a simple log",
            ],
            category: "workforce",
            effort: "quick_win",
            timeEstimate: "5 min per meeting",
          },
        ],
      },
      {
        code: "2.3",
        title: "Trainers and assessors have current vocational training and assessment skills",
        intent:
          "Pedagogy and assessment practice are kept fresh — trainers do not stop learning the day they start training.",
        whatItMeans:
          "Trainers are part of validation, observation and feedback cycles, and they take part in PD focused on training and assessment, not only their vocational area.",
        keyPractices: [
          "Annual peer observation cycle",
          "Mix vocational and pedagogical PD",
          "Use validation as a learning experience, not only a compliance one",
        ],
        evidenceExamples: [
          "Peer observation records",
          "Mixed PD log",
          "Validation reflections",
        ],
        strategies: [
          {
            title: "Run a low-stakes peer observation cycle",
            summary:
              "Pair trainers up to observe each other once per term using a short, friendly template.",
            steps: [
              "Pair trainers across rather than within disciplines",
              "Use a 5-question observation sheet",
              "Hold a 20-min debrief same day",
              "Trainer chooses one thing to try next",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "2 hours per term per pair",
          },
          {
            title: "Hold a quarterly teaching swap",
            summary:
              "Trainers swap a single session each quarter to experience a different style and class.",
            steps: [
              "Match volunteers and confirm cover",
              "Co-plan briefly the week before",
              "Each trainer reflects on what surprised them",
              "Share insights at the next team meeting",
            ],
            category: "workforce",
            effort: "deep_change",
            timeEstimate: "1 day per quarter",
          },
        ],
      },
      {
        code: "2.4",
        title: "VET workforce is supported and developed",
        intent:
          "Trainers and assessors are not on their own — they have induction, ongoing support and a real say in their development.",
        whatItMeans:
          "Induction is real, supervision and mentoring are available, workloads are reasonable, and feedback flows both ways between trainers and the RTO.",
        keyPractices: [
          "Structured induction for new trainers",
          "Mentoring and supervision arrangements",
          "Two-way feedback between trainers and management",
        ],
        evidenceExamples: [
          "Induction checklist with sign-offs",
          "Mentoring meeting notes",
          "Workforce survey results and actions",
        ],
        strategies: [
          {
            title: "Design a 30-day induction journey",
            summary:
              "Replace a 'here is your login' induction with a structured 30-day plan that includes observation, co-delivery and a check-in.",
            steps: [
              "Map out week 1: shadow & paperwork",
              "Week 2: co-deliver with a buddy",
              "Week 3: solo with debrief",
              "Day 30: check-in conversation",
            ],
            category: "workforce",
            effort: "deep_change",
            timeEstimate: "2 days to design, ongoing to run",
          },
          {
            title: "Hold a monthly trainer 1:1",
            summary:
              "A 30-minute monthly conversation that is not about compliance or rosters — about teaching and growth.",
            steps: [
              "Block recurring 30-min slots",
              "Use 3 standing prompts: wins, friction, support needed",
              "Capture agreed actions",
              "Close the loop in the next session",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "30 min per trainer per month",
          },
        ],
      },
    ],
  },
  {
    code: "QA3",
    title: "VET Student Support",
    tagline: "Putting the learner at the centre — for real.",
    description:
      "From the first moment a learner considers your RTO to the last moment of their qualification, this area is about clarity, fairness, support and respect.",
    standards: [
      {
        code: "3.1",
        title: "Pre-enrolment information is clear and accurate",
        intent:
          "Learners can make a real, informed choice before they hand over money or commit to a course.",
        whatItMeans:
          "Information about courses, costs, support, outcomes, modes and obligations is current, plain-language and consistent across channels.",
        keyPractices: [
          "Audit website and brochure consistency annually",
          "Use plain language in every learner-facing document",
          "Disclose costs, modes, support and outcomes upfront",
        ],
        evidenceExamples: [
          "Versioned course information sheets",
          "Plain language reading-level checks",
          "Pre-enrolment communications log",
        ],
        strategies: [
          {
            title: "Run a plain-language pass on every course page",
            summary:
              "Read each course page out loud to a non-VET friend. Anything they don't understand gets rewritten.",
            steps: [
              "List every course page or sheet",
              "Read aloud to a non-specialist",
              "Replace jargon with plain words",
              "Re-test reading level",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "30 min per course",
          },
          {
            title: "Build a single source of course truth",
            summary:
              "One spreadsheet that is the only allowed source of course facts. Website and brochures pull from it.",
            steps: [
              "List fields: code, fees, mode, duration, support",
              "Assign one owner per qualification",
              "Set a quarterly review cadence",
              "Update all channels from this source only",
            ],
            category: "compliance",
            effort: "deep_change",
            timeEstimate: "1 day setup, 30 min per quarter",
          },
        ],
      },
      {
        code: "3.2",
        title: "Pre-training review and informed choice",
        intent:
          "Each learner is helped to choose a course that is right for them — including saying 'maybe not this one' when needed.",
        whatItMeans:
          "Pre-training review looks at goals, prior learning, language/literacy/numeracy and likely support needs, and the result actually shapes enrolment.",
        keyPractices: [
          "Use a structured pre-training review tool",
          "Combine LLN screening with a goals conversation",
          "Document and act on findings",
        ],
        evidenceExamples: [
          "Completed pre-training review forms",
          "LLN screening results",
          "Notes of advice given",
        ],
        strategies: [
          {
            title: "Add a 15-minute goals conversation",
            summary:
              "Before any enrolment, a short structured conversation about why this course, why now and what success looks like.",
            steps: [
              "Use 4 standard prompts",
              "Capture answers in 3-4 sentences",
              "Flag mismatches early",
              "Refer to a different option where needed",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "15 min per learner",
          },
          {
            title: "Pair LLN screening with support, not gate-keeping",
            summary:
              "When LLN screening flags support needs, the next step is a real plan — not a quiet rejection.",
            steps: [
              "Use a validated screening tool",
              "Brief learners on its purpose",
              "Co-design a support plan with the learner",
              "Review the plan in week 4 of delivery",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "45 min per learner",
          },
        ],
      },
      {
        code: "3.3",
        title: "Learner support is responsive and accessible",
        intent:
          "Learners can get help when they need it — not just when the timetable allows.",
        whatItMeans:
          "Support services are clear, easy to access, culturally safe and adapted to the modes of learning offered (face-to-face, online, blended).",
        keyPractices: [
          "Publish support pathways in plain language",
          "Build cultural safety into design",
          "Track requests and response times",
        ],
        evidenceExamples: [
          "Support services map",
          "Cultural safety policy and PD records",
          "Support request register",
        ],
        strategies: [
          {
            title: "Map your support pathways",
            summary:
              "A one-page map of who to talk to for what, with names, channels and timeframes.",
            steps: [
              "List every support type you offer",
              "Add channel, owner and response time",
              "Test it with a current learner",
              "Print and pin where learners actually look",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "2 hours",
          },
          {
            title: "Run a 'try to get help' user test",
            summary:
              "Ask 3 learners to try to access support and time how long it takes from intent to actual help.",
            steps: [
              "Pick 3 willing learners",
              "Give each a small scenario",
              "Observe with no help",
              "Fix the worst friction first",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "1 hour per scenario",
          },
        ],
      },
      {
        code: "3.4",
        title: "Learners are treated fairly and with respect",
        intent:
          "Every learner experiences a learning environment that is safe, inclusive and free from discrimination, bullying and harassment.",
        whatItMeans:
          "Codes of conduct are real, complaints and appeals are easy to lodge, and behaviour standards apply equally to staff, learners and contractors.",
        keyPractices: [
          "Visible code of conduct and complaints process",
          "Staff training on inclusion, anti-discrimination and child safety",
          "Annual review of incidents and patterns",
        ],
        evidenceExamples: [
          "Signed code of conduct",
          "Complaints and appeals register",
          "Inclusion training records",
        ],
        strategies: [
          {
            title: "Re-design your complaints intake",
            summary:
              "Make it possible to lodge a complaint without staring at a 4-page PDF.",
            steps: [
              "Offer 3 channels: form, email, in person",
              "Acknowledge within 2 working days",
              "Track status visibly to the learner",
              "Close out with a written outcome",
            ],
            category: "learner_support",
            effort: "deep_change",
            timeEstimate: "1 week to design",
          },
          {
            title: "Run an annual inclusion conversation",
            summary:
              "Once a year, a structured all-staff session reviewing inclusion practice and behaviour standards using real (anonymised) examples.",
            steps: [
              "Pull 3-5 anonymised cases",
              "Use a facilitator if possible",
              "Discuss what went well and what to change",
              "Capture commitments in writing",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "Half day per year",
          },
        ],
      },
      {
        code: "3.5",
        title: "Issuing of qualifications and statements of attainment",
        intent:
          "When a learner is competent, they get the right document quickly, accurately and in a form they can use.",
        whatItMeans:
          "Issuance is timely, formats meet AQF requirements, USIs are verified, and reissuance is straightforward.",
        keyPractices: [
          "Verify USIs before completion",
          "Issue within 30 days of competency confirmation",
          "Maintain accurate records of issuance",
        ],
        evidenceExamples: [
          "Issuance register",
          "Sample qualifications and statements",
          "USI verification records",
        ],
        strategies: [
          {
            title: "Build a 14-day issuance target",
            summary:
              "Move your service standard inside the 30-day requirement — aim for 14 days from the final assessment decision.",
            steps: [
              "Map the current issuance process step by step",
              "Identify the slowest 1-2 steps",
              "Remove or batch them",
              "Track time-to-issue weekly",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "1 day to redesign",
          },
        ],
      },
    ],
  },
  {
    code: "QA4",
    title: "Governance",
    tagline: "Running the RTO like the serious thing it is.",
    description:
      "Leadership, accountability and the systems that keep everything else honest. Without this area, the other three drift over time.",
    standards: [
      {
        code: "4.1",
        title: "Accountable governance and leadership",
        intent:
          "Decision-makers know what they are accountable for and can show how they exercise that accountability.",
        whatItMeans:
          "Governance arrangements, delegations and responsibilities are documented, current and understood by the people in the roles.",
        keyPractices: [
          "Documented governance structure and delegations",
          "Regular leadership meetings with minutes",
          "Annual review of accountability arrangements",
        ],
        evidenceExamples: [
          "Org chart and delegations matrix",
          "Board / leadership meeting minutes",
          "Conflicts of interest register",
        ],
        strategies: [
          {
            title: "Refresh the org chart and delegations",
            summary:
              "Pull up your org chart, mark anything that is wrong in red, and fix it within a fortnight.",
            steps: [
              "Print the current org chart",
              "Annotate with the people in roles today",
              "Update titles, reporting lines and delegations",
              "Republish to the team",
            ],
            category: "governance",
            effort: "quick_win",
            timeEstimate: "Half day",
          },
          {
            title: "Run a focused governance health check",
            summary:
              "A 90-minute leadership session reviewing governance arrangements against the standard.",
            steps: [
              "List the requirements of 4.1",
              "Match each to current evidence",
              "Identify gaps and assign owners",
              "Add to the next quarter's improvement plan",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "90 min per quarter",
          },
        ],
      },
      {
        code: "4.2",
        title: "Risk and compliance management",
        intent:
          "The RTO knows what could go wrong, what would be most damaging, and what it is doing about it.",
        whatItMeans:
          "Risks are identified, rated, mitigated and reviewed. Compliance is treated as an ongoing practice, not a once-a-year scramble.",
        keyPractices: [
          "Maintain a live risk register",
          "Schedule internal compliance audits",
          "Brief leadership on risk monthly",
        ],
        evidenceExamples: [
          "Risk register with owners and dates",
          "Internal audit reports",
          "Risk briefing slides",
        ],
        strategies: [
          {
            title: "Stand up a one-page risk register",
            summary:
              "Skip the 80-page template and start with the top 10 risks on a single page.",
            steps: [
              "Brainstorm risks with leadership",
              "Pick the top 10 by likelihood x impact",
              "Add owner, mitigation, review date",
              "Review monthly",
            ],
            category: "governance",
            effort: "quick_win",
            timeEstimate: "Half day to build",
          },
          {
            title: "Schedule internal mini-audits",
            summary:
              "One small internal audit per month on a rotating area, instead of one massive annual one.",
            steps: [
              "List 12 audit topics across the year",
              "Assign a non-area auditor each month",
              "Use a simple 5-question template",
              "Track findings to closure",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "Half day per month",
          },
        ],
      },
      {
        code: "4.3",
        title: "Continuous improvement",
        intent:
          "The RTO actively looks for ways to be better — and then changes practice on the back of what it finds.",
        whatItMeans:
          "Feedback, validation and audit findings are pulled together, prioritised and acted on with named owners and dates.",
        keyPractices: [
          "Capture feedback from learners, staff and industry",
          "Maintain a single improvement register",
          "Review progress at leadership meetings",
        ],
        evidenceExamples: [
          "Improvement register with status",
          "Feedback summary reports",
          "Examples of changes implemented",
        ],
        strategies: [
          {
            title: "Run a quarterly 'what did we change' review",
            summary:
              "Every quarter, leadership reviews the improvement register and tells the team three real changes.",
            steps: [
              "Pull register changes for the quarter",
              "Pick the 3 most meaningful",
              "Communicate them to staff and learners",
              "Celebrate the contributors",
            ],
            category: "reflection",
            effort: "ongoing",
            timeEstimate: "1 hour per quarter",
          },
          {
            title: "Close the feedback loop visibly",
            summary:
              "When learners or staff give feedback, tell them what changed because of it.",
            steps: [
              "Track feedback by source",
              "Tag it with related improvements",
              "Send a short 'you said, we did' update each term",
              "Make it easy to see how to give feedback",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "1 hour per term",
          },
        ],
      },
      {
        code: "4.4",
        title: "Records, data and information management",
        intent:
          "Records are accurate, secure, accessible to the right people, and disposed of properly.",
        whatItMeans:
          "Student records, assessment evidence, financial records and personal information are managed under a documented framework.",
        keyPractices: [
          "Documented records management policy",
          "Backups and security controls in place",
          "Periodic access and disposal reviews",
        ],
        evidenceExamples: [
          "Records management policy",
          "Backup logs",
          "Access review reports",
        ],
        strategies: [
          {
            title: "Run a records walk-through",
            summary:
              "Pick one learner record and follow it from enrolment to archive, noting every place data lives.",
            steps: [
              "Choose one current learner with consent",
              "List every system holding their data",
              "Check access controls in each",
              "Capture and remediate any surprises",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "Half day",
          },
          {
            title: "Run an access review",
            summary:
              "Once a year, review who has access to what and remove anything stale.",
            steps: [
              "Pull access reports from each system",
              "Cross-check against current staff roles",
              "Remove or downgrade access where needed",
              "Document the review",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "1 day per year",
          },
        ],
      },
    ],
  },
];
