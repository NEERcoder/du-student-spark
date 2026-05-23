export type Review = {
  name: string;
  college: string;
  course?: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "Aarav",
    college: "Hindu College",
    course: "Economics Hons",
    rating: 4.7,
    text: "Hindu is honestly something else. The lawns, the canteen chatter, the random debates that happen between lectures — you genuinely learn more outside class than inside sometimes. Faculty is mostly solid, a couple are legendary. Attendance pressure exists but nobody really dies because of it.",
  },
  {
    name: "Ishita",
    college: "SRCC",
    course: "BCom Hons",
    rating: 4.9,
    text: "If you're chasing finance/consulting, SRCC opens doors no other DU college can. Placements are insane but the pressure is real — you have to hustle from day 1. Societies are top tier. Only complaint: campus is small and gets crowded during fests.",
  },
  {
    name: "Rohan",
    college: "Hansraj College",
    course: "Physics Hons",
    rating: 4.6,
    text: "Came here for physics and stayed for the people. Labs are decent, not the best, but profs actually care if you show interest. Mess food is mid. Metro is right next door which is a lifesaver.",
  },
  {
    name: "Sanya",
    college: "Miranda House",
    course: "Political Science",
    rating: 4.8,
    text: "Miranda gave me a voice. Genuinely. The discussions in class, the society culture, Tempest — everything pushes you to think bigger. Hostel waitlist is brutal though, plan accordingly.",
  },
  {
    name: "Kunal",
    college: "Kirori Mal College",
    course: "English Hons",
    rating: 4.3,
    text: "KMC has this raw, unfiltered DU vibe. The Players (theatre soc) alone is worth being here. Some faculty are amazing, some just read PPTs. Canteen is iconic — Nescafe at KMC hits different at 4pm.",
  },
  {
    name: "Megha",
    college: "Ramjas College",
    rating: 4.2,
    text: "Ramjas is chill but politics gets heated sometimes, especially around elections. Academically solid for humanities. Fest is fun. Infra could be better tbh, some classrooms feel ancient.",
  },
  {
    name: "Devansh",
    college: "Sri Venkateswara College",
    course: "BCom",
    rating: 4.4,
    text: "Venky is underrated. South campus crowd, decent placements for commerce, and Nexus fest is legit one of the best. Profs are hit or miss. Society culture is strong if you put yourself out there.",
  },
  {
    name: "Priya",
    college: "Dyal Singh College",
    course: "Journalism",
    rating: 4.0,
    text: "Honestly mixed feelings. Course content is okay, faculty mostly supportive. Crowd is diverse which I liked. But the campus is nothing fancy and internships you'll have to chase entirely on your own.",
  },
  {
    name: "Aditya",
    college: "ARSD College",
    course: "Computer Science",
    rating: 4.5,
    text: "ARSD's CS dept has quietly become really good. Coding culture is picking up, decent placements last year. South campus location + metro = no commute pain. Library could be bigger.",
  },
  {
    name: "Tanya",
    college: "Daulat Ram College",
    course: "Psychology",
    rating: 4.1,
    text: "DRC is calm, mostly girls who actually want to study. Psychology department is great, the prof discussions are something I'll miss. Canteen samosas are unreasonably good. Hostel is decent.",
  },
  {
    name: "Riya",
    college: "Gargi College",
    course: "Sociology",
    rating: 4.6,
    text: "Reverie >>>. Gargi has this energy you can't fake. Faculty in sociology is sharp and they push you to read beyond the syllabus. Crowd outside the gate during fest week is wild though.",
  },
  {
    name: "Mohit",
    college: "Zakir Husain Delhi College",
    course: "History",
    rating: 4.0,
    text: "Old building, old soul. Heritage campus genuinely feels different. Some faculty are gems, attendance is strict though. Not the flashiest college but you get a real DU experience here.",
  },
  {
    name: "Nikita",
    college: "CVS (College of Vocational Studies)",
    course: "BMS",
    rating: 4.2,
    text: "CVS is solid for management courses, placements have improved a lot. South campus area is convenient. Crowd is friendly. Only thing — exposure depends a lot on which society you join, so pick wisely.",
  },
  {
    name: "Harsh",
    college: "Motilal Nehru College",
    course: "B.A. Programme",
    rating: 4.3,
    text: "MLNC is way better than people think. Decent profs, active societies, and the morning/evening shift thing actually works in your favour if you intern on the side. Metro is close, that helps a lot.",
  },
  {
    name: "Sneha",
    college: "Deshbandhu College",
    course: "Botany",
    rating: 5.0,
    text: "Honestly fell in love with DBC. Quiet campus, supportive faculty, and the botany lab is genuinely well equipped. Not the most hyped college but if you want to actually study without 24/7 chaos, it's perfect.",
  },
];
