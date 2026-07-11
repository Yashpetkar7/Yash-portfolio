export const sectionLinks = [
  { label: 'About', href: '#about-skills' },
  { label: 'Work', href: '#experience-projects' },
  { label: 'Contact', href: '#contact' },
];

export const heroContent = {
  fullName: 'Yash Petkar',
  firstName: 'YASH',
  lastName: 'PETKAR',
  role: 'AI & Business Professional',
  locationLabel: 'AI IN BUSINESS · MUMBAI / DUBAI',
  coordinates: '19.0760° N, 72.8777° E',
  subtitle: "Computer Science graduate and Master's candidate in AI in Business at SP Jain (Dubai), building AI-powered BI, full-stack systems, and startup operations that turn data into decisions.",
  cta: [
    { label: 'VIEW_WORK', href: '#experience-projects' },
    { label: 'CONTACT', href: '#contact' },
  ],
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Yashpetkar7', icon: 'github/fff' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-petkar-179542258', icon: '/images/linkedin.png' },
  { label: 'Email', href: 'mailto:yashpetkar07@gmail.com', icon: 'gmail' },
];

export const aboutContent = {
  heading: 'BUILDING',
  accent: 'AI + BUSINESS IMPACT',
  description: "I am a Computer Science graduate and aspiring AI and Business professional focused on building technology-driven solutions that create real-world impact. My work combines software development, artificial intelligence, analytics, operations, and strategic thinking. I have built an AI-powered business intelligence dashboard using LLMs, a full-stack gym management platform with QR access and automated reporting, and operational systems as Co-Founder and Head of Operations at Vmintus.",
};

export const skillsData = [
  {
    label: 'AI & Analytics',
    description: 'LLM-powered insights and decision support',
    icons: [
      { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'OpenAI', url: 'https://cdn.simpleicons.org/openai/FFFFFF' },
      { name: 'LLM APIs', url: 'https://cdn.simpleicons.org/langchain/00A67E' },
      { name: 'SQL', url: 'https://cdn.simpleicons.org/postgresql/336791' },
    ],
  },
  {
    label: 'Business Intelligence',
    description: 'Dashboards, reporting, and data storytelling',
    icons: [
      { name: 'Power BI', url: 'https://cdn.simpleicons.org/powerbi/F2C811' },
      { name: 'Google Analytics', url: 'https://cdn.simpleicons.org/googleanalytics/E37400' },
      { name: 'Chart.js', url: 'https://cdn.simpleicons.org/chartdotjs/FF6384' },
    ],
  },
  {
    label: 'Full-Stack Development',
    description: 'Web apps and operational systems',
    icons: [
      { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
      { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
      { name: 'HTML5', url: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS', url: 'https://cdn.simpleicons.org/css/1572B6' },
      { name: 'MySQL', url: 'https://cdn.simpleicons.org/mysql/4479A1' },
      { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    label: 'Product & Strategy',
    description: 'Practical, scalable, value-driven systems',
    icons: [
      { name: 'Notion', url: 'https://cdn.simpleicons.org/notion/FFFFFF' },
      { name: 'Trello', url: 'https://cdn.simpleicons.org/trello/0052CC' },
      { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/FFFFFF' },
      { name: 'Vercel', url: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
    ],
  },
];

export const experienceData = [
  {
    year: 'Mar 2024',
    endYear: 'Feb 2025',
    title: 'Co-Founder & Head of Operations',
    company: 'Vmintus (Bootstrapped Startup)',
    logo: '',
    description: 'Co-founded and bootstrapped Vmintus from the ground up, contributing seed investment and continuing as an equity stakeholder. Architected the operational foundation — logistics workflows, vendor management, and customer support — and led a cross-functional founding team to implement structured SOPs, marketing, and business development.',
  },
  {
    year: '2023',
    endYear: 'Present',
    title: 'AI & Full-Stack Project Developer',
    company: 'Independent Projects',
    logo: '',
    description: 'Built AI-powered and full-stack systems including the LuLu Intelligence Dashboard (LLM + voice-enabled business analytics) and a full-stack gym management platform with QR-based access, scheduling, and automated reporting.',
  },
];

export const educationData = [
  {
    year: 'Sep 2025',
    endYear: '2027',
    title: "M.Sc. — AI in Business",
    company: 'SP Jain School of Global Management, Dubai',
    logo: '/images/spj.png',
    description: 'In progress. Focused on AI, data analytics, and business strategy.',
  },
  {
    year: '2020',
    endYear: '2023',
    title: 'B.Sc. Computer Science',
    company: 'SIES College of Commerce & Economics, Mumbai',
    logo: '',
    description: 'CGPA 7.68 / 10. Technical foundation in software development, systems, and data.',
  },
];

export const featuredProjectData = {
  name: 'LuLu Intelligence Dashboard',
  badge: '⭐ AI + BI',
  description: 'An AI-powered business intelligence dashboard built within a 3-member team for retail decision-making. Integrates LLM APIs and data pipelines to turn raw business data into actionable KPIs, with an AI chatbot and voice chat for natural-language querying. Recognized by faculty as a top project and shortlisted for industry presentation.',
  tech: [
    'Python',
    'LLM APIs',
    'OpenAI',
    'Data Visualization',
    'Business Analytics',
    'Voice UI',
    'Chatbot',
  ],
  metrics: ['LLM Insights', 'Voice + Chatbot', 'Real-Time KPIs', 'Faculty-Recognized'],
  architecture: 'Dashboard UI → Analytics + LLM APIs → Business Data → Actionable Insights',
  github: '',
};

export const projectsData = [
  {
    id: 2,
    name: 'Full-Stack Gym Management System',
    description: 'A full-stack gym management platform with QR code-based member entry/exit tracking, a meal-booking module integrated with trainer scheduling, and automated reporting that replaced manual record-keeping — reducing check-in errors and administrative overhead.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL', 'QR Code API'],
    status: 'COMPLETED',
    github: '',
    demo: '',
  },
  {
    id: 3,
    name: 'Vmintus Operations Engine',
    description: 'The operational backbone of Vmintus, built from scratch: logistics workflows, vendor management, customer support processes, structured SOPs, and early-stage marketing and business development execution.',
    tech: ['Operations', 'Logistics', 'Vendor Management', 'SOPs', 'Business Dev'],
    status: 'COMPLETED',
    github: '',
    demo: '',
  },
];

export const statsData = [
  { value: 'AI + BI', label: 'Focus Area' },
  { value: '2+', label: 'Core Systems Built' },
  { value: '1', label: 'Startup Co-Founded' },
  { value: 'MAIB', label: "Master's — SP Jain, Dubai" },
];

export const contactContent = {
  title: 'Contact',
  accent: 'Me',
  description: 'Open to conversations around AI, analytics, product strategy, business intelligence, startup operations, and technology-driven growth.',
  email: 'yashpetkar07@gmail.com',
  phone: '+91 93218 85488',
  location: 'Mumbai, India · Dubai (SP Jain)',
};

export const footerContent = {
  brandName: 'Yash Petkar',
  copyright: `© ${new Date().getFullYear()} Yash Petkar. Built with React, Tailwind, Framer Motion & Three.js.`,
  resume: '/Yash_Petkar_Resume.docx',
};
