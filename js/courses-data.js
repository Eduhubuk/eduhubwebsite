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
      "location": "Cambridge / Chelmsford / King's Lynn / Peterborough, UK",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years full-time (4 years with foundation year)",
      "tuition": "£20,500 per year (international, 2026/27); UK £9,790 per year",
      "intakes": "September 2026; March 2027 (foundation-year route also January 2027)",
      "entrySummary": "96 UCAS Tariff points, plus 3 GCSEs at grade C/4 or above including English and Maths · IELTS 7.0 overall with at least 6.5 in writing and 7.0 in reading, listening and speaking"
    },
    {
      "name": "BSc (Hons) Business Management",
      "awarding": "Anglia Ruskin University",
      "location": "Cambridge and Chelmsford, UK",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years full-time (options: 4 years with placement, 4 years with foundation year, 2 years accelerated)",
      "tuition": "£17,500 per year (international, 2026/27, standard route); accelerated route £20,500 per year; UK £9,790 per year",
      "intakes": "September 2026; January 2027",
      "entrySummary": "96 UCAS Tariff points, plus 3 GCSEs at grade C/4 or above including English and Maths · IELTS 6.0 (Academic) or equivalent"
    },
    {
      "name": "Business Management BSc (Hons)",
      "awarding": "Anglia Ruskin University",
      "location": "Online (university based in Cambridge/Chelmsford, UK)",
      "mode": "Online",
      "note": null,
      "duration": "4 years part-time online",
      "tuition": "£17,700 total for the course (£4,425 per year over 4 years); standard fee, no separate international rate stated",
      "intakes": "January and September (next application deadline 27 August 2026)",
      "entrySummary": "At least 80 UCAS Tariff points at A Level or NVQ Level 3 (or equivalent), plus Maths and English GCSEs at grade C or above · IELTS 6.0 or equivalent if English is not your first language"
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
      "location": "Canterbury and Medway, UK",
      "mode": "On Campus",
      "note": "Only UK Domicile",
      "duration": "3 years full-time",
      "tuition": "£17,000 per year (overseas, 2026/27); UK £9,790 per year",
      "intakes": "September 2026",
      "entrySummary": "GCSE English language and mathematics grades 4-9/A-C (or equivalent); typical offer BBC at A level or equivalent; place subject to interview, health clearance and DBS check · IELTS 7.0 overall with no element below 6.5 for nursing courses starting 2026 (6.5 overall, no element below 6.5, from 2027 entry)"
    },
    {
      "name": "BSc (Hons) Policing and Criminal Investigation",
      "awarding": "Arden University",
      "location": "Online (Arden University head office: Coventry, UK)",
      "mode": "Online",
      "note": null,
      "duration": "Part-time: 3 years+ (online, flexible)",
      "tuition": "£7,140 per level x 3 levels (Levels 4-6) = £21,420 total (standard fee shown for UK-England); online fees vary by country tier — e.g. India shows £5,500 per level (£16,500 total). No academic year stated",
      "intakes": "October 2026",
      "entrySummary": "Two A level subjects (or equivalent), plus grade C or above in three GCSE subjects (or equivalent); Access to HE / BTEC Extended Diploma also accepted; non-standard entry via work experience considered · IELTS 6.0 with no less than 5.5 in any element, or TOEFL iBT 90, or equivalent"
    },
    {
      "name": "LLB (Hons) Law",
      "awarding": "Arden University",
      "location": "Online (blended option available at UK study centres; head office Coventry, UK)",
      "mode": "Online",
      "note": null,
      "duration": "Part-time: 3 years+ (online, flexible)",
      "tuition": "£7,140 per level x 3 levels (Levels 4-6) = £21,420 total (standard online fee shown for UK-England); online fees vary by country tier — e.g. India shows £5,500 per level (£16,500 total). Blended on-campus route £9,525 per year. No academic year stated",
      "intakes": "September 2026; October 2026; February 2027",
      "entrySummary": "Three A level subjects (or equivalent), plus grade C or above in four GCSE subjects including English (or equivalent), or a recognised Access Programme · IELTS 6.0 with no less than 5.5 in any element, or TOEFL iBT 80, or equivalent"
    },
    {
      "name": "HND Qualifications",
      "awarding": "City of Glasgow College- Scotland",
      "location": "Glasgow, Scotland, UK (City Campus, 190 Cathedral Street; Riverside Campus, 21 Thistle Street)",
      "mode": "On Campus",
      "note": null,
      "duration": "2 years full-time (college states: 'A Higher National Diploma (HND) will take two years full-time'; SCQF Level 8)",
      "tuition": "£8,500 (international fee for 2026/27 full-time courses, including SQA fee) — flat college-wide rate, not HND-specific"
    },
    {
      "name": "Diploma in Electrical Installations",
      "awarding": "MCAST",
      "location": "MCAST Main Campus, Triq Kordin, Paola, Malta (Institute of Engineering and Transport)",
      "mode": "On Campus",
      "note": null,
      "duration": "1 year full-time (MQF Level 3, 60 ECTS)",
      "tuition": "EUR 6,700 total course fee for non-EU students (MQF Level 3, 1-year courses, per MCAST non-EU fee schedule 2024/25); free for Maltese/EU nationals",
      "intakes": "October (non-EU application window is for courses commencing October 2026)",
      "entrySummary": "MCAST MQF Level 2 Foundation Certificate, or 2 subjects at SEC/SSC&P/SSQP (pass grade) · Positive colour vision assessment clearance required"
    },
    {
      "name": "Diploma In Electrical Engineering",
      "awarding": "MCAST",
      "location": "MCAST Main Campus, Triq Kordin, Paola, Malta (Institute of Engineering and Transport)",
      "mode": "On Campus",
      "note": null,
      "duration": "1 year full-time (MQF Level 3, 60 ECTS) — applies to MCAST Level 3 engineering diplomas generally",
      "tuition": "EUR 6,700 total course fee for non-EU students (MQF Level 3, 1-year courses, per MCAST non-EU fee schedule 2024/25); free for Maltese/EU nationals",
      "intakes": "October",
      "entrySummary": "MCAST MQF Level 2 Foundation Certificate, or 2 subjects at SEC/SSC&P/SSQP (pass grade)"
    },
    {
      "name": "Diploma in Mechanical Engineering",
      "awarding": "MCAST",
      "location": "MCAST Main Campus, Triq Kordin, Paola, Malta (Institute of Engineering and Transport, Mechanical Engineering Department)",
      "mode": "On Campus",
      "note": null,
      "duration": "1 year full-time (MQF Level 3, 60 ECTS)",
      "tuition": "EUR 6,700 total course fee for non-EU students (MQF Level 3, 1-year courses, per MCAST non-EU fee schedule 2024/25); free for Maltese/EU nationals",
      "intakes": "October",
      "entrySummary": "MCAST MQF Level 2 Foundation Certificate, or 2 subjects at SEC/SSC&P/SSQP (pass grade) · Maturity clause available for applicants 19+"
    },
    {
      "name": "Diploma in Air Conditioning (HVAC)",
      "awarding": "MCAST",
      "location": "MCAST Main Campus, Triq Kordin, Paola, Malta (Institute of Engineering and Transport, Building Services Department)",
      "mode": "On Campus",
      "note": null,
      "duration": "1 year full-time (MQF Level 3, 60 ECTS)",
      "tuition": "EUR 6,700 total course fee for non-EU students (MQF Level 3, 1-year courses, per MCAST non-EU fee schedule 2024/25); free for Maltese/EU nationals",
      "intakes": "October",
      "entrySummary": "MCAST MQF Level 2 Foundation Certificate, or 2 subjects at SEC/SSC&P/SSQP (pass grade) · Positive colour vision assessment clearance required"
    },
    {
      "name": "Diploma in Automotive Engineering",
      "awarding": "MCAST",
      "location": "MCAST Main Campus, Triq Kordin, Paola, Malta (Institute of Engineering and Transport, Land Transport Department)",
      "mode": "On Campus",
      "note": null,
      "duration": "1 year full-time (MQF Level 3, 60 ECTS) — applies to MCAST Level 3 automotive diplomas generally",
      "tuition": "EUR 6,700 total course fee for non-EU students (MQF Level 3, 1-year courses, per MCAST non-EU fee schedule 2024/25); free for Maltese/EU nationals",
      "intakes": "October",
      "entrySummary": "MCAST MQF Level 2 Foundation Certificate, or 2 subjects at SEC/SSC&P/SSQP (pass grade)"
    },
    {
      "name": "Civil Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Karmi Campus, Karaoglanoglu, Kyrenia (Girne), North Cyprus",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (240 ECTS)",
      "tuition": "EUR 8,000 per year (Engineering faculty rate, 2025-26 international tuition) + EUR 500 yearly registration and activity fee"
    },
    {
      "name": "Computer Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Karmi Campus, Karaoglanoglu, Kyrenia (Girne), North Cyprus",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (132 credits / 40 courses)",
      "tuition": "EUR 8,000 per year (Engineering faculty rate, 2025-26 international tuition) + EUR 500 yearly registration and activity fee"
    },
    {
      "name": "AI Engineering (BSc)",
      "awarding": "Girne American University",
      "location": "Kyrenia (Girne), North Cyprus (GAU main campus)",
      "mode": "On Campus",
      "note": null,
      "tuition": "EUR 8,000 per year (Engineering faculty rate, 2025-26 international tuition) + EUR 500 yearly registration and activity fee — assumes Engineering faculty; program page shows no figure"
    },
    {
      "name": "Healthcare Management (BSc)",
      "awarding": "Girne American University",
      "location": "Karmi Campus, Karaoglanoglu, Kyrenia (Girne), North Cyprus",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years",
      "tuition": "EUR 8,000 per year (Health Sciences faculty rate, 2025-26 international tuition) + EUR 500 yearly registration and activity fee"
    },
    {
      "name": "Bachelor of Science in Artificial Intelligence",
      "awarding": "De Montfort University",
      "location": "Dubai, UAE",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "Bachelor of Arts in Fashion Marketing and Design",
      "awarding": "De Montfort University",
      "location": "Dubai, UAE (DMU Dubai campus, Dubai Internet City)",
      "mode": "On Campus",
      "note": null,
      "duration": "Three years full-time",
      "tuition": "AED 63,614 (figure shown on official course page; page framing suggests annual course fee but per-year vs total not explicitly labelled in extraction - verify before publishing)",
      "intakes": "January, September",
      "entrySummary": "A-Level CCD / IB 24 points / American HS Diploma 3.0 GPA + AP / CBSE 65% best four · IELTS Academic 6.0 (min 5.5 each band) or TOEFL iBT 72 or PTE 58"
    },
    {
      "name": "BA Business",
      "awarding": "IBAT College Dublin",
      "location": "Dublin, Ireland (Wellington Quay & Frederick Street campuses)",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years full-time",
      "tuition": "EUR 5,951 per year (overseas students)",
      "intakes": "October 2026",
      "entrySummary": "Leaving Certificate O6/H7 or higher in 5 subjects (incl. English & Maths) or equivalent · IELTS 6.0 (no band below 5.5)"
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
      "location": "Toronto, Ontario",
      "mode": "On Campus",
      "note": null,
      "duration": "47 weeks (954 hours)",
      "tuition": "CAD 15,600 (international; fee year not stated on page)",
      "intakes": "Bi-monthly",
      "entrySummary": "Ontario Secondary School Diploma or equivalent · OR 18+ years old and pass a qualifying test (Wonderlic, score 15)"
    },
    {
      "name": "Bachelors of Commerce",
      "awarding": "University Canada West",
      "location": "Vancouver, British Columbia",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (40 courses / 120 credits); accelerated 3-year completion option",
      "tuition": "CAD 89,000 total programme (international, 2026 fees: $2,225 per course x 40); 2027 fees: $93,440 total",
      "intakes": "Fall, Winter, Spring, Summer",
      "entrySummary": "Canadian Grade 12 diploma or equivalent with minimum C average (2.0 on 4.33 scale) · IELTS Academic 6.5 overall with minimum 6.0 in writing, or equivalent"
    },
    {
      "name": "Bachelor of Arts in Business Communication",
      "awarding": "University Canada West",
      "location": "Vancouver, British Columbia",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (40 courses / 120 credits)",
      "tuition": "CAD 89,000 total programme (international, 2026 fees: $2,225 per course x 40); 2027 fees: $93,440 total",
      "intakes": "Fall, Winter, Spring, Summer",
      "entrySummary": "Canadian Grade 12 diploma or equivalent with overall average of C or better · IELTS Academic 6.5 overall with minimum 6.0 in writing, or equivalent"
    },
    {
      "name": "BS Biomedical Sciences",
      "awarding": "University of Niagara Falls Canada",
      "location": "Niagara Falls, Ontario",
      "mode": "On Campus",
      "note": null,
      "duration": "48 months (120 credits)",
      "tuition": "CAD 120,000 total programme (international: $1,000 per credit x 120 credits), as published on official tuition page Aug 2026 (fee year not stated)",
      "intakes": "Fall (September), Winter (January)",
      "entrySummary": "Ontario Secondary School Diploma or equivalent, minimum 70% average on best 6 Grade 12 4U/4M courses · English language proficiency evidence if applicable"
    },
    {
      "name": "Bachelors Business Administration",
      "awarding": "University of Niagara Falls Canada",
      "location": "Niagara Falls, Ontario",
      "mode": "On Campus",
      "note": null,
      "duration": "48 months (120 credits)",
      "tuition": "CAD 80,040 total programme (international: $667 per credit x 120 credits), as published on official tuition page Aug 2026 (fee year not stated)",
      "intakes": "Fall (September), Winter (January)",
      "entrySummary": "OSSD or equivalent: six Grade 12 4U/4M courses incl. ENG4U and one 4U Math, minimum 70% average on best 6 · English language proficiency evidence if applicable"
    },
    {
      "name": "BA Business Top-up",
      "awarding": "IES Business School",
      "location": "Rouen, France (IES Normandie campus) — school identity confirmed",
      "mode": "On Campus",
      "note": null
    },
    {
      "name": "BA (Hons) Comic and Concept Art",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Hamburg, Germany",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years; 4 years international route (integrated foundation)",
      "entrySummary": "Direct entry: school-leaving certificate giving HE access (Abitur/IB/UK Level 3 equivalent); foundation route: age 17+, 11 years schooling · English: IELTS 6.0 (direct entry) / 5.0 (foundation)"
    },
    {
      "name": "BA (Hons) Game Design",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Hamburg, Germany",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years; 4 years international route (integrated foundation)",
      "entrySummary": "Direct entry: school-leaving certificate giving HE access (Abitur/IB/UK Level 3 equivalent); Year 3 entry with HND/DipHE (UK Level 5) · English: IELTS 6.0 (direct/Year 3) / 5.0 (foundation)"
    },
    {
      "name": "BA (Hons) Computer Science and Digitisation",
      "awarding": "Berlin School of Business and Innovation",
      "location": "Berlin, Germany",
      "mode": "On Campus",
      "note": null,
      "duration": "3 years; 4 years international route; Year 3 direct entry 1 year",
      "tuition": "EUR 10,425 per year (discounts up to 50% available)",
      "intakes": "February, October (intakes subject to change)",
      "entrySummary": "Direct entry: Abitur/Fachhochschulreife/Matura/IB or UK Level 3 equivalent; Year 3 entry with HND/DipHE (UK Level 5) · English: IELTS 6.0 (direct/Year 3) / 5.0 (foundation)"
    },
    {
      "name": "Bachelor of Science in Business Administration",
      "awarding": "Herzing University",
      "location": "Online (100% online; no campus delivery listed for this programme). Available in all 50 US states, DC and Virgin Islands.",
      "mode": "On Campus",
      "note": null,
      "duration": "36 months typical; 120 semester credit hours",
      "tuition": "$515 per credit (rate listed on official page as of Aug 2026; academic year not stated)",
      "intakes": "Multiple starts per year; next start listed as September 8 (page viewed 2026-08-17)",
      "entrySummary": "High school diploma, GED or equivalent · Capacity to succeed shown via prior ACT/SAT, prior college credit, or entrance testing; admissions interview"
    },
    {
      "name": "Bachelor of Arts in Psychology",
      "awarding": "Herzing University",
      "location": "Online (100% online classes; no on-campus option listed)",
      "mode": "On Campus",
      "note": null,
      "duration": "32 months average (8 semesters); 120 credits",
      "tuition": "$450 per credit (base tuition for 120 credits $54,000; rate listed on official page as of Aug 2026)",
      "intakes": "Multiple starts per year; next start listed as September 8 (page viewed 2026-08-17)",
      "entrySummary": "High school diploma, GED or equivalent · Entrance testing or prior ACT/SAT scores/college credit; admissions interview"
    },
    {
      "name": "Bachelor of Science in Computer Science",
      "awarding": "Avila University",
      "location": "Kansas City, Missouri (on campus)",
      "mode": "On Campus",
      "note": null,
      "tuition": "$40,540/yr tuition + $1,000/yr university fee (traditional undergraduate 12-18 credits/semester, 2025-2026; same list rate applies to international students - international first-year total cost estimate $41,540 tuition on the international admissions page)",
      "entrySummary": "International English proficiency: TOEFL iBT 61+ or IELTS 5.0 overall (no band below 5.0) or Duolingo 90+ · No specific GPA requirement published on international admissions page"
    },
    {
      "name": "BA in Supply Chain Management",
      "awarding": "Avila University",
      "location": "Online (100% online, asynchronous/synchronous mix; Avila University is in Kansas City, MO)",
      "mode": "On Campus",
      "note": null,
      "duration": "120 credit hours; 8-week courses, self-paced (no fixed years stated)",
      "tuition": "$275 per credit hour (adult undergraduate, stated as estimated 2023-2024 rate on programme page; university tuition page lists $300/credit for adult undergraduates fall 2025/spring 2026)",
      "intakes": "New sessions start every eight weeks, year-round",
      "entrySummary": "Admission requirements not published on the programme page · International English proficiency (university-wide): TOEFL iBT 61+ or IELTS 5.0"
    },
    {
      "name": "BA in Animation",
      "awarding": "Webster University",
      "location": "Webster Groves (St. Louis area), Missouri - in person",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (average time to complete)",
      "tuition": "$33,360 per academic year flat fee, full-time 13-18 credit hours (2026-2027); part-time $500 per credit hour",
      "intakes": "Fall, spring and summer terms; rolling admissions",
      "entrySummary": "Test-optional; competitive applicants have cumulative GPA 2.75+ on 4.0 scale, 19 units of academic credit · International: TOEFL iBT 80 or IELTS Academic 6.0 or Duolingo 110"
    },
    {
      "name": "BS Management Information System",
      "awarding": "Webster University",
      "location": "Webster Groves (St. Louis area), Missouri; also offered via Webster Online, Webster Geneva and Webster Tashkent campuses",
      "mode": "On Campus",
      "note": null,
      "duration": "4 years (average); 120 credit hours (57 required core credits)",
      "tuition": "$33,360 per academic year flat fee, full-time 13-18 credit hours (2026-2027); part-time $500 per credit hour",
      "intakes": "Fall, spring and summer terms; rolling admissions",
      "entrySummary": "Test-optional; competitive applicants have cumulative GPA 2.75+ on 4.0 scale · International: TOEFL iBT 80 or IELTS Academic 6.0 or Duolingo 110"
    },
    {
      "name": "BS Business Intelligence & Analytics",
      "awarding": "Concordia University Chicago",
      "location": "River Forest, Illinois (on campus)",
      "mode": "On Campus",
      "note": "Contract Terminated",
      "duration": "120 credits (4-year bachelor's; years not explicitly stated on official page)",
      "tuition": "$19,420 per semester / $38,840 annually flat rate for 12-18 credit hours (2026-2027); $1,178 per credit hour below 12 credits",
      "entrySummary": "International: TOEFL iBT 72 or IELTS 6.0 or Duolingo 95; official transcripts (foreign transcripts credential-evaluated) · Proof of secondary school graduation; certified financial support document; documents due at least 2 months before intended term"
    },
    {
      "name": "BS Health Science",
      "awarding": "Concordia University Chicago",
      "location": "River Forest, Illinois (on campus)",
      "mode": "On Campus",
      "note": "Contract Terminated",
      "duration": "120 credits (4-year bachelor's; years not explicitly stated on official page)",
      "tuition": "$19,420 per semester / $38,840 annually flat rate for 12-18 credit hours (2026-2027); $1,178 per credit hour below 12 credits",
      "entrySummary": "International: TOEFL iBT 72 or IELTS 6.0 or Duolingo 95; official transcripts (foreign transcripts credential-evaluated) · Proof of secondary school graduation; certified financial support document; documents due at least 2 months before intended term"
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
