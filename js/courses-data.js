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
    },

    /* ── Additional flagship programmes (client-supplied URLs, extracted 2026-08-17) ── */
    {
      "slug": "sp-jain-bba",
      "name": "Bachelor of Business Administration (BBA)",
      "awarding": "SP Jain London School of Management",
      "location": "London, UK (exchange at SP Jain campuses in Singapore, Dubai and Sydney)",
      "duration": "4 years full-time",
      "intakes": "September 2026",
      "applicationFee": null,
      "tuition": "International: £17,500 (Yr 1) rising to £19,000 (Yr 4) · UK: £9,525 per year",
      "assessment": null,
      "delivery": "On campus, full-time",
      "overview": "A four-year, full-time undergraduate business degree focused on business insight, critical thinking and decision-making. Students combine general business courses with specialisations including marketing, finance, entrepreneurship, business economics, and business analytics & AI.",
      "entry": [
        "120 UCAS Tariff Points in any subjects (equivalent to A-levels BBB; BTEC DDM; IB 30)",
        "Minimum 12 years of completed schooling"
      ],
      "structure": null
    },
    {
      "slug": "sp-jain-bds",
      "name": "BSc Data Science",
      "awarding": "SP Jain London School of Management",
      "location": "London & Sydney (semester 4 in Sydney)",
      "duration": "3 years full-time",
      "intakes": null,
      "applicationFee": null,
      "tuition": "International: £17,500 (Yr 1) rising to £18,500 (Yr 3) · UK: £9,275 per year",
      "assessment": null,
      "delivery": "On campus, full-time — includes a 4-month internship after Year 2",
      "overview": "A three-year, full-time undergraduate programme building mathematical knowledge and competencies in computation, statistical inference and probabilistic modelling. Includes a four-month internship after Year 2 and a final-year applied analytics capstone project.",
      "entry": [
        "Three GCE A-levels with a minimum of BBB, or equivalent"
      ],
      "structure": null
    },
    {
      "slug": "aivancity-programme-grande-ecole",
      "name": "Programme Grande École — AI and Data Science",
      "awarding": "aivancity School of AI & Data for Business & Society, Paris",
      "location": "Paris-Villejuif Campus, France",
      "duration": "5 years of higher education",
      "intakes": "September · January",
      "applicationFee": null,
      "tuition": null,
      "assessment": null,
      "delivery": "On campus; initial-training and work-study tracks; taught in French & English",
      "overview": "A five-year post-secondary programme training future AI engineers able to design intelligent systems and lead AI innovation projects, integrating AI ethics and responsible practice for business and society. Multiple entry points from high-school diploma up to bachelor's level.",
      "entry": [
        "Entry points from high-school diploma up to bachelor's degree level (1–4 years of college)"
      ],
      "structure": null
    },
    {
      "slug": "aivancity-bsc-applied-ai",
      "name": "Bachelor of Science in Applied Artificial Intelligence",
      "awarding": "aivancity School of AI & Data for Business & Society, Paris",
      "location": "Nice Côte d'Azur Campus, France",
      "duration": null,
      "intakes": "January · September",
      "applicationFee": null,
      "tuition": null,
      "assessment": null,
      "delivery": "Full-time, on campus",
      "overview": "An undergraduate programme (RNCP Level 6, Bac+3) preparing students for the profession of Artificial Intelligence Developer. The curriculum covers data processing, machine learning and deep learning, business issues, and the deployment of AI projects.",
      "entry": [
        "High-school diploma or one year of college (high-school senior / first-year college entry)"
      ],
      "structure": null
    },

    /* ── University flagship UG programmes — client Excel, 'Direct' sheet, used verbatim (2026-08-17).
          Light entries: listing cards only (no detail page). Includes universities the sheet marks
          'Contract Terminated' per explicit client instruction not to filter. ── */
    {
      "name": "Bachelor of Science in Nursing",
      "awarding": "Anglia Ruskin University",
      "location": "UK",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BSc (Hons) Business Management",
      "awarding": "Anglia Ruskin University",
      "location": "UK",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Business Management BSc (Hons)",
      "awarding": "Anglia Ruskin University",
      "location": "UK",
      "mode": "Online",
      "note": null
    },
    {
      "name": "BSc Business Top-up",
      "awarding": "Anglia Ruskin University",
      "location": "UK",
      "mode": "Online",
      "note": null
    },
    {
      "name": "Bachelor of Arts in English Language and Communication",
      "awarding": "Canterbury Christ Chruch Univesity",
      "location": "UK",
      "mode": "On Campus",
      "note": "Only UK Domicile"
    },
    {
      "name": "Bachelor of Science in Nursing",
      "awarding": "Canterbury Christ Chruch Univesity",
      "location": "UK",
      "mode": "On Campus",
      "note": "Only UK Domicile"
    },
    {
      "name": "BSc (Hons) Policing and Criminal Investigation",
      "awarding": "Arden University",
      "location": "UK",
      "mode": "Online",
      "note": null
    },
    {
      "name": "LLB (Hons) Law",
      "awarding": "Arden University",
      "location": "UK",
      "mode": "Online",
      "note": null
    },
    {
      "name": "HND Qualifications",
      "awarding": "City of Glasgow College- Scotland",
      "location": "UK",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Electrical Installations",
      "awarding": "MCAST",
      "location": "MALTA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma In Electrical Engineering",
      "awarding": "MCAST",
      "location": "MALTA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Mechanical Engineering",
      "awarding": "MCAST",
      "location": "MALTA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Air Conditioning (HVAC)",
      "awarding": "MCAST",
      "location": "MALTA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Automotive Engineering",
      "awarding": "MCAST",
      "location": "MALTA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Civil Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Cyprus",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Computer Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Cyprus",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "AI Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Cyprus",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Healthcare Management (BSc)",
      "awarding": "Girne American University",
      "location": "Cyprus",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Science in Artificial Intelligence",
      "awarding": "De Montfort University",
      "location": "Dubai",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Arts in Fashion Marketing and Design",
      "awarding": "De Montfort University",
      "location": "Dubai",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA Business",
      "awarding": "IBAT College Dublin",
      "location": "Ireland",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Business Administration",
      "awarding": "Pacific Link College",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Business Administration",
      "awarding": "York College of Applied Sciences",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Diploma in Business Administration",
      "awarding": "Canadian College of Higher Studies",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelors of Commerce",
      "awarding": "University Canada West",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Arts in Business Communication",
      "awarding": "University Canada West",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BS Biomedical Sciences",
      "awarding": "University of Niagara Falls Canada",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelors Business Administration",
      "awarding": "University of Niagara Falls Canada",
      "location": "Canada",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA Business Top-up",
      "awarding": "IES Business School",
      "location": "France",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA (Hons) Comic and Concept Art",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Germany",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA (Hons) Game Design",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Germany",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA (Hons) Computer Science and Digitisation",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Germany",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Science in Business Administration",
      "awarding": "Herzing University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Arts in Psychology",
      "awarding": "Herzing University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Science in Computer Science",
      "awarding": "Avila University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA in Supply Chain Management",
      "awarding": "Avila University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA in Animation",
      "awarding": "Webster University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BS Management Information System",
      "awarding": "Webster University",
      "location": "USA",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BS Business Intelligence & Analytics",
      "awarding": "Concordia University Chicago",
      "location": "USA",
      "mode": "On Campus",
      "note": "Contract Terminated"
    },
    {
      "name": "BS Health Science",
      "awarding": "Concordia University Chicago",
      "location": "USA",
      "mode": "On Campus",
      "note": "Contract Terminated"
    }
  ],

  /* ── Postgraduate ── */
  pg: [
    {
      slug: "mba-top-up",
      name: "MBA Top-Up",
      awarding: "Plymouth Marjon University",
      deliveredBy: "London Academy for Applied Technology (LAAT)",
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
        { stage: "Top-up (60 credits)", modules: [
          "Management Project Methods (20 credits) — research methods, project proposal development and ethics",
          "Strategic Management Project (40 credits) — strategic decision-making, implementation and leadership"
        ]}
      ]
    },
    {
      /* Source: LAAT MBA Dual Certification brochure (client-supplied, 2026) */
      slug: "full-mba-online",
      name: "Full MBA (Online)",
      awarding: "Plymouth Marjon University",
      deliveredBy: "London Academy for Applied Technology (LAAT)",
      location: "100% online",
      duration: "14 months (fast-track path)",
      intakes: "January · May · September",
      applicationFee: null,
      tuition: null,
      assessment: null,
      delivery: "100% online — 60% self-paced learning + 40% live interactive sessions",
      overview: "A dual-certification MBA pathway delivered fully online for working professionals. Stage 1 is the Diploma in Strategic Management & Leadership, awarded by an Ofqual-regulated UK awarding body; Stage 2 completes the MBA degree awarded by Plymouth Marjon University — a UK degree with no career break required.",
      entry: [
        "Typically aged 19 and above",
        "A first degree in Business, Management or related subjects, or a Level 6 qualification (e.g. a Diploma in Management) or an equivalent international qualification",
        "English: applicants whose first language is not English take an internal English proficiency test as part of admissions"
      ],
      structure: [
        { stage: "Stage 1 — Diploma in Strategic Management & Leadership (Ofqual-regulated UK awarding body)", modules: [
          "Strategic Planning",
          "Finance for Strategic Managers",
          "Research for Strategic Development",
          "Organisational Behaviour",
          "Personal Development for Leadership and Strategic Management",
          "International Business Environment",
          "Strategic Marketing",
          "Strategic Human Resource Management"
        ]},
        { stage: "Stage 2 — MBA Degree (awarded by Plymouth Marjon University)", modules: [
          "Management Project Methods — research methods, project proposal development and ethics",
          "Strategic Management Project — strategic decision-making, implementation and leadership"
        ]}
      ]
    }
  ],

  /* ── Short courses · Plymouth Marjon University awarded (client-supplied terms — do not alter;
        batch sizes and commission removed from public display per final refinement list) ── */
  shortMarjon: {
    heading: "Plymouth Marjon University Awarded Courses",
    terms: {
      fee: "Only GBP 250",
      intakes: "January, April, July, and October",
      delivered: "LAAT"
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

  /* ── Short course · NCFE CACHE awarded (client-supplied — do not alter;
        commission removed from public display per final refinement list) ── */
  ncfe: {
    heading: "NCFE CACHE Awarded Course",
    course: {
      name: "Level 3 Award for SENCo in Early Years Settings",
      awarding: "NCFE CACHE",
      type: "Ofqual-regulated, self-learning short course",
      fee: "GBP 450 per learner",
      delivered: "LAAT",
      overview: "An Ofqual-regulated, self-learning short course for Special Educational Needs Coordinators (SENCos) working in early years settings, awarded by NCFE CACHE."
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
