export type Quality = "Excellent" | "Very Good" | "Good" | "Average";

export type Stream =
  | "Science"
  | "Commerce"
  | "Arts & Humanities"
  | "Medical"
  | "Nursing"
  | "Pharmacy"
  | "Education"
  | "Vocational"
  | "Performing Arts"
  | "Physical Education";

export type Category =
  | "Co-ed"
  | "Women"
  | "Evening"
  | "Off-campus"
  | "On-campus"
  | "Medical"
  | "Nursing"
  | "Specialized";

export interface CollegeReview {
  name: string;
  course: string;
  year: string;
  rating: Quality;
  text: string;
}

export interface College {
  slug: string;
  name: string;
  shortDescription: string;
  streams: Stream[];
  categories: Category[];
  popularCourses: string[];
  highlights: string[];
  campusLife: string;
  infrastructure: string;
  placements: { summary: string; rating: Quality };
  admissionInsights: string;
  ratings: {
    academics: Quality;
    campusLife: Quality;
    placements: Quality;
    faculty: Quality;
  };
  quickFacts: { label: string; value: string }[];
  reviews: CollegeReview[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type Seed = {
  name: string;
  streams: Stream[];
  categories: Category[];
  popularCourses: string[];
  flavor?: string;
  established?: string;
  type?: string;
  ratings?: Partial<College["ratings"]>;
  placementsRating?: Quality;
};

function make(seed: Seed): College {
  const {
    name,
    streams,
    categories,
    popularCourses,
    flavor = "a respected Delhi University college known for strong academics, vibrant campus life, and a supportive student community.",
    established = "—",
    type = categories.includes("Off-campus") ? "Off-campus" : "On-campus",
    ratings = {},
    placementsRating = "Very Good",
  } = seed;

  const r: College["ratings"] = {
    academics: "Very Good",
    campusLife: "Very Good",
    placements: placementsRating,
    faculty: "Very Good",
    ...ratings,
  };

  return {
    slug: slugify(name),
    name,
    shortDescription: `${name} is ${flavor}`,
    streams,
    categories,
    popularCourses,
    highlights: [
      `Offers ${popularCourses.length}+ popular UG courses`,
      `Active student societies and fests`,
      `Experienced faculty and mentorship`,
      `Strong DU alumni network`,
    ],
    campusLife: `${name} has an active campus culture with multiple societies covering debating, drama, music, dance, sports, and academics. Annual fests bring students from across DU together, and day-to-day life balances rigorous academics with extracurricular exploration.`,
    infrastructure: `The campus offers well-equipped classrooms, subject-specific labs, a stocked library, common rooms, a canteen, and sports facilities. Wi-Fi coverage and digital learning resources support both coursework and self-study.`,
    placements: {
      summary: `Recruiters from finance, consulting, analytics, EdTech, and startups visit campus annually. Many students also choose higher studies in India and abroad. The placement cell organizes prep sessions, mock interviews, and internships.`,
      rating: r.placements,
    },
    admissionInsights: `Admission is through CUET (UG) followed by CSAS preference filling. Cutoffs vary by course and category every year. Choose this college strategically in your preference order based on your CUET score, course interest, and category. Talk to a senior mentor before locking your preference sheet.`,
    ratings: r,
    quickFacts: [
      { label: "Type", value: type },
      { label: "Established", value: established },
      { label: "Affiliation", value: "University of Delhi" },
      { label: "Mode", value: categories.includes("Evening") ? "Evening" : "Regular" },
    ],
    reviews: [
      {
        name: "Aarav S.",
        course: popularCourses[0] ?? "BA Programme",
        year: "2nd Year",
        rating: "Very Good",
        text: `${name} gave me much more than a degree — the peer group, society life, and faculty support genuinely shaped my first two years.`,
      },
      {
        name: "Ishita R.",
        course: popularCourses[1] ?? popularCourses[0] ?? "BA Programme",
        year: "Final Year",
        rating: "Excellent",
        text: `Honest review — academics are strong if you put in the work, fests are amazing, and seniors really do help juniors navigate DU.`,
      },
      {
        name: "Mohit K.",
        course: popularCourses[0] ?? "BA Programme",
        year: "1st Year",
        rating: "Good",
        text: `Settled in quickly. Campus is welcoming, and the workload is manageable if you stay consistent from day one.`,
      },
    ],
  };
}

const seeds: Seed[] = [
  { name: "Acharya Narendra Dev College", streams: ["Science", "Commerce"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Sc. (H) Computer Science", "B.Sc. (H) Mathematics", "B.Sc. (H) Chemistry", "B.Com (H)"], established: "1991", placementsRating: "Very Good" },
  { name: "Aditi Mahavidyalaya", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["BA Programme", "B.Com", "BA (H) Hindi"], established: "1994" },
  { name: "Ahilya Bai College of Nursing", streams: ["Nursing"], categories: ["Women", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "1991", placementsRating: "Excellent" },
  { name: "Amar Jyoti Institute of Physiotherapy", streams: ["Medical"], categories: ["Co-ed", "Specialized"], popularCourses: ["Bachelor of Physiotherapy (BPT)"], established: "2002", placementsRating: "Very Good" },
  { name: "Aryabhatta College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "2014" },
  { name: "Atma Ram Sanatan Dharma College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science", "B.Sc. (H) Physics"], established: "1959", placementsRating: "Excellent", ratings: { academics: "Excellent" } },
  { name: "Ayurvedic & Unani Tibia College", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["BAMS", "BUMS"], established: "1889" },

  { name: "Bhagini Nivedita College", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["BA Programme", "B.Com", "BA (H) Political Science"], established: "1992" },
  { name: "Bharati College", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) English", "BA (H) Economics"], established: "1971" },
  { name: "Bhaskaracharya College of Applied Sciences", streams: ["Science"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Sc. (H) Computer Science", "B.Sc. (H) Biomedical Science", "B.Sc. (H) Electronics"], established: "1995", placementsRating: "Very Good" },
  { name: "Bhim Rao Ambedkar College", streams: ["Arts & Humanities", "Commerce"], categories: ["Co-ed", "Off-campus"], popularCourses: ["BA (H) Economics", "B.Com (H)", "BA (H) Political Science"], established: "1991" },

  { name: "Chacha Nehru Bal Chikitsalaya", streams: ["Nursing", "Medical"], categories: ["Co-ed", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "1976" },
  { name: "College of Art", streams: ["Performing Arts"], categories: ["Co-ed", "Specialized"], popularCourses: ["BFA Applied Art", "BFA Painting", "BFA Sculpture", "BFA Visual Communication"], established: "1942" },
  { name: "College of Nursing at Army Hospital (R&R)", streams: ["Nursing"], categories: ["Co-ed", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "—", placementsRating: "Excellent" },
  { name: "College of Vocational Studies", streams: ["Commerce", "Vocational", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.A. (Vocational Studies)"], established: "1972" },

  { name: "Daulat Ram College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Zoology", "B.Sc. (H) Chemistry"], established: "1960", ratings: { academics: "Excellent" } },
  { name: "Deen Dayal Upadhyaya College", streams: ["Science", "Commerce"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Sc. (H) Computer Science", "B.Com (H)", "B.Sc. (H) Mathematics"], established: "1990", placementsRating: "Very Good" },
  { name: "Delhi College of Arts & Commerce", streams: ["Arts & Humanities", "Commerce"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Journalism", "BA (H) Economics"], established: "1987" },
  { name: "Delhi Institute of Pharmaceutical Sciences and Research", streams: ["Pharmacy"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.Pharm", "M.Pharm"], established: "1964", placementsRating: "Excellent" },
  { name: "Deshbandhu College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1952" },
  { name: "Durga Bai Deshmukh College of Special Education", streams: ["Education"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.Ed. Special Education"], established: "—" },
  { name: "Dyal Singh College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1959" },
  { name: "Dyal Singh College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) English"], established: "1972" },

  { name: "Florence Nightingale College of Nursing", streams: ["Nursing"], categories: ["Co-ed", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "—" },

  { name: "Gargi College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "BA (H) Psychology", "B.Sc. (H) Chemistry"], established: "1967", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent" } },

  { name: "Hans Raj College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Physics", "B.Sc. (H) Computer Science"], established: "1948", placementsRating: "Excellent", ratings: { academics: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Hindu College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["BA (H) Economics", "BA (H) English", "B.Sc. (H) Physics", "B.Com (H)"], established: "1899", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Holy Family College of Nursing", streams: ["Nursing"], categories: ["Co-ed", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "—" },

  { name: "Indira Gandhi Institute of Physical Education and Sports Sciences", streams: ["Physical Education"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.P.Ed.", "B.Sc. (H) Sports Science"], established: "1987" },
  { name: "Indraprastha College for Women", streams: ["Arts & Humanities", "Commerce", "Science"], categories: ["Women", "On-campus"], popularCourses: ["BA (H) Journalism", "BA (H) English", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1924", ratings: { academics: "Excellent" } },
  { name: "Institute of Home Economics", streams: ["Science", "Arts & Humanities"], categories: ["Women", "Off-campus", "Specialized"], popularCourses: ["B.Sc. (H) Home Science", "B.Sc. (H) Food Technology", "BA (H) Journalism"], established: "1961", placementsRating: "Very Good" },

  { name: "Janki Devi Memorial College", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["BA (H) Economics", "B.Com (H)", "BA (H) English"], established: "1959" },
  { name: "Jesus and Mary College", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "On-campus"], popularCourses: ["BA (H) Economics", "BA (H) Psychology", "B.Com (H)", "BA (H) English"], established: "1968", placementsRating: "Excellent", ratings: { academics: "Excellent" } },

  { name: "Kalindi College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) English", "B.Sc. (H) Mathematics"], established: "1967" },
  { name: "Kamla Nehru College", streams: ["Arts & Humanities", "Commerce", "Science"], categories: ["Women", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "BA (H) Psychology"], established: "1964" },
  { name: "Keshav Mahavidyalaya", streams: ["Science", "Commerce"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Sc. (H) Computer Science", "B.Com (H)", "B.Sc. (H) Mathematics"], established: "1995" },
  { name: "Kirori Mal College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["BA (H) Economics", "B.Com (H)", "B.Sc. (H) Physics", "BA (H) English"], established: "1954", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent" } },

  { name: "Lady Hardinge Medical College", streams: ["Medical"], categories: ["Women", "Medical", "Specialized"], popularCourses: ["MBBS"], established: "1916", placementsRating: "Excellent", ratings: { academics: "Excellent", faculty: "Excellent" } },
  { name: "Lady Irwin College", streams: ["Science", "Arts & Humanities"], categories: ["Women", "On-campus", "Specialized"], popularCourses: ["B.Sc. (H) Home Science", "B.Sc. (H) Food Technology"], established: "1932" },
  { name: "Lady Shri Ram College for Women", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["BA (H) Economics", "BA (H) Psychology", "BA (H) English", "B.Com (H)"], established: "1956", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Lakshmi Bai College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1965" },

  { name: "Maharaja Agrasen College", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1994" },
  { name: "Maharshi Valmiki College of Education", streams: ["Education"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.El.Ed.", "B.Ed."], established: "2002" },
  { name: "Maitreyi College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Chemistry"], established: "1967", placementsRating: "Very Good" },
  { name: "Mata Sundri College for Women", streams: ["Arts & Humanities", "Commerce", "Science"], categories: ["Women", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1967" },
  { name: "Maulana Azad Institute of Dental Sciences", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["BDS"], established: "2001", placementsRating: "Excellent" },
  { name: "Maulana Azad Medical College", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["MBBS"], established: "1958", placementsRating: "Excellent", ratings: { academics: "Excellent", faculty: "Excellent" } },
  { name: "Miranda House", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "On-campus"], popularCourses: ["BA (H) Economics", "BA (H) English", "B.Sc. (H) Physics", "B.Sc. (H) Chemistry"], established: "1948", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Moti Lal Nehru College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1964" },
  { name: "Moti Lal Nehru College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1965" },

  { name: "University College of Medical Sciences", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["MBBS"], established: "1971", placementsRating: "Excellent", ratings: { academics: "Excellent", faculty: "Excellent" } },

  { name: "Nehru Homoeopathic Medical College and Hospital", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["BHMS"], established: "1965" },
  { name: "Netaji Subhash Institute of Technology", streams: ["Science"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.Tech CSE", "B.Tech ECE", "B.Tech IT"], established: "1983", placementsRating: "Excellent", ratings: { academics: "Excellent", placements: "Excellent" } },

  { name: "PGDAV College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1957", placementsRating: "Very Good" },
  { name: "PGDAV College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1958" },
  { name: "Pt. Deendayal Upadhyaya Institute for the Physically Handicapped", streams: ["Education", "Vocational"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.Ed. Special Education"], established: "1976" },

  { name: "Rajdhani College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "B.Sc. (H) Computer Science", "BA (H) Economics"], established: "1964" },
  { name: "Rajkumari Amrit Kaur College of Nursing", streams: ["Nursing"], categories: ["Women", "Nursing", "Specialized"], popularCourses: ["B.Sc. Nursing"], established: "1946", placementsRating: "Excellent" },
  { name: "Ram Lal Anand College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "B.Sc. (H) Computer Science", "BA (H) Economics"], established: "1964" },
  { name: "Ramanujan College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "B.Sc. (H) Statistics", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "2010", placementsRating: "Very Good" },
  { name: "Ramjas College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["BA (H) Economics", "B.Com (H)", "B.Sc. (H) Physics", "BA (H) History"], established: "1917", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent" } },

  { name: "Satyawati College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1972" },
  { name: "Satyawati College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1973" },
  { name: "School of Open Learning", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Specialized"], popularCourses: ["B.Com", "BA Programme", "BA (H) English"], established: "1962" },
  { name: "School of Rehabilitation Sciences", streams: ["Medical", "Education"], categories: ["Co-ed", "Specialized"], popularCourses: ["BPT", "B.Sc. Occupational Therapy", "B.Sc. Audiology"], established: "—" },
  { name: "Shaheed Bhagat Singh College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1967", placementsRating: "Very Good" },
  { name: "Shaheed Bhagat Singh College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1968" },
  { name: "Shaheed Rajguru College of Applied Sciences for Women", streams: ["Science"], categories: ["Women", "Off-campus", "Specialized"], popularCourses: ["B.Sc. (H) Computer Science", "B.Sc. (H) Biomedical Science", "B.Sc. (H) Microbiology", "B.Sc. (H) Food Technology"], established: "1989", placementsRating: "Very Good" },
  { name: "Shaheed Sukhdev College of Business Studies", streams: ["Commerce"], categories: ["Co-ed", "Off-campus", "Specialized"], popularCourses: ["BMS", "BBA (FIA)", "B.Sc. (H) Computer Science"], established: "1987", placementsRating: "Excellent", ratings: { academics: "Excellent", placements: "Excellent" } },
  { name: "Shivaji College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1961" },
  { name: "Shri Ram College of Commerce", streams: ["Commerce"], categories: ["Co-ed", "On-campus", "Specialized"], popularCourses: ["B.Com (H)", "BA (H) Economics"], established: "1926", placementsRating: "Excellent", ratings: { academics: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Shyam Lal College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1964" },
  { name: "Shyam Lal College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1965" },
  { name: "Shyama Prasad Mukherji College for Women", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1969" },
  { name: "Sri Aurobindo College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1972" },
  { name: "Sri Aurobindo College Evening", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "Off-campus"], popularCourses: ["B.Com (H)", "BA Programme"], established: "1973" },
  { name: "Sri Guru Gobind Singh College of Commerce", streams: ["Commerce"], categories: ["Co-ed", "Off-campus", "Specialized"], popularCourses: ["B.Com (H)", "BA (H) Economics"], established: "1984", placementsRating: "Very Good" },
  { name: "Sri Guru Nanak Dev Khalsa College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Mathematics"], established: "1973" },
  { name: "Sri Guru Tegh Bahadur Khalsa College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Physics", "B.Sc. (H) Computer Science"], established: "1951", placementsRating: "Very Good" },
  { name: "Sri Venkateswara College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Physics", "B.Sc. (H) Biochemistry"], established: "1961", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent" } },
  { name: "St. Stephen's College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["BA (H) Economics", "BA (H) English", "B.Sc. (H) Physics", "BA (H) History"], established: "1881", placementsRating: "Excellent", ratings: { academics: "Excellent", campusLife: "Excellent", placements: "Excellent", faculty: "Excellent" } },
  { name: "Swami Shraddhanand College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1967" },

  { name: "Vallabhbhai Patel Chest Institute", streams: ["Medical"], categories: ["Co-ed", "Medical", "Specialized"], popularCourses: ["MD Pulmonary Medicine (PG)"], established: "1949" },
  { name: "Vivekananda College", streams: ["Arts & Humanities", "Commerce"], categories: ["Women", "Off-campus"], popularCourses: ["B.Com (H)", "BA (H) English", "BA (H) Economics"], established: "1970" },

  { name: "Zakir Husain Delhi College", streams: ["Science", "Commerce", "Arts & Humanities"], categories: ["Co-ed", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) Economics", "B.Sc. (H) Computer Science"], established: "1692" },
  { name: "Zakir Husain Post Graduate Evening College", streams: ["Commerce", "Arts & Humanities"], categories: ["Co-ed", "Evening", "On-campus"], popularCourses: ["B.Com (H)", "BA (H) English"], established: "1989" },
];

export const colleges: College[] = seeds.map(make);

export function getCollegeBySlug(slug: string): College | undefined {
  return colleges.find((c) => c.slug === slug);
}

export const allStreams: Stream[] = [
  "Science",
  "Commerce",
  "Arts & Humanities",
  "Medical",
  "Nursing",
  "Pharmacy",
  "Education",
  "Vocational",
  "Performing Arts",
  "Physical Education",
];

export const allCategories: Category[] = [
  "Co-ed",
  "Women",
  "Evening",
  "On-campus",
  "Off-campus",
  "Medical",
  "Nursing",
  "Specialized",
];
