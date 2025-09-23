/* Disclaimer: This list is a consolidated compilation from provided data. 
  For the most current and detailed information on courses, admissions, and fees, 
  it is always recommended to visit the official college website.
*/

export const collegeData = [
    // ===================================
    // Ghaziabad Colleges
    // ===================================
    {
        name: "Mahamaya Government Degree College, Mahona",
        location: "Mahona, Ghaziabad, Uttar Pradesh",
        type: "Government",
        courses: ["B.A.", "B.Sc."],
        website: "https://mgdcm.in/",
        lat: 28.794580,
        lng: 77.314210,
        details: {
            programs: "Offers Bachelor of Arts (B.A.) and Bachelor of Science (B.Sc.) in various subjects.",
            eligibility: "Based on 12th-grade (Intermediate) scores. Admission is through the university's merit-based counseling process.",
            medium: "Hindi and English.",
            facilities: "Developing campus with library, basic science labs, and classroom facilities. Hostel facilities are not available."
        }
    },
    {
        name: "Government Polytechnic, Ghaziabad",
        location: "Hapur Road, near I.T.I, Ghaziabad, Uttar Pradesh",
        type: "Government",
        courses: ["Diploma in Civil Engineering", "Diploma in Mechanical Engineering", "Diploma in Electrical Engineering", "Diploma in Electronics Engineering", "Mechanical", "Civil", "Electrical", "Electronics"],
        website: "http://gpgaziabad.ac.in/",
        lat: 28.676318,
        lng: 77.469540,
        details: {
            programs: "Offers 3-year diploma courses in Civil, Mechanical, Electrical, and Electronics Engineering.",
            eligibility: "Admission through the Joint Entrance Examination Council, Uttar Pradesh (JEECUP).",
            medium: "Hindi and English.",
            facilities: "Includes workshops for all trades, well-equipped labs, a library, computer center, and hostel facilities for boys."
        }
    },
    {
        name: "Government Girls Polytechnic, Ghaziabad",
        location: "D-Block, Govindpuram, Ghaziabad, Uttar Pradesh",
        type: "Government",
        courses: ["Diploma in Computer Science", "Diploma in Electronics", "Diploma in Information Technology"],
        website: "https://ggp-gzb.com/",
        lat: 28.688050,
        lng: 77.465130,
        details: {
            programs: "Specializes in diploma courses for girls, including Computer Science, Electronics, and Information Technology.",
            eligibility: "Admission via the Joint Entrance Examination Council, Uttar Pradesh (JEECUP) exam.",
            medium: "English and Hindi.",
            facilities: "Secure campus with dedicated labs for IT and electronics, a library, and hostel facilities for girls."
        }
    },
    {
        name: "M.M.H. College, Ghaziabad",
        location: "Near G.T. Road, Ghaziabad, Uttar Pradesh",
        type: "Government-Aided",
        courses: ["B.A.", "B.Sc.", "B.Com", "LL.B.", "M.A.", "M.Sc.", "M.Com", "Physics", "Mathematics"],
        website: "https://www.mmhcollege.ac.in/",
        lat: 28.669810,
        lng: 77.433940,
        details: {
            programs: "A wide range of UG and PG courses including B.A, B.Sc, B.Com, and LL.B.",
            eligibility: "Merit-based admission based on 12th-grade marks through the university portal.",
            medium: "Hindi and English.",
            facilities: "Large campus with multiple departments, extensive library, sports facilities, labs, but limited hostel accommodation."
        }
    },
    {
        name: "Vidyavati Mukand Lal Girls College, Ghaziabad",
        location: "Ahinsa Khand II, Indirapuram, Ghaziabad, Uttar Pradesh",
        type: "Government-Aided",
        courses: ["B.A.", "B.Com", "B.Sc.", "M.A."],
        website: "https://www.vmlgcollege.org/",
        lat: 28.636290,
        lng: 77.361520,
        details: {
            programs: "Offers UG and PG courses for women, including B.A., B.Com, B.Sc., and M.A.",
            eligibility: "Admission based on merit of qualifying examinations (12th grade for UG).",
            medium: "Hindi and English.",
            facilities: "Safe and secure campus for women, with a library, computer lab, home science lab, and common rooms."
        }
    },

    // ===================================
    // Bengaluru Colleges
    // ===================================
    {
        name: "Indian Institute of Science (IISc), Bengaluru",
        type: "Government",
        lat: 13.021940,
        lng: 77.568260,
        courses: ["Computer Science", "Mechanical", "Electrical", "Aerospace", "Mathematics", "Physics", "Chemistry", "Biology"],
        website: "https://iisc.ac.in/",
        details: { programs: "Offers Bachelor of Science (Research), M.Tech, M.Des, and extensive Ph.D. programs. Primarily a research-focused institution.", eligibility: "Extremely competitive. Admission via national exams like JEE Main/Advanced for UG, GATE for PG, and separate interviews.", medium: "English.", facilities: "World-class research labs, one of India's largest libraries, high-performance computing, hostels, and comprehensive campus amenities." }
    },
    {
        name: "University Visvesvaraya College of Engineering (UVCE), Bengaluru",
        type: "Government",
        lat: 12.9721,
        lng: 77.5937,
        courses: ["Civil", "Mechanical", "Electrical", "Electronics & Communication", "Computer Science", "Information Technology", "Architecture (B.Arch)"],
        website: "https://uvce.ac.in/",
        details: { programs: "Offers Bachelor of Engineering (B.E.) in various disciplines and Bachelor of Architecture (B.Arch).", eligibility: "Admission through the Karnataka Common Entrance Test (KCET). Cut-offs are very high.", medium: "English.", facilities: "Historic city-center campus, excellent lab infrastructure, a central library, hostel accommodation, and campus-wide internet access." }
    },
    {
        name: "National Law School of India University (NLSIU), Bangalore",
        type: "Government",
        lat: 12.9348,
        lng: 77.5029,
        courses: ["LLB (Law)", "BA LLB", "LLM"],
        website: "https://www.nls.ac.in/",
        details: { programs: "India's top law school. Offers a five-year integrated B.A. LL.B. (Hons.) program, LL.M., and other advanced courses.", eligibility: "Admission is through the highly competitive Common Law Admission Test (CLAT).", medium: "English.", facilities: "Excellent moot court hall, extensive law library, residential campus with hostels, and sports facilities." }
    },
    {
        name: "Bangalore Medical College and Research Institute (BMCRI)",
        type: "Government",
        lat: 12.955625,
        lng: 77.571508,
        courses: ["MBBS / BDS", "General Medicine", "General Surgery", "Pediatrics", "Orthopedics"],
        website: "https://www.bmcri.org/",
        details: { programs: "Premier medical college offering MBBS, as well as postgraduate MD and MS degrees in various specializations.", eligibility: "Admission is strictly based on the National Eligibility cum Entrance Test (NEET) score. Cut-offs are extremely high.", medium: "English.", facilities: "Attached to major government hospitals (Victoria, Vani Vilas), advanced labs, vast medical library, and separate hostels." }
    },
    {
        name: "NIMHANS, Bengaluru",
        type: "Government",
        lat: 12.9416,
        lng: 77.5964,
        courses: ["MBBS / BDS", "MD Psychiatry", "DM/ MCh", "Clinical Psychology", "Neurosciences", "B.Sc Nursing"],
        website: "https://nimhans.ac.in/",
        details: { programs: "Specialized institute for mental health and neurosciences. Offers advanced degrees and diplomas in Psychiatry, Neurology, etc.", eligibility: "Admission through its own entrance test for various highly specialized courses. Requires a prior medical/psychology degree.", medium: "English.", facilities: "State-of-the-art research and clinical facilities, specialized library, and advanced neuroimaging labs." }
    },
    {
        name: "Government Dental College and Research Institute, Bangalore",
        type: "Government",
        lat: 12.9550,
        lng: 77.5710,
        courses: ["MBBS / BDS", "MDS", "Dental Surgery"],
        website: "http://gdcbangalore.edu.in/",
        details: { programs: "Offers Bachelor of Dental Surgery (BDS) and Master of Dental Surgery (MDS) in various specialties.", eligibility: "Admission to BDS is through NEET UG scores. Admission to MDS is through NEET MDS scores.", medium: "English.", facilities: "Features modern dental chairs, labs for prosthodontics and orthodontics, a library, and outpatient clinics." }
    },
    {
        name: "Sri Jayachamarajendra (SJP) Government Polytechnic, Bangalore",
        type: "Government",
        lat: 12.9730,
        lng: 77.5947,
        courses: ["Mechanical", "Civil", "Computer Science", "Electronics", "Automobile", "Computer Engineering"],
        website: "https://sjp.ac.in/",
        details: { programs: "One of the oldest polytechnics, offering 3-year diploma courses in a variety of engineering fields.", eligibility: "Admission based on SSLC (Class 10) marks through centralized counseling by DTE, Karnataka.", medium: "English.", facilities: "Large workshops, labs for all departments, library, and a central location in Bengaluru." }
    },
    {
        name: "Government College of Nursing, Bangalore",
        type: "Government",
        lat: 12.9559,
        lng: 77.5701,
        courses: ["B.Sc Nursing", "M.Sc Nursing"],
        website: "http://gcon.karnataka.gov.in/",
        details: { programs: "Offers Bachelor of Science in Nursing (B.Sc Nursing) and Master of Science in Nursing (M.Sc Nursing).", eligibility: "Admission is based on KCET scores for B.Sc Nursing.", medium: "English.", facilities: "Associated with government hospitals for training, modern nursing labs, library, and hostel for girls." }
    },
    {
        name: "Government College of Pharmacy, Bangalore",
        type: "Government",
        lat: 12.9612,
        lng: 77.5904,
        courses: ["Pharmacy (B.Pharm)", "M.Pharm"],
        website: "https://gcpharmacynicecompus.karnataka.gov.in/english",
        details: { programs: "Offers Bachelor of Pharmacy (B.Pharm) and Master of Pharmacy (M.Pharm) degrees.", eligibility: "Admission through the Karnataka Common Entrance Test (KCET). Cut-offs are highly competitive.", medium: "English.", facilities: "Well-equipped pharmaceutical labs, a comprehensive library, a small hostel facility, and internet access." }
    },
    {
        name: "R.C. (Government) College of Commerce & Management, Bengaluru",
        type: "Government",
        lat: 12.9759,
        lng: 77.5926,
        courses: ["B.Com", "BBA / BBM", "M.Com"],
        website: "https://gfgc.kar.nic.in/rcc/",
        details: { programs: "Specializes in commerce and management education, offering B.Com, BBA, and M.Com.", eligibility: "Merit-based admission on Class 12 (PUC) scores through the government's UUCMS portal.", medium: "English and Kannada.", facilities: "Central city location, computer lab, library, auditorium, and active placement cell." }
    },
    {
        name: "Government Arts College (Autonomous), Bengaluru",
        type: "Government",
        lat: 12.9678,
        lng: 77.5873,
        courses: ["B.A. (Bachelor of Arts)", "M.A.", "Economics", "History", "Political Science", "Sociology", "Kannada", "English"],
        website: "https://gacb.edu.in/",
        details: { programs: "Offers a wide array of courses in Bachelor of Arts (B.A.) and Master of Arts (M.A.).", eligibility: "Admission based on merit in the qualifying examination (12th grade for B.A.).", medium: "English and Kannada.", facilities: "Historic campus, large library with rare books, seminar halls, and opportunities for cultural activities." }
    },
    {
        name: "Karnataka Chitrakala Parishath, Bangalore",
        type: "Government-Aided",
        lat: 12.9987,
        lng: 77.5856,
        courses: ["Fine Arts / Commercial Arts Diploma"],
        website: "http://www.karnatakachitrakalaparishath.com/",
        details: { programs: "Renowned institution for fine arts, offering Bachelor of Fine Arts (BFA) and Master of Fine Arts (MFA).", eligibility: "Admission based on an aptitude test conducted by the college.", medium: "English.", facilities: "Art galleries, dedicated studios for painting, sculpture, and printmaking, and a vast library on art history." }
    },
    {
        name: "Institute of Hotel Management (IHM), Bengaluru",
        type: "Government",
        lat: 12.9522,
        lng: 77.5866,
        courses: ["Hotel Management", "B.Sc Hospitality", "Catering"],
        website: "https://ihmbangalore.kar.nic.in/",
        details: { programs: "Offers B.Sc. in Hospitality & Hotel Administration and various diploma courses.", eligibility: "Admission through the NCHM JEE national level entrance exam.", medium: "English.", facilities: "Training kitchens, bakery labs, model restaurants and hotel rooms, and a strong industry connection for placements." }
    },
    {
        name: "ICAI Bangalore Branch of SIRC",
        type: "Statutory Body (Government Recognized)",
        lat: 12.9784,
        lng: 77.6408,
        courses: ["CA (Chartered Accountancy)"],
        website: "https://www.icai.org/",
        details: { programs: "Conducts examinations and provides resources for the Chartered Accountancy professional course.", eligibility: "Register for CA Foundation after Class 10; eligible to appear after Class 12.", medium: "English.", facilities: "Provides library access, coaching classes, seminars, and student support services for aspiring CAs." }
    },
    {
        name: "ICSI Bangalore Chapter",
        type: "Statutory Body (Government Recognized)",
        lat: 12.9529,
        lng: 77.5833,
        courses: ["CS (Company Secretary)"],
        website: "https://www.icsi.edu/bangalore/",
        details: { programs: "The official body for the Company Secretary profession in India. Manages the curriculum and examinations.", eligibility: "CSEET is the entrance level, which can be taken after Class 12.", medium: "English.", facilities: "Offers library services, training programs, workshops, and placement assistance for members." }
    },
    {
        name: "Rashtriya Military School, Bangalore",
        type: "Government",
        lat: 12.9511,
        lng: 77.5963,
        courses: ["Defence Services"],
        website: "http://www.rashtriyamilitaryschools.edu.in/",
        details: { programs: "A feeder institution for the National Defence Academy (NDA). Provides schooling from Class VI to XII.", eligibility: "Admission through an All India Common Entrance Test for Class VI and IX.", medium: "English.", facilities: "Military-style training, extensive sports infrastructure, hostels, and a focus on discipline and leadership." }
    },
    // ===================================
    // NEW BENGALURU COLLEGES ADDED
    // ===================================
    {
        name: "University of Agricultural Sciences, Bangalore (UAS-B)",
        type: "Government",
        lat: 13.0722,
        lng: 77.5770,
        courses: ["B.Sc Agriculture", "Agricultural Engineering", "Horticulture"],
        website: "https://www.uasbangalore.edu.in/",
        details: { programs: "Offers a range of undergraduate and postgraduate courses in agricultural sciences, horticulture, forestry, and agricultural engineering.", eligibility: "Admission primarily through the Karnataka Common Entrance Test (KCET) for undergraduate courses.", medium: "English.", facilities: "Expansive GKVK campus with extensive farmlands for research, specialized labs, a large library, and hostel facilities." }
    },
    {
        name: "Karnataka Veterinary, Animal and Fisheries Sciences University, Hebbal",
        type: "Government",
        lat: 13.0425,
        lng: 77.5938,
        courses: ["Veterinary Science", "Fisheries Science", "Dairy Technology"],
        website: "https://www.kvafsu.edu.in/",
        details: { programs: "Premier institution offering Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc. & A.H.), B.Tech (Dairy Technology), and B.F.Sc. (Fisheries Science).", eligibility: "Admission is through the KCET for most undergraduate courses.", medium: "English.", facilities: "Includes a well-equipped veterinary hospital, dairy plant, labs, and research stations." }
    },
    {
        name: "Government Film and Television Institute, Bangalore",
        type: "Government",
        lat: 13.1362,
        lng: 77.5199,
        courses: ["Cinematography", "Film Editing & Direction", "Sound Recording & Engineering"],
        website: "https://gfti.karnataka.gov.in/english",
        details: { programs: "Offers three-year diploma programs in Cinematography, Film Editing & Direction, and Sound Recording & Engineering.", eligibility: "Admission based on an entrance exam and interview process conducted by the institute.", medium: "English and Kannada.", facilities: "Equipped with film studios, modern cameras, editing suites, and sound recording labs at Hesaraghatta." }
    },
    {
        name: "MES Teachers College, Bengaluru",
        type: "Government-Aided",
        lat: 12.9372,
        lng: 77.5838,
        courses: ["B.Ed (Bachelor of Education)", "Teacher Training"],
        website: "https://mesinstitutions.in/mes-teachers-college/",
        details: { programs: "A well-regarded institution offering the Bachelor of Education (B.Ed.) degree for aspiring teachers.", eligibility: "Admission is based on marks in a bachelor's degree and often through a centralized counseling process.", medium: "English.", facilities: "Focuses on pedagogical training, with classrooms, a library with educational resources, and psychology labs." }
    },
    {
        name: "Karnataka Samskrit University, Bengaluru",
        type: "Government",
        lat: 12.9800,
        lng: 77.5620,
        courses: ["B.A. (Bachelor of Arts)", "M.A.", "Sanskrit", "Yoga", "Philosophy"],
        website: "https://ksu.ac.in/",
        details: { programs: "A specialized university dedicated to the study of Sanskrit, Yoga, Philosophy, and traditional Indian knowledge systems (Shastras).", eligibility: "Varies by program, but generally requires a background in Sanskrit for advanced courses. Open admission for introductory courses.", medium: "Sanskrit and English.", facilities: "Rich library with ancient manuscripts, dedicated departments for different schools of philosophy, and regular scholarly seminars." }
    },
    {
        name: "Government Tool Room & Training Centre (GTTC), Bengaluru",
        type: "Government",
        lat: 12.9345,
        lng: 77.6156,
        courses: ["Tool & Die Making", "Mechatronics", "Mechanical", "Diploma in Mechanical Engineering"],
        website: "https://karunadu.karnataka.gov.in/gttc/english",
        details: { programs: "Offers highly specialized, industry-focused diploma and post-diploma courses in Tool & Die Making and Mechatronics.", eligibility: "Admission is typically based on SSLC (Class 10) marks through a centralized application process.", medium: "English.", facilities: "State-of-the-art workshops with CNC machines, metrology labs, and strong ties with industries for placements and training." }
    }
];