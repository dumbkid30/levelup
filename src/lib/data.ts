export const services = [
  {
    title: "Study Abroad",
    description:
      "Launch your international career with expert guidance for top university admissions and comprehensive support.",
    gradient: "from-green-500 to-emerald-600",
    icon: "SA",
    features: ["Top Universities", "Visa Support", "Scholarship Guidance"],
    delay: 0.1,
  },
  {
    title: "Career Launchpad",
    description:
      "Accelerate your professional growth with industry experts and personalized development programs.",
    gradient: "from-blue-500 to-cyan-600",
    icon: "CL",
    features: ["Industry Mentors", "Skill Development", "Job Placement"],
    delay: 0.2,
  },
  {
    title: "Professional Courses",
    description:
      "Master in-demand skills with our comprehensive training programs designed by industry experts.",
    gradient: "from-yellow-500 to-orange-500",
    icon: "PC",
    features: ["Certified Programs", "Hands-on Training", "Industry Projects"],
    delay: 0.3,
  },
  {
    title: "Healthcare Jobs",
    description:
      "Explore international healthcare opportunities with specialized training and placement support.",
    gradient: "from-pink-500 to-rose-600",
    icon: "HJ",
    features: ["Global Opportunities", "License Support", "Career Path"],
    delay: 0.4,
  },
];

export const serviceOptions = [
  "Backend Development",
  "Frontend Development",
  "Art of Building AI Products",
  "Data Science",
  "Machine Learning",
  "Product Management",
  "Study Abroad Consultation",
];

export const courses = [
  {
    title: "React Beginner",
    description:
      "Learn the fundamentals of React, including components, props, state, and building your first UI.",
    level: "Beginner",
    duration: "4 Weeks",
    image: "/nature-3481_256.gif",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    title: "HTML Beginner",
    description:
      "Understand the basics of web structure using HTML tags, elements, and semantic layouts.",
    level: "Beginner",
    duration: "2 Weeks",
    image: "/rain-3582_256.gif",
    tags: ["HTML", "Web Structure", "Frontend"],
  },
  {
    title: "CSS Beginner",
    description:
      "Master styling essentials like selectors, colors, layout, flexbox, and responsive design.",
    level: "Beginner",
    duration: "3 Weeks",
    image: "/nature-3481_256.gif",
    tags: ["CSS", "Styling", "Frontend"],
  },
  {
    title: "React Advance",
    description:
      "Master advanced React concepts, patterns, and real-world architecture. Build high-performance, scalable apps.",
    level: "Advance",
    duration: "6 Weeks",
    image: "/rain-3582_256.gif",
    tags: ["React", "Advanced", "Architecture"],
  },
];

export const coursesBackend = [
  {
    title: "JavaScript for Backend",
    description:
      "Build powerful server-side applications with Node.js, Express, and modern JavaScript patterns.",
    level: "Intermediate",
    duration: "8 Weeks",
    image: "/nature-3481_256.gif",
    tags: ["Node.js", "Express", "Backend"],
  },
  {
    title: "TypeScript for Backend",
    description:
      "Master type-safe backend development with TypeScript, building robust and scalable APIs.",
    level: "Intermediate",
    duration: "6 Weeks",
    image: "/rain-3582_256.gif",
    tags: ["TypeScript", "Backend", "API"],
  },
  {
    title: "Build Auth with Golang",
    description:
      "Create secure authentication systems using Go, JWT, and modern security best practices.",
    level: "Advanced",
    duration: "5 Weeks",
    image: "/nature-3481_256.gif",
    tags: ["Golang", "Auth", "Security"],
  },
  {
    title: "SQL for Web and Data Engineering",
    description:
      "Master database design, queries, and optimization for web applications and data pipelines.",
    level: "Beginner to Advanced",
    duration: "7 Weeks",
    image: "/rain-3582_256.gif",
    tags: ["SQL", "Database", "Data Engineering"],
  },
  {
    title: "Become an Expert in Git & GitHub in 4 Hours",
    description:
      "Master version control, branching, merging, and collaboration with a hands-on GitBash terminal experience.",
    level: "Beginner to Intermediate",
    duration: "4 Hours",
    image: "/nature-3481_256.gif",
    tags: ["Git", "GitHub", "DevOps"],
  },
];

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experienceLevel: "Fresher/Internship" | "Experienced";
  category: "Product Management" | "Software Engineering" | "Design" | "Marketing" | "Data Science";
  salary: string;
  postedAt: string;
  postedAtMs?: number;
  freshnessMinutes?: number;
  source?: string;
  logo: string;
  skills: string[];
  url: string;
}

// Base mock jobs; postedAt values will be refreshed at runtime in the API.
export const jobs: Job[] = [
  {
    id: "1",
    title: "Junior Frontend Engineer",
    company: "PixelPerfect",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Fresher/Internship",
    category: "Software Engineering",
    salary: "$40k - $60k",
    postedAt: "",
    freshnessMinutes: 8,
    source: "Mock",
    logo: "[PP]",
    skills: ["React", "TypeScript", "Tailwind"],
    url: "#",
  },
  {
    id: "2",
    title: "Associate Product Manager",
    company: "TechNova",
    location: "New York, NY",
    type: "Full-time",
    experienceLevel: "Fresher/Internship",
    category: "Product Management",
    salary: "$70k - $90k",
    postedAt: "",
    freshnessMinutes: 15,
    source: "Mock",
    logo: "[TN]",
    skills: ["Agile", "Jira", "User Research"],
    url: "#",
  },
  {
    id: "3",
    title: "Senior Backend Engineer",
    company: "DataFlow",
    location: "San Francisco, CA",
    type: "Full-time",
    experienceLevel: "Experienced",
    category: "Software Engineering",
    salary: "$120k - $160k",
    postedAt: "",
    freshnessMinutes: 28,
    source: "Mock",
    logo: "[DF]",
    skills: ["Node.js", "Go", "PostgreSQL"],
    url: "#",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "CreativeStudio",
    location: "London, UK",
    type: "Contract",
    experienceLevel: "Experienced",
    category: "Design",
    salary: "$80k - $100k",
    postedAt: "",
    freshnessMinutes: 36,
    source: "Mock",
    logo: "[CS]",
    skills: ["Figma", "Prototyping", "Design Systems"],
    url: "#",
  },
  {
    id: "5",
    title: "Marketing Intern",
    company: "GrowthHacker",
    location: "Remote",
    type: "Internship",
    experienceLevel: "Fresher/Internship",
    category: "Marketing",
    salary: "$20/hr",
    postedAt: "",
    freshnessMinutes: 48,
    source: "Mock",
    logo: "[GH]",
    skills: ["SEO", "Content Writing", "Social Media"],
    url: "#",
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Austin, TX",
    type: "Full-time",
    experienceLevel: "Experienced",
    category: "Data Science",
    salary: "$110k - $140k",
    postedAt: "",
    freshnessMinutes: 63,
    source: "Mock",
    logo: "[AIS]",
    skills: ["Python", "Machine Learning", "SQL"],
    url: "#",
  },
  {
    id: "7",
    title: "Software Engineer Intern",
    company: "StartUp Inc",
    location: "Remote",
    type: "Internship",
    experienceLevel: "Fresher/Internship",
    category: "Software Engineering",
    salary: "$30/hr",
    postedAt: "",
    freshnessMinutes: 78,
    source: "Mock",
    logo: "[SUI]",
    skills: ["JavaScript", "React", "Git"],
    url: "#",
  },
  {
    id: "8",
    title: "Product Designer",
    company: "UserFirst",
    location: "Berlin, DE",
    type: "Full-time",
    experienceLevel: "Experienced",
    category: "Design",
    salary: "$60k - $80k",
    postedAt: "",
    freshnessMinutes: 105,
    source: "Mock",
    logo: "[UF]",
    skills: ["UI Design", "UX Research", "Wireframing"],
    url: "#",
  },
];
