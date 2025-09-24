// ===================================
// HELPERS
// ===================================
const link = (label) => `#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/**
 * Creates a tree node object.
 * @param {string} t - The title/text of the node.
 * @param {Array} [kids=[]] - An array of child node objects.
 * @param {object} [details={}] - An object containing summary and description.
 * @returns {object} The node object.
 */
const mk = (t, kids = [], details = {}) => (kids.length ? {
    t,
    u: link(t),
    c: kids,
    details
} : {
    t,
    u: link(t),
    details
});


// ===================================
// CAREER TREE DATA (Fully Expanded with Specializations & Detailed Descriptions)
// ===================================
export const treeData = mk("Career Path Finder", [
    // --- After 10th (S.S.C.) ---
    mk("10th Pass", [
        mk("Engineering Diploma", [
            mk("Mechanical", [], {
                summary: "Deals with the design, construction, and use of machines and mechanical systems.",
                description: [
                    "<strong>Key Responsibilities:</strong> Designing and testing mechanical components, developing manufacturing processes, and managing machinery maintenance.",
                    "<strong>Core Subjects:</strong> Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing Technology.",
                    "<strong>Career Opportunities:</strong> Roles in automotive, aerospace, manufacturing, and energy sectors as a technician, supervisor, or designer."
                ]
            }),
            mk("Civil", [], {
                summary: "Focuses on designing, building, and maintaining infrastructure projects like roads, bridges, and buildings.",
                description: [
                    "<strong>Key Responsibilities:</strong> Analyzing survey reports, planning structures using software, estimating costs, and overseeing construction work.",
                    "<strong>Core Subjects:</strong> Structural Analysis, Geotechnical Engineering, Transportation Engineering, Construction Management.",
                    "<strong>Career Opportunities:</strong> Roles in public sector undertakings (PWD, NHAI), private construction firms, and real estate companies."
                ]
            }),
            mk("Electrical", [], {
                summary: "Involves the study and application of electricity, electronics, and electromagnetism.",
                description: [
                    "<strong>Key Responsibilities:</strong> Designing electrical systems, ensuring safety, maintaining power networks, and working on control systems.",
                    "<strong>Core Subjects:</strong> Circuit Theory, Electrical Machines, Power Systems, Control Systems.",
                    "<strong>Career Opportunities:</strong> Jobs in power plants, manufacturing industries, IT hardware, and renewable energy."
                ]
            }),
            mk("Electronics & Communication", [], {
                summary: "Specializes in transmitting information across channels like optical fiber and free space.",
                description: [
                    "<strong>Key Responsibilities:</strong> Designing communication systems, working on electronic circuits, and developing telecom/networking devices.",
                    "<strong>Core Subjects:</strong> Analog & Digital Circuits, Signal Processing, Communication Theory, Microprocessors.",
                    "<strong>Career Opportunities:</strong> Roles in telecommunication companies, mobile network operators, and IT networking firms."
                ]
            }),
            mk("Computer Engineering", [], {
                summary: "Combines computer science and electrical engineering to develop computer hardware and software.",
                description: [
                    "<strong>Key Responsibilities:</strong> Writing software, developing web apps, managing databases, and designing computer networks.",
                    "<strong>Core Subjects:</strong> Programming (C++, Java), Data Structures, Database Management, Networking.",
                    "<strong>Career Opportunities:</strong> Entry-level roles as a programmer, web developer, or network technician in the IT industry."
                ]
            }),
            mk("Information Technology", [], {
                summary: "Focuses on the use of computers to store, retrieve, transmit, and manipulate data in a business context.",
                description: [
                    "<strong>Key Responsibilities:</strong> Managing IT infrastructure, providing technical support, ensuring network security, and implementing software solutions.",
                    "<strong>Core Subjects:</strong> Networking, System Administration, Cybersecurity Fundamentals, Web Technologies.",
                    "<strong>Career Opportunities:</strong> Roles as an IT support specialist, network administrator, or systems analyst in various industries."
                ]
            }),
            mk("Automobile", [], {
                summary: "Specializes in the design, manufacturing, and operation of vehicles like cars and bikes.",
                description: [
                    "<strong>Key Responsibilities:</strong> Designing vehicle components, managing production lines, conducting quality tests, and diagnosing mechanical issues.",
                    "<strong>Core Subjects:</strong> Automotive Engines, Vehicle Dynamics, Chassis and Body Engineering, Automotive Electrical Systems.",
                    "<strong>Career Opportunities:</strong> Jobs in car manufacturing companies, service stations, and automotive design firms."
                ]
            })
        ], {
            summary: "A 3-year technical program after 10th grade focusing on practical engineering skills for entry-level roles.",
            description: [
                "A Diploma in Engineering (Polytechnic) is a practical, industry-focused program that prepares students for junior-level engineering jobs.",
                "It provides a strong foundation and allows lateral entry into the second year of a B.Tech/B.E. degree program."
            ]
        }),
        mk("Fine Arts / Commercial Arts Diploma", [], {
            summary: "Creative programs focusing on visual and artistic skills for careers in design, media, and art.",
            description: [
                "These diplomas are for students with a creative bent of mind, offering specialization in areas like painting, graphic design, and animation.",
                "They prepare students for careers in advertising agencies, media houses, and design studios."
            ]
        }),
        mk("Merchant Navy / Army / Navy / Air Force", [], {
            summary: "Serve the nation through a disciplined and challenging career in the Indian Armed Forces or commercial shipping.",
            description: [
                "After 10th grade, one can join the armed forces in non-commissioned roles (Soldier, Airman, Seaman) through recruitment rallies.",
                "A diploma in Marine Engineering or Nautical Science can lead to a career in the Merchant Navy as a junior officer or rating."
            ]
        })
    ], {
        summary: "Initial career and vocational paths available right after completing secondary school.",
        description: [
            "After the 10th grade, students can choose between continuing academic education or pursuing vocational courses for quicker employment.",
            "Options range from 2-3 year diploma courses to direct entry into various roles in armed forces and government sectors."
        ]
    }),

    // --- After 12th Science ---
    mk("12th Science", [
        mk("PCM", [
            mk("Engineering (B.E. / B.Tech)", [
                mk("Computer Science", [], {
                    summary: "Studies the theory and practice of software development, algorithms, and computing systems.",
                    description: [
                        "<strong>Key Responsibilities:</strong> Designing and building software, developing complex algorithms, working on databases, AI, and machine learning.",
                        "<strong>Core Subjects:</strong> Data Structures, Algorithms, Operating Systems, Computer Networks, Artificial Intelligence.",
                        "<strong>Career Opportunities:</strong> High-demand roles like Software Developer, Data Scientist, Machine Learning Engineer, and Cybersecurity Analyst."
                    ]
                }),
                mk("Information Technology", [], {
                    summary: "Focuses on the application of computing technology in business and industry.",
                    description: [
                        "<strong>Key Responsibilities:</strong> Managing enterprise software systems, ensuring network infrastructure is robust, and safeguarding data.",
                        "<strong>Core Subjects:</strong> Similar to Computer Science but with more focus on business applications, system administration, and security.",
                        "<strong>Career Opportunities:</strong> IT Consultant, Network Architect, Cloud Engineer, and Systems Administrator."
                    ]
                }),
                mk("Electronics & Communication", [], {
                    summary: "Deals with the design of electronic circuits, communication systems, and integrated circuits.",
                    description: [
                        "<strong>Key Responsibilities:</strong> Designing circuits for smartphones and computers, developing communication networks (like 5G), and working on embedded systems.",
                        "<strong>Core Subjects:</strong> Semiconductor Devices, Analog & Digital Circuits, Signal Processing, VLSI Design.",
                        "<strong>Career Opportunities:</strong> Roles in semiconductor companies (Intel, AMD), telecommunications (Jio, Airtel), and consumer electronics."
                    ]
                }),
                mk("Mechanical", [], {
                    summary: "A broad field concerning the design, analysis, and manufacturing of mechanical systems.",
                    description: [
                        "<strong>Key Responsibilities:</strong> Designing everything from tiny components to large machines, analyzing thermal and mechanical stresses, and overseeing manufacturing.",
                        "<strong>Core Subjects:</strong> Thermodynamics, Machine Design, Robotics, Manufacturing Processes.",
                        "<strong>Career Opportunities:</strong> Core engineering roles in automotive, aerospace, robotics, and energy sectors."
                    ]
                }),
                mk("Civil", [], {
                    summary: "Involves the design, construction, and maintenance of public works like roads, bridges, and dams.",
                    description: [
                        "<strong>Key Responsibilities:</strong> Planning and designing large-scale infrastructure, managing construction projects, and ensuring structural safety and sustainability.",
                        "<strong>Core Subjects:</strong> Structural Engineering, Geotechnical Engineering, Environmental Engineering, Transportation.",
                        "<strong>Career Opportunities:</strong> Government jobs (PWD, CPWD), private construction firms (L&T), and real estate development."
                    ]
                })
            ], {
                summary: "A 4-year undergraduate degree in various engineering disciplines, leading to technical and R&D roles.",
                description: [
                    "Bachelor of Engineering (B.E.) or Bachelor of Technology (B.Tech) is a highly sought-after undergraduate program.",
                    "It provides in-depth theoretical and practical knowledge to solve real-world technical problems."
                ]
            }),
            mk("Architecture (B.Arch)", [], {
                summary: "A 5-year professional degree program focused on the art and science of building design and construction.",
                description: [
                    "Bachelor of Architecture (B.Arch) combines artistic talent with engineering to design functional and aesthetic buildings.",
                    "The curriculum involves studio work, theory, and practical training, leading to a license to practice as an architect."
                ]
            }),
            mk("B.Sc (Physics / Maths / IT)", [], {
                summary: "A 3-year undergraduate degree in fundamental sciences, forming a base for research or specialized master's degrees.",
                description: [
                    "This degree focuses on the theoretical and experimental aspects of science.",
                    "It is an excellent choice for students who want to pursue a career in research, teaching, or further specialized studies like M.Sc, MCA, or an MBA."
                ]
            })
        ], {
            summary: "Paths for students who studied Physics, Chemistry, and Maths, leading to engineering, technology, and research careers.",
            description: ["This stream opens doors to a vast array of careers in technology, analytics, research, and defense."]
        }),

        mk("PCB", [
            mk("MBBS / BDS", [
                mk("General Medicine", [], { summary: "Specializes in diagnosing, treating, and preventing diseases in adults." }),
                mk("General Surgery", [], { summary: "A surgical specialty that focuses on abdominal contents and trauma." }),
                mk("Pediatrics", [], { summary: "The branch of medicine that involves the medical care of infants, children, and adolescents." }),
                mk("Orthopedics", [], { summary: "Deals with conditions involving the musculoskeletal system, including bones, joints, and ligaments." })
            ], {
                summary: "The primary path to becoming a licensed doctor (MBBS) or dentist (BDS), with postgraduate specializations.",
                description: [
                    "MBBS (Bachelor of Medicine, Bachelor of Surgery) and BDS (Bachelor of Dental Surgery) are highly competitive professional degrees.",
                    "These programs require rigorous study and clinical practice, leading to careers dedicated to patient care."
                ]
            }),
            mk("Pharmacy (B.Pharm)", [], {
                summary: "The science and technique of preparing and dispensing drugs, leading to careers in healthcare and the pharmaceutical industry.",
                description: [
                    "Pharmacy involves understanding drug composition, effects, and safe usage.",
                    "Graduates can work in hospitals, retail pharmacies, or in the pharmaceutical industry in R&D, manufacturing, or sales."
                ]
            }),
            mk("B.Sc Nursing", [], {
                summary: "A degree-based path to becoming a registered nurse, with options for advanced specialization.",
                description: [
                    "Bachelor of Science in Nursing is a 4-year professional course that prepares students for roles in patient care, administration, and education within the healthcare system."
                ]
            }),
            mk("Paramedical Courses", [], {
                summary: "Healthcare fields that provide diagnostic, technical, and therapeutic services to support doctors.",
                description: [
                    "Paramedics are the backbone of the healthcare industry. Courses include Medical Lab Technology (DMLT), Radiology, Physiotherapy, and Optometry.",
                    "These roles are crucial for accurate diagnosis and patient recovery."
                ]
            })
        ], {
            summary: "Paths for students who studied Physics, Chemistry, and Biology, leading to medical, healthcare, and life sciences careers.",
            description: ["This stream is primarily for students aspiring to build a career in medicine, dentistry, and allied health sciences."]
        })
    ], {
        summary: "Advanced academic and professional paths available after completing higher secondary education in the science stream."
    }),

    // --- After 12th Commerce ---
    mk("12th Commerce", [
        mk("B.Com", [], {
            summary: "A 3-year foundational undergraduate degree in commerce, business, accounting, and finance.",
            description: ["Bachelor of Commerce is a versatile degree that prepares students for careers in accounting, banking, and finance. It is also a common pathway to professional courses like CA and CS."]
        }),
        mk("BBA / BBM", [], {
            summary: "A management-focused bachelor's degree preparing students for corporate leadership roles.",
            description: ["Bachelor of Business Administration (BBA) or Management (BBM) focuses on developing managerial and entrepreneurial skills. It is an ideal precursor to an MBA."]
        }),
        mk("CA (Chartered Accountancy)", [], {
            summary: "A professional certification for accounting, auditing, and taxation, leading to roles in finance.",
            description: ["CA is a prestigious and rigorous professional course that involves clearing multiple levels of exams. CAs are highly sought after in the financial industry."]
        }),
        mk("CS (Company Secretary)", [], {
            summary: "A professional role responsible for a company's legal and regulatory compliance.",
            description: ["A Company Secretary is an expert in corporate law and governance. This role is vital for ensuring a company operates within legal boundaries."]
        })
    ], {
        summary: "Academic and professional paths focused on business, finance, accounting, and management.",
        description: ["The Commerce stream provides a strong foundation for students interested in the world of business, trade, and economics."]
    }),

    // --- After 12th Arts ---
    mk("12th Arts", [
        mk("B.A. (Bachelor of Arts)", [], {
            summary: "A versatile 3-year degree in humanities and social sciences, leading to diverse careers.",
            description: ["A B.A. allows specialization in subjects like History, Political Science, Economics, and Psychology. It builds critical thinking and analytical skills, essential for civil services, journalism, and academia."]
        }),
        mk("LLB (Law)", [], {
            summary: "A professional law degree (Bachelor of Laws) that is the first step to a career in the legal profession.",
            description: ["Students can pursue an integrated 5-year B.A. LLB course right after the 12th grade. Law offers various specializations like Corporate, Criminal, and Intellectual Property Law."]
        }),
        mk("Journalism / Mass Communication", [], {
            summary: "A field concerned with collecting, creating, and distributing information to a large audience.",
            description: ["This field covers print, broadcast, and digital media. It is for those who are curious, have strong communication skills, and want to work in media houses, advertising, or public relations."]
        }),
        mk("Hotel Management", [], {
            summary: "A professional degree focusing on the operations and management of hotels, restaurants, and resorts.",
            description: ["This is a service-oriented field that prepares students for management roles in the hospitality industry, covering areas like food production, front-office management, and housekeeping."]
        })
    ], {
        summary: "Academic paths centered on humanities, social sciences, languages, law, and creative arts.",
        description: ["The Arts stream offers a wide canvas of career options for students with creative, analytical, and linguistic abilities."]
    })
]);