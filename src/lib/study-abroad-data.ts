export interface Scholarship {
    id: string;
    title: string;
    provider: string;
    country: string;
    degree: "Bachelor" | "Master" | "PhD" | "Research" | "All";
    amount: string;
    deadline: string;
    tags: string[];
    flag: string;
    url: string;
}

export interface University {
    id: string;
    name: string;
    location: string;
    ranking: string;
    country: string;
    flag: string;
    features: string[];
    website: string;
}

export const scholarships: Scholarship[] = [
    {
        id: "1",
        title: "Chinese Government Scholarship (CSC) - Type A",
        provider: "China Scholarship Council",
        country: "China",
        degree: "All",
        amount: "Fully Funded (Tuition + Stipend + Housing)",
        deadline: "Early 2026",
        tags: ["Government", "Prestigious", "STEM"],
        flag: "🇨🇳",
        url: "https://www.campuschina.org/",
    },
    {
        id: "2",
        title: "Chevening Scholarship",
        provider: "UK Government",
        country: "UK",
        degree: "Master",
        amount: "Fully Funded",
        deadline: "November 2025",
        tags: ["Leadership", "Networking", "Global"],
        flag: "🇬🇧",
        url: "https://www.chevening.org/",
    },
    {
        id: "3",
        title: "Fulbright Foreign Student Program",
        provider: "USA Government",
        country: "USA",
        degree: "Master",
        amount: "Fully Funded",
        deadline: "Varies by Country",
        tags: ["Cultural Exchange", "Research"],
        flag: "🇺🇸",
        url: "https://foreign.fulbrightonline.org/",
    },
    {
        id: "4",
        title: "DAAD Scholarship",
        provider: "German Academic Exchange Service",
        country: "Germany",
        degree: "Master",
        amount: "Monthly Stipend + Insurance",
        deadline: "Oct - Dec 2025",
        tags: ["Research", "Engineering"],
        flag: "🇩🇪",
        url: "https://www.daad.de/en/",
    },
    {
        id: "5",
        title: "Belt and Road Scholarship",
        provider: "Various Chinese Universities",
        country: "China",
        degree: "Bachelor",
        amount: "Tuition Waiver + Stipend",
        deadline: "May 2026",
        tags: ["Undergrad", "Cultural"],
        flag: "🇨🇳",
        url: "https://www.campuschina.org/",
    },
    {
        id: "6",
        title: "Australia Awards",
        provider: "Australian Government",
        country: "Australia",
        degree: "Master",
        amount: "Fully Funded",
        deadline: "April 2026",
        tags: ["Indo-Pacific", "Development"],
        flag: "🇦🇺",
        url: "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships",
    },
];

export const universities: University[] = [
    {
        id: "u1",
        name: "Tsinghua University",
        location: "Beijing, China",
        ranking: "#12 Global (QS)",
        country: "China",
        flag: "🇨🇳",
        features: ["Top Engineering", "Global Campus", "Research"],
        website: "https://www.tsinghua.edu.cn/en/",
    },
    {
        id: "u2",
        name: "University of Oxford",
        location: "Oxford, UK",
        ranking: "#3 Global (QS)",
        country: "UK",
        flag: "🇬🇧",
        features: ["Historic", "Collegiate System", "Humanities"],
        website: "https://www.ox.ac.uk/",
    },
    {
        id: "u3",
        name: "Peking University",
        location: "Beijing, China",
        ranking: "#17 Global (QS)",
        country: "China",
        flag: "🇨🇳",
        features: ["Humanities", "Science", "Beautiful Campus"],
        website: "https://english.pku.edu.cn/",
    },
    {
        id: "u4",
        name: "Massachusetts Institute of Technology (MIT)",
        location: "Cambridge, USA",
        ranking: "#1 Global (QS)",
        country: "USA",
        flag: "🇺🇸",
        features: ["Technology", "Innovation", "Entrepreneurship"],
        website: "https://www.mit.edu/",
    },
];
