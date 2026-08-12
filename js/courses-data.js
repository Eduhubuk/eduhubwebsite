/* ═══════════════════════════════════════════════════════════
   EDUCATION HUB · COURSE DATA
   Source of truth: laat.ac.uk (extracted 2026-08-12) plus
   client-supplied figures for the Plymouth Marjon short-course
   offering and the NCFE CACHE award. The site never reads LAAT
   at runtime — update this file to update the courses.
   Null / missing fields are simply not rendered; never invent.
   ═══════════════════════════════════════════════════════════ */
window.EDUHUB_COURSES = {

  /* ── Undergraduate (awarded by Plymouth Marjon University, taught by LAAT, London) ── */
  ug: [
    {
      slug: "bsc-hons-business-foundation-year",
      name: "BSc (Hons) Business with Foundation Year",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "1 year full-time · up to 2 years part-time (Foundation Year)",
      intakes: null,
      applicationFee: null,
      tuition: "£5,760 per year (26/27)",
      assessment: "100% coursework — no exams",
      delivery: null,
      overview: "A Level 3 foundation programme forming the first year of the BSc (Hons) Business with Foundation Year, aimed at applicants without traditional entry qualifications or those returning to education. It builds academic study skills, core business concepts, data awareness and professional skills, leading directly onto the BSc (Hons) Business degree.",
      entry: [
        "Minimum of 32 UCAS Tariff Points (standard entry)",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent",
        "Non-standard entry: PMU-approved Level 2 English & Maths tests plus relevant work experience"
      ],
      structure: [
        { stage: "Foundation Year (Level 3, 120 credits)", modules: [
          "Academic Skills (40 credits)",
          "Introduction to Organisations (20 credits)",
          "Business Information and Data (20 credits)",
          "Principles of Business (20 credits)",
          "Foundation Year Project (20 credits)"
        ]}
      ]
    },
    {
      slug: "bsc-hons-business-first-year",
      name: "BSc (Hons) Business — Year 1",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "1 year full-time · up to 2 years part-time",
      intakes: null,
      applicationFee: null,
      tuition: "£9,535 per year (26/27)",
      assessment: "100% coursework — no exams",
      delivery: null,
      overview: "Year 1 (Level 4) of the BSc (Hons) Business degree, introducing the core principles, functions and practices of modern business organisations — marketing, accounting and finance, people management and enterprise creation — alongside academic and professional skills development.",
      entry: [
        "Minimum of 96 UCAS Tariff Points (standard entry)",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent",
        "Also open to students progressing from a Foundation Year or equivalent",
        "Non-standard entry: PMU-approved Level 2 English & Maths tests plus relevant work experience"
      ],
      structure: [
        { stage: "Year 1 (Level 4, 120 credits)", modules: [
          "Business Environment (20 credits)",
          "Academic, Personal and Professional Development (20 credits)",
          "Marketing (20 credits)",
          "Accounting and Finance (20 credits)",
          "People Management (20 credits)",
          "Enterprise Creation (20 credits)"
        ]}
      ]
    },
    {
      slug: "bsc-hons-business-second-year",
      name: "BSc (Hons) Business — Year 2",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "1 year full-time · up to 2 years part-time",
      intakes: null,
      applicationFee: null,
      tuition: "£9,535 per year (26/27)",
      assessment: "100% coursework — no exams",
      delivery: null,
      overview: "Year 2 (Level 5) of the BSc (Hons) Business degree, building on Year 1 with more applied and analytical study: innovation, advertising and promotion, financial management, organisational behaviour, business consultancy and research methods.",
      entry: [
        "Successful progression from Year 1 or equivalent Level 4 qualifications",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent"
      ],
      structure: [
        { stage: "Year 2 (Level 5, 120 credits)", modules: [
          "Intrapreneurship & Innovation (20 credits)",
          "Advertising & Promotion (20 credits)",
          "Financial Management & Investment (20 credits)",
          "Organisational Behaviour (20 credits)",
          "Business Consultancy (20 credits)",
          "Research Methods (20 credits)"
        ]}
      ]
    },
    {
      slug: "bsc-hons-business-top-up",
      name: "BSc (Hons) Business (Top-up)",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "1 year full-time · up to 2 years part-time",
      intakes: null,
      applicationFee: null,
      tuition: "£9,535 per year (26/27)",
      assessment: "100% coursework — no exams",
      delivery: null,
      overview: "A one-year Level 6 top-up for students who have completed a relevant Level 5 qualification and want to convert it into a full honours degree in business. Covers leadership, strategy, contemporary business issues and operations, with a substantial independent Honours Project.",
      entry: [
        "Completed relevant Level 5 qualification (HND, Foundation Degree or equivalent) in Business or a related field",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent"
      ],
      structure: [
        { stage: "Top-up Year (Level 6, 120 credits)", modules: [
          "Leadership and Management (20 credits)",
          "Business Reality (20 credits)",
          "Contemporary Business Issues (20 credits)",
          "Operations and Strategy Management (20 credits)",
          "Honours Project (40 credits)"
        ]}
      ]
    },
    {
      slug: "certhe-business",
      name: "Certificate of Higher Education (CertHE) in Business",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "1 year full-time · up to 2 years part-time",
      intakes: null,
      applicationFee: null,
      tuition: "£9,535 per year (26/27)",
      assessment: "100% coursework — no exams",
      delivery: null,
      overview: "A one-year Level 4 qualification introducing higher-education study in business — core business functions, academic skills and professional development. Suited to students new to higher education, those wanting a shorter standalone qualification, and mature learners returning to study.",
      entry: [
        "Minimum of 64 UCAS Tariff Points (standard entry)",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent",
        "Non-standard entry: PMU-approved Level 2 English & Maths tests plus relevant work experience"
      ],
      structure: [
        { stage: "CertHE (Level 4, 120 credits)", modules: [
          "Business Environment (20 credits)",
          "Academic, Personal and Professional Development (20 credits)",
          "Marketing (20 credits)",
          "Accounting and Finance (20 credits)",
          "People Management (20 credits)",
          "Enterprise Creation (20 credits)"
        ]}
      ]
    },
    {
      slug: "bsc-hospitality-international-tourism",
      name: "BSc (Hons) Hospitality and International Tourism Management with Foundation Year",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT)",
      duration: "4 years full-time · 8 years part-time",
      intakes: null,
      applicationFee: null,
      tuition: "£5,760 per year (26/27)",
      assessment: "100% coursework (projects, presentations, dissertation)",
      delivery: null,
      overview: "A four-year honours degree (480 credits) combining hospitality, international tourism and events management, opening with an integrated foundation year. The programme moves from academic and business foundations through rooms division, food and beverage and service quality, to a final year with a dissertation and an events management pathway.",
      entry: [
        "Minimum of 32 UCAS Tariff Points (standard entry)",
        "English: IELTS 6.0+ (minimum 5.5 in each component) or PMU-approved equivalent",
        "Non-standard entry: PMU-approved Level 2 English & Maths tests plus relevant work experience"
      ],
      structure: [
        { stage: "Level 3 — Foundation Year (120 credits)", modules: [
          "Academic Skills (40 credits)",
          "Introduction to Organisations (20 credits)",
          "Business Information and Data (20 credits)",
          "Principles of Business (20 credits)",
          "Foundation Year Project (20 credits)"
        ]},
        { stage: "Level 4 — Year 1 (120 credits)", modules: [
          "Introduction to Hospitality, International Tourism & Events Management (20 credits)",
          "Marketing and Digital Media for Hospitality, Tourism & Events (20 credits)",
          "Developing Academic & Professional Skills (20 credits)",
          "Financial Resources and Techniques (20 credits)",
          "Understanding Management (20 credits)",
          "Managing Service Quality (20 credits)"
        ]},
        { stage: "Level 5 — Year 2 (120 credits)", modules: [
          "Sustainable Project Management for Hospitality, Tourism & Events (20 credits)",
          "Research Methods in Action (20 credits)",
          "Human Resource Management (20 credits)",
          "Work Based Consultancy and Employability (20 credits)",
          "Rooms Division Management (20 credits)",
          "International Food and Beverage Management (20 credits)"
        ]},
        { stage: "Level 6 — Year 3, Events Management pathway (120 credits)", modules: [
          "Branding and Advertising (20 credits)",
          "Facilities Management (20 credits)",
          "Ethics, Sustainability and Responsibility (20 credits)",
          "Research Project — Dissertation (20 credits)",
          "Event Design and Production (20 credits)",
          "Managing Events (20 credits)"
        ]}
      ]
    }
  ],

  /* ── Postgraduate ── */
  pg: [
    {
      slug: "mba-top-up",
      name: "MBA Top-Up",
      awarding: "Plymouth Marjon University",
      location: "London, UK (LAAT) · hybrid",
      duration: "6–8 months",
      intakes: "January · May · September",
      applicationFee: null,
      tuition: null,
      assessment: "Assessed entirely through coursework (project proposals and strategic management reports)",
      delivery: "Hybrid — a 60:40 blend of self-paced digital modules and live expert-led sessions",
      overview: "A 60-credit postgraduate top-up for professionals who have already completed 120 credits of Level 7 study in business or management, leading to a full MBA awarded by Plymouth Marjon University. Centred on strategic management and project-based learning, and designed around working professionals.",
      entry: [
        "Level 7 Diploma in Strategic Planning and Management, or an equivalent 120-credit Level 7 qualification from a recognised awarding body (e.g. ATHE, Qualifi, OTHM) — equivalents subject to University verification",
        "Good standard of English sufficient for postgraduate-level study"
      ],
      structure: [
        { stage: "Top-up (Level 7, 60 credits)", modules: [
          "Management Project Methods (20 credits) — research methods, project proposal development and ethics",
          "Strategic Management Project (40 credits) — strategic decision-making, implementation and leadership"
        ]}
      ]
    }
  ],

  /* ── Short courses · Plymouth Marjon University awarded (client-supplied commercial terms — do not alter) ── */
  shortMarjon: {
    heading: "Plymouth Marjon University Awarded Courses",
    terms: {
      fee: "GBP 250 per learner, per course",
      minBatch: "5 learners",
      maxBatch: "25 learners",
      intakes: "January, April, July, and October",
      commission: "GBP 50 per learner"
    },
    courses: [
      {
        name: "Artificial Intelligence and Machine Learning",
        duration: "7.5 hours",
        overview: "An introductory course covering AI and machine-learning concepts, their history and everyday applications — designed for learners without a coding or technical background."
      },
      {
        name: "Artificial Intelligence Systems and Applications",
        duration: "10 hours",
        overview: "A practical exploration of AI tools and how they are applied across business, healthcare, education and the creative sectors."
      },
      {
        name: "Artificial Intelligence, Ethics and Digital Society",
        duration: "7.5 hours",
        overview: "Examines the ethical and societal implications of AI, including bias, fairness, privacy and accountability."
      }
    ]
  },

  /* ── Short course · NCFE CACHE awarded (client-supplied — do not alter) ── */
  ncfe: {
    heading: "NCFE CACHE Awarded Course",
    course: {
      name: "Level 3 Award for SENCo in Early Years Settings",
      awarding: "NCFE CACHE",
      type: "Ofqual-regulated, self-learning short course",
      fee: "GBP 450 per learner",
      commission: "GBP 100 per learner"
    }
  },

  /* ── Further short courses listed by LAAT (titles only — no further details published) ── */
  shortLaat: [
    "First Aid",
    "Safeguarding",
    "Health and Safety",
    "Leading a Team",
    "Communication in Early Years",
    "Food Safety",
    "Chef Courses",
    "British Values"
  ]
};
