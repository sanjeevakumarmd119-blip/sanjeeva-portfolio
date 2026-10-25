export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Healthcare Platform" | "AI & Computer Vision" | "Manufacturing Optimization" | "IoT & Embedded";
  description: string;
  technologies: string[];
  status: "Full-Stack Project" | "Working Prototype" | "Active Research";
  highlights: string[];
  accentColor: "red" | "yellow" | "blue";
  githubUrl?: string;
  demoUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Sanjeeva Kumar MD",
  shortName: "SANJEEVA.",
  title: "Full-Stack Developer · Video Editor",
  roleHeadline: "I build ideas into something real.",
  heroDescription:
    "I enjoy learning new technologies, building useful applications, and exploring creative ways to solve problems. From full-stack projects to IoT experiments, I turn what I learn into things people can experience.",
  location: "Bengaluru, India",
  fullLocation: "Bengaluru, Karnataka, India",
  email: "sanjeevakumarmd119@gmail.com",
  phone: "+91 8217572608",
  phoneDisplay: "+91 8217572608",
  linkedin: "https://www.linkedin.com/in/sanjeeva-kumar-m-d-4b9473294",
  github: "https://github.com/sanjeevakumarmd119-blip",
  resumePath: "/resume.pdf",
  education: {
    degree: "B.Tech in Information Technology (AR/VR)",
    institution: "Alliance University",
    location: "Bengaluru, Karnataka",
  },
  about: {
    label: "A LITTLE ABOUT ME",
    headline: "Curious by nature. A builder by habit.",
    paragraphs: [
      "I've always enjoyed learning something new and finding ways to apply it in real life. Whether I'm developing an application, experimenting with IoT, exploring AI-assisted workflows, or editing a video, I enjoy turning what I learn into something practical.",
      "I'm continuously improving my skills, exploring new tools, and building projects that help me grow as both a developer and a creator.",
    ],
    videoEditingNote:
      "Video editing is also an integral part of my creative process. Using DaVinci Resolve at an intermediate level, I apply fundamental editing principles—narrative rhythm, cut pacing, and sound continuity—to communicate ideas visually and effectively.",
  },
};

export const FEATURED_UCHN = {
  id: "uchn",
  title: "UCHN — Unified Care & Health Network",
  tagline: "Connected healthcare. Simplified for everyone.",
  badge: "Featured Project",
  description:
    "UCHN is a healthcare coordination platform designed to connect patients, doctors, and clinics through appointment discovery, pharmacy inventory lookup, live waiting queues, and emergency coordination.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Socket.IO",
    "Tailwind CSS",
  ],
  capabilities: [
    {
      title: "Doctor Discovery & Appointment Booking",
      description: "Search clinics by proximity, filter by medical specialty, view transparent consultation charges, and book slots with collision prevention.",
    },
    {
      title: "Pharmacy Medicine Inventory Lookup",
      description: "Live search for prescription stock across local dispensaries with pickup or home delivery options, backed by transactional database safety.",
    },
    {
      title: "Live Clinic Waiting Queues",
      description: "Real-time queue tracking powered by WebSockets, reducing physical waiting room congestion and giving patients accurate wait estimates.",
    },
    {
      title: "Emergency SOS Workflow & Clinic Routing",
      description: "A structured 5-stage dispatch pipeline (Pending → Assigned → Dispatched → In-Progress → Resolved) directing incidents to optimal facilities.",
    },
    {
      title: "Doctor & Clinic Administration Dashboards",
      description: "Operational triage control surfaces for doctors to manage records and receptionists to coordinate queue flow smoothly.",
    },
    {
      title: "Progressive Web App (PWA) Functionality",
      description: "Installable cross-platform web app with offline asset caching and rapid-load emergency interfaces for field resilience.",
    },
    {
      title: "Role-Based Access Control & Integrity",
      description: "Robust RBAC separating patient records from administrative tools, secured with encrypted sessions and auditable state logging.",
    },
  ],
  demoPreview: {
    stats: [
      { label: "Active Queue Status", value: "8 in queue", status: "Optimal" },
      { label: "Emergency Dispatch", value: "5-Stage Pipeline", status: "Active" },
      { label: "Inventory Sync", value: "Prisma ACID", status: "Verified" },
      { label: "Architecture", value: "Next.js + Socket.IO", status: "Live Rooms" },
    ],
    stages: [
      { step: "01", name: "Pending", desc: "Patient coordinates received" },
      { step: "02", name: "Assigned", desc: "Optimal clinic matched" },
      { step: "03", name: "Dispatched", desc: "First responder deployed" },
      { step: "04", name: "In Progress", desc: "Triage & telemetry sync" },
      { step: "05", name: "Resolved", desc: "Care handover completed" },
    ],
  },
};

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    id: "hand-gesture-ai",
    title: "Hand Gesture Recognition AI",
    tagline: "Contactless computer vision gesture classifier",
    category: "AI & Computer Vision",
    description:
      "A real-time vision system utilizing Python, OpenCV, and MediaPipe to detect hand landmarks and map distinct finger configurations to digital commands for touchless interaction.",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    status: "Working Prototype",
    highlights: [
      "21 3D hand-landmark extraction at 30+ FPS",
      "Robust to variable lighting and skin tone diversity",
      "Low CPU overhead suitable for standard webcams",
    ],
    accentColor: "red",
    githubUrl: "https://github.com/sanjeevakumarmd119-blip",
  },
  {
    id: "production-scheduling-system",
    title: "Production Scheduling System for Dynamic Manufacturing",
    tagline: "Algorithmic job allocation & bottleneck minimization",
    category: "Manufacturing Optimization",
    description:
      "A dynamic dispatching and scheduling engine that optimizes machine load balancing, minimizes manufacturing idle time, and reacts dynamically to workstation downtimes.",
    technologies: ["Python", "TypeScript", "React", "Tailwind CSS"],
    status: "Working Prototype",
    highlights: [
      "Dynamic priority dispatching rules (FIFO, SPT, EDD)",
      "Interactive timeline Gantt visualization for shift floor tracking",
      "Scenario simulation to evaluate throughput before implementation",
    ],
    accentColor: "blue",
    githubUrl: "https://github.com/sanjeevakumarmd119-blip",
  },
  {
    id: "iot-interactive-projects",
    title: "IoT and Interactive Projects",
    tagline: "Hardware-to-cloud microcontrollers & sensor telemetry",
    category: "IoT & Embedded",
    description:
      "Hands-on hardware prototypes built with Arduino and ESP32 microcontrollers, interfacing multi-sensor arrays, Wi-Fi communication, and real-time interactive telemetry monitors.",
    technologies: ["Arduino", "ESP32", "C / C++", "Sensors (I2C/SPI)", "WebSockets"],
    status: "Working Prototype",
    highlights: [
      "Sensor integration: ultrasonic, temperature, humidity, and optical modules",
      "Bi-directional data streaming over Wi-Fi to interactive web dashboards",
      "Low-power deep sleep management for battery-operated wireless nodes",
    ],
    accentColor: "yellow",
    githubUrl: "https://github.com/sanjeevakumarmd119-blip",
  },
];

export interface SkillCategory {
  title: string;
  skills: string[];
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "DEVELOPMENT",
    description: "Core languages and modern frontend frameworks",
    skills: [
      "Python",
      "Java",
      "C",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "BACKEND AND DATA",
    description: "Data persistence, real-time protocols, and server logic",
    skills: ["PostgreSQL", "Prisma", "REST APIs", "Socket.IO"],
  },
  {
    title: "HARDWARE AND IOT",
    description: "Embedded prototyping, microcontrollers, and physical sensors",
    skills: ["Arduino", "ESP32", "Sensor-based projects"],
  },
  {
    title: "CREATIVE",
    description: "Visual storytelling, narrative pacing, and post-production",
    skills: ["DaVinci Resolve", "Video editing", "Editing workflows"],
  },
  {
    title: "CURRENTLY EXPLORING",
    description: "Augmenting engineering productivity and automation",
    skills: [
      "AI-assisted workflows",
      "Developer productivity",
      "Practical automation",
    ],
  },
];

export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
