export type Review = {
  name: string;
  college: string;
  course?: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
 {
name: "Aditya Sharma",
college: "Atma Ram Sanatan Dharma College",
course: "BCom Hons",
rating: 4.7,
text: "ARSD has one of the best infrastructures in DU. The campus feels modern and societies are active throughout the year."
},
{
name: "Neha Verma",
college: "Bhaskaracharya College of Applied Sciences",
course: "BSc Food Technology",
rating: 4.5,
text: "Food Technology at BCAS offers strong practical exposure. Industry visits and lab sessions were the highlight of my experience."
},
{
name: "Rahul Gupta",
college: "Deen Dayal Upadhyaya College",
course: "BSc Computer Science",
rating: 4.8,
text: "DDUC has a strong coding culture and supportive faculty. Many students actively participate in hackathons and internships."
},
{
name: "Ananya Singh",
college: "Gargi College",
course: "BA Psychology",
rating: 4.6,
text: "The psychology department is excellent. Faculty members encourage discussions and practical learning."
},
{
name: "Karan Malhotra",
college: "Hansraj College",
course: "BSc Physics",
rating: 4.8,
text: "Hansraj offers a great balance between academics and extracurricular activities. The library is one of the best resources on campus."
},
{
name: "Mehak Kapoor",
college: "Hindu College",
course: "BA Economics Hons",
rating: 4.9,
text: "The academic environment is highly competitive but motivating. Students are exposed to opportunities beyond the classroom."
},
{
name: "Raghav Arora",
college: "Kirori Mal College",
course: "BA English Hons",
rating: 4.4,
text: "KMC has a vibrant theatre and society culture. The student crowd is energetic and welcoming."
},
{
name: "Priya Menon",
college: "Lady Shri Ram College",
course: "BA Sociology",
rating: 4.9,
text: "LSR challenges you intellectually and personally. Society culture and networking opportunities are unmatched."
},
{
name: "Harsh Jain",
college: "Miranda House",
course: "BSc Chemistry",
rating: 4.8,
text: "Faculty members are supportive and laboratories are well maintained. The campus atmosphere is inspiring."
},
{
name: "Sakshi Yadav",
college: "Ramjas College",
course: "BA Political Science",
rating: 4.3,
text: "Ramjas has a strong society culture and a diverse student crowd. The college experience feels authentic."
},
{
name: "Arjun Nair",
college: "Sri Venkateswara College",
course: "BCom Hons",
rating: 4.5,
text: "Venky is underrated. The placement support is improving and the campus environment is friendly."
},
{
name: "Tanya Bhatia",
college: "Shaheed Bhagat Singh College",
course: "BCom Hons",
rating: 4.4,
text: "Commerce students get good exposure through seminars and placement activities. Faculty is approachable."
},
{
name: "Vanshika Sharma",
college: "Shaheed Sukhdev College of Business Studies",
course: "BMS",
rating: 4.9,
text: "CBS is one of the best places in DU for management students. The peer group is highly ambitious."
},
{
name: "Mohit Bansal",
college: "Shri Ram College of Commerce",
course: "BCom Hons",
rating: 4.9,
text: "SRCC provides excellent networking opportunities and a strong alumni base. Placement season is intense but rewarding."
},
{
name: "Ayesha Khan",
college: "St. Stephen's College",
course: "BA English Hons",
rating: 4.8,
text: "The tutorial system encourages deeper learning. The campus has a unique academic culture."
},
{
name: "Dev Chaudhary",
college: "College of Vocational Studies",
course: "BMS",
rating: 4.4,
text: "CVS is becoming increasingly popular for management studies. Placement support has improved significantly."
},
{
name: "Ishita Gupta",
college: "Deshbandhu College",
course: "BSc Zoology",
rating: 4.3,
text: "Faculty members are supportive and laboratory facilities are good. The campus feels peaceful."
},
{
name: "Lakshya Mehta",
college: "Dyal Singh College",
course: "BA Journalism",
rating: 4.2,
text: "The central location helps with internships and networking. Guest lectures are useful."
},
{
name: "Muskan Arora",
college: "Jesus and Mary College",
course: "BA Psychology",
rating: 4.7,
text: "JMC offers a respectful and academically focused environment. Faculty support is excellent."
},
{
name: "Simran Kaur",
college: "Kamla Nehru College",
course: "BA Political Science",
rating: 4.4,
text: "Political science discussions are engaging and society participation is encouraged."
},
{
name: "Nitin Kumar",
college: "Maitreyi College",
course: "BSc Mathematics",
rating: 4.2,
text: "The teachers are approachable and students receive good academic guidance."
},
{
name: "Khushi Aggarwal",
college: "Daulat Ram College",
course: "BA History",
rating: 4.3,
text: "DRC provides a supportive atmosphere and active cultural societies."
},
{
name: "Yash Gupta",
college: "Delhi College of Arts and Commerce",
course: "BCom Hons",
rating: 4.4,
text: "The commerce department offers good career guidance and internship awareness."
},
{
name: "Ritika Jain",
college: "Indraprastha College for Women",
course: "BA English Hons",
rating: 4.7,
text: "The heritage and academic culture make IPCW a memorable place to study."
},
{
name: "Siddharth Joshi",
college: "Keshav Mahavidyalaya",
course: "BSc Computer Science",
rating: 4.3,
text: "The computer science department is growing rapidly and students are encouraged to participate in competitions."
},
{
name: "Palak Gupta",
college: "Lakshmibai College",
course: "BA Programme",
rating: 4.1,
text: "The campus is welcoming and teachers are supportive of student initiatives."
},
{
name: "Rohit Chauhan",
college: "Maharaja Agrasen College",
course: "BCom",
rating: 4.2,
text: "The college offers a balanced experience with academics, events and extracurricular opportunities."
},
{
name: "Tanvi Khanna",
college: "Mata Sundri College for Women",
course: "BA Economics",
rating: 4.3,
text: "Small campus but strong faculty support. Students receive individual attention."
},
{
name: "Parth Anand",
college: "Motilal Nehru College",
course: "BSc Computer Science",
rating: 4.4,
text: "The coding community is active and students regularly collaborate on projects."
},
{
name: "Bhavya Sirohi",
college: "PGDAV College",
course: "BCom Hons",
rating: 4.4,
text: "PGDAV has a dedicated student community and good opportunities for commerce students."
},
{
name: "Mayank Tomar",
college: "Rajdhani College",
course: "BA Programme",
rating: 4.2,
text: "The college has improved significantly in recent years with active societies and events."
},
{
name: "Jiya Sondhi",
college: "Ram Lal Anand College",
course: "BCom Hons",
rating: 4.4,
text: "The infrastructure is modern and faculty members are approachable."
},
{
name: "Aniket Joshi",
college: "Ramanujan College",
course: "BCom Programme",
rating: 4.6,
text: "Ramanujan is known for innovation and online learning initiatives. Students benefit from skill development programs."
},
{
name: "Pooja Rathore",
college: "Satyawati College",
course: "BA History",
rating: 4.1,
text: "The student community is friendly and faculty members are supportive."
},
{
name: "Rachit Bhalla",
college: "Shivaji College",
course: "BCom",
rating: 4.3,
text: "Shivaji offers a balanced college experience and active extracurricular participation."
},
{
name: "Bhumika Chopra",
college: "Sri Aurobindo College",
course: "BA Programme",
rating: 4.1,
text: "The college has a relaxed environment and decent opportunities for growth."
},
{
name: "Ridhi Tandon",
college: "Sri Guru Gobind Singh College of Commerce",
course: "BCom Hons",
rating: 4.6,
text: "The commerce ecosystem is strong and placement support is well organized."
},
{
name: "Kritika Dsouza",
college: "Sri Guru Nanak Dev Khalsa College",
course: "BA Economics",
rating: 4.4,
text: "The economics department is active and regularly hosts academic events."
},
{
name: "Naina Fernandes",
college: "Sri Guru Tegh Bahadur Khalsa College",
course: "BSc Electronics",
rating: 4.5,
text: "Strong academics and a welcoming campus environment make this college stand out."
},
{
name: "Faizan Ahmed",
college: "Swami Shraddhanand College",
course: "BA Programme",
rating: 4.0,
text: "Students get ample opportunities to participate in societies and campus events."
},
{
name: "Saba Qureshi",
college: "Vivekananda College",
course: "BA Psychology",
rating: 4.3,
text: "The psychology department is supportive and encourages practical learning."
},
{
name: "Avani Kashyap",
college: "Zakir Husain Delhi College",
course: "BA Urdu",
rating: 4.3,
text: "The heritage campus and language departments offer a unique academic experience."
},
{
name: "Gurleen Kaur",
college: "Bhagini Nivedita College",
course: "BA Programme",
rating: 4.1,
text: "A supportive environment with dedicated faculty and active student participation."
},
{
name: "Harnoor Sandhu",
college: "Bharati College",
course: "BA English Hons",
rating: 4.3,
text: "The literature societies are active and students receive good academic support."
},
{
name: "Aastha Bedi",
college: "Aditi Mahavidyalaya",
course: "BCom",
rating: 4.0,
text: "Teachers are supportive and the college provides a comfortable learning environment."
},
{
name: "Vihaan Bansal",
college: "Aryabhatta College",
course: "BA Economics Hons",
rating: 4.4,
text: "Economics faculty is knowledgeable and guest lectures add significant value."
},
{
name: "Aarohi Mittal",
college: "Kalindi College",
course: "BA Hindi Hons",
rating: 4.2,
text: "The Hindi department is passionate and creates a strong academic culture."
},
{
name: "Reyansh Mathew",
college: "Janki Devi Memorial College",
course: "BCom Hons",
rating: 4.3,
text: "Students benefit from a friendly environment and regular extracurricular events."
},
{
name: "Anaisha Thomas",
college: "Lady Irwin College",
course: "BSc Home Science",
rating: 4.7,
text: "Home Science programs are among the best in the country with excellent practical exposure."
},
{
name: "Karan Sehgal",
college: "Maharshi Valmiki College of Education",
course: "B.Ed",
rating: 4.1,
text: "The teacher training programs are well structured and professionally useful."
}

];
