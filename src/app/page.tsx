
'use client';

import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter, // Import CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  ArrowRight,
  Download,
  Cloud, // Keep Cloud (Used for GCP Certs & Tech)
  Database, // Keep Database (Used for Oracle Certs & Tech)
  Layers,
  Container,
  ShipWheel,
  ShieldCheck, // Keep ShieldCheck (Used for Cisco Cert & Tech)
  Network,
  DatabaseZap,
  Activity,
  Code,
  Terminal,
  Linkedin,
  Github,
  School,
  GraduationCap,
  Briefcase,
  Award, // Keep Award for the section header, but use specific icons in cards
  MessageSquare,
  User,
  List,
  FolderGit2,
  Sparkles, // Keep Sparkles for Soft Skills
  Lightbulb,
  ChevronLeft, // Import ChevronLeft
  ChevronRight, // Import ChevronRight
  Menu, // Import Menu for mobile
  Star, // Icon for Core Competencies
  Phone, // Added for WhatsApp
  Twitter, // Added for Twitter
  BookOpen, // Added for Medium
  CloudCog, // Added for skills section
} from 'lucide-react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn utility
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose // Import SheetClose
} from "@/components/ui/sheet"; // Import Sheet components for mobile menu
import { Separator } from '@/components/ui/separator'; // Import Separator
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { ThemeToggleButton } from '@/components/theme-toggle-button'; // Import ThemeToggleButton

// Placeholder Logo Component
const Logo = () => (
    <div className="flex items-center gap-4">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
        style={{ fontFamily: 'serif', fontWeight: 300 }}
      >
        <text x="10" y="45" fontSize="48" fill="currentColor">A</text>
        <text x="50" y="90" fontSize="48" fill="currentColor">M</text>
        <path d="M8 92 L92 8" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="text-2xl font-semibold text-foreground">Aasim Malik</span>
    </div>
);


// Define Technology Icons based on resume
const technologies: { name: string; icon: LucideIcon }[] = [
  { name: 'GCP', icon: Cloud },
  { name: 'OCI', icon: Database }, // Using Database as a proxy for Oracle Cloud
  { name: 'Terraform', icon: Layers },
  { name: 'Docker', icon: Container },
  { name: 'Kubernetes/GKE', icon: ShipWheel },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Networking', icon: Network },
  { name: 'Databases', icon: DatabaseZap }, // e.g., Cloud SQL, Firestore, BigQuery
  { name: 'Monitoring', icon: Activity }, // e.g., Cloud Monitoring, Logging
  { name: 'Python', icon: Code },
  { name: 'Bash', icon: Terminal },
];

// Categorized Skills for improved display
const categorizedSkills = {
  'Cloud Platforms': [
    'Google Cloud Platform (GCP)', 'Oracle Cloud Infrastructure',
   ],
  'Cloud Services': [
     'Compute Engine', 'Cloud Storage', 'Cloud SQL', 'BigQuery', 'Cloud Functions', 'Pub/Sub', 'Cloud Run',
   ],
  'Infrastructure as Code': [
    'Terraform', 'Google Cloud Deployment Manager',
  ],
  'Containerization': [
     'Docker', 'Kubernetes', 'Google Kubernetes Engine (GKE)',
  ],
  'Security & Compliance': [
    'IAM', 'VPC Service Controls', 'Cloud Security Command Center', 'Data Encryption',
  ],
  'Networking': [
     'VPC', 'Cloud Load Balancing', 'Cloud CDN', 'Cloud Interconnect', 'Cloud DNS',
  ],
  'Database Systems': [
    'Cloud SQL', 'Cloud Spanner', 'Firestore', 'Bigtable', 'BigQuery', // Note: BigQuery also listed under Services
  ],
  'Monitoring & Analytics': [
    'Cloud Monitoring', 'Cloud Logging', 'Error Reporting', 'Cloud Trace',
  ],
  'Scripting & Programming': [
    'Python', 'Bash',
  ],
};

// Updated Core Competencies / Soft Skills Section Data
const coreCompetencies = [
    'Cloud Architecture & Design',
    'Problem Solving & Critical Thinking',
    'Cost Optimization Strategies',
    'Performance Tuning & Improvement',
    'Security Implementation & Best Practices',
    'Technical Documentation & Runbooks',
    'Effective Communication (Technical & Non-Technical)',
    'Team Collaboration & Knowledge Sharing',
    'Process Automation (IaC, CI/CD)',
    'Migration Planning & Execution',
    'High Availability & Disaster Recovery Design',
    'System Reliability Enhancement',
    'Client Interaction & Requirements Gathering',
    'Agile Methodologies',
];


// Core Experience Data (For WHO AM I Section)
const coreExperiences = [
   {
    company: 'ACCENTURE',
    role: 'Associate Software Engineer',
    date: 'PRESENT',
    location: 'Bengaluru, Karnataka',
    colorClass: 'text-accenture-purple', 
  },
  {
    company: 'KODE KLOUD ENGINEER (PLATFORM)',
    role: 'Sr Devops Engineer',
    date: 'JAN 2023 - JUL 2023',
    location: 'Remote',
    colorClass: 'text-kodekloud-skyblue', 
  },
  {
    company: 'KODE KLOUD ENGINEER (PLATFORM)',
    role: 'Devops Engineer',
    date: 'FEB 2022 - DEC 2022',
    location: 'Remote',
    colorClass: 'text-kodekloud-skyblue', 
  },
  {
    company: 'GOWTH CENTRAL VC',
    role: 'SME Intern',
    date: 'JULY 2022',
    location: 'Remote',
    colorClass: 'text-gowth-darkblue', 
  },
];

// Detailed Work Experience Data (Make sure the latest experience is first)
const workExperiences = [
  {
    title: 'Associate Software Engineer',
    company: 'Accenture',
    date: 'Jul 2023 - Present',
    location: 'Bengaluru, Karnataka',
    points: [
      'Stepping into my role as an Associate Software Engineer at Accenture felt like entering a new universe one filled with the endless possibilities of cloud architecture. My first mission? To design a system that could operate seamlessly across the globe, staying online nearly 100% of the time. I turned to a tool called Terraform, which let me automate the creation of our cloud resources. I\'ll never forget the thrill of my first big win: watching resources spring to life in multiple regions, perfectly in sync, like conducting a digital orchestra.',
      'With that foundation set, I dove into the world of cloud technology. Using Google Cloud services, I crafted applications that could scale and adapt as needed. It was a playground of innovation combining tools like Compute Engine, Cloud Storage, and Cloud SQL felt like assembling a high tech puzzle, each piece unlocking new potential.',
      'But power comes with responsibility, and I quickly learned that managing costs was just as critical. I spotted systems running round the clock when they didn’t need to be, so I set up automatic schedules to switch them off during quiet hours. The result? A hefty chunk of savings without a single dip in performance a small tweak with a big payoff.',
      'Keeping things running smoothly was another passion of mine. I used Google Cloud\'s monitoring tools to build alerts and dashboards that acted like an early warning system. One time, an alert caught a potential issue before it even hit us fixing it felt like I\'d gained a superpower, keeping the team one step ahead.',
      'Databases became my next frontier. I managed our data systems to ensure they were always available and lightning fast, diving deep into the details to keep everything humming along perfectly.',
      'Security was non negotiable. I set up controls to decide who could access what, and locked down our data with encryption, making sure our systems were as safe as they were strong.',
      'Along the way, I documented every step sketching out cloud diagrams and writing guides so my teammates could pick up where I left off. Sharing knowledge became my way of building a stronger, faster team.',
      'My time at Accenture has been a wild ride of growth and discovery. I\'ve built resilient cloud solutions, slashed costs, boosted reliability, and kept security front and center all while thriving in a fast paced, creative environment. I can\'t wait to see what\'s next.',
    ],
  },
  {
    title: 'Sr Devops Engineer',
    company: 'Kode Kloud Engineer (Platform)',
    date: 'Jan 2023 - Jul 2023',
    location: 'Remote',
    points: [
      'I got to play architect in the cloud, designing systems on Google Cloud Platform that could grow and shrink like magic. The best part? We saved 20% on costs while making everything run smoother. It was like building a city that could expand instantly during rush hour and cozy up when things got quiet all without breaking the bank.',
      'I took our old school apps and gave them a new home in the cloud. It was like moving from a clunky old car to a sleek, fast electric one 35% cheaper to run and 40% faster. Watching those apps come to life in their new environment, zipping along without a hitch, was a proud moment.',
      'I set up a safety net for our systems so that if anything went wrong, we could bounce back in minutes, not hours. It was like having a superhero on speed dial ready to save the day at a moment\'s notice. Knowing our systems could recover that fast gave the whole team peace of mind.',
      'I built a fortress in the cloud, using tools like VPC and Cloud Load Balancing to keep our apps safe and running smoothly, no matter how many people were using them. It was like creating a VIP lounge for our applications exclusive, secure, and always open for business.',
      'I turned our data warehouse into a speed demon, making queries 45% faster and cutting storage costs by 30%. It was like giving our data a turbo boost suddenly, everything was quicker, cheaper, and way more efficient. The team could get insights in a flash, and I loved seeing the impact.',
    ],
  },
  {
    title: 'Devops Engineer',
    company: 'Kode Kloud Engineer (Platform)',
    date: 'Feb 2022 - Dec 2022',
    location: 'Remote',
    points: [
    'Led the charge in moving our old school systems to the cloud, which not only cut our costs by 40% but also made our systems way more flexible and ready to grow.',
    'Set up serverless systems that run like magic, cutting down the time we spent babysitting servers by 60%. It\'s like having an invisible team handling the heavy lifting.',
    'Built a data superhighway that lets us see what\'s happening in our business right now, not yesterday. It\'s like having a crystal ball for our data.',
    'Set up a conveyor belt for our code that gets new features out the door twice as fast and with fewer hiccups. It\'s like upgrading from a bicycle to a sports car for our deployments.',
    ],
  },
    {
    title: 'SME Intern',
    company: 'Gowth Central VC',
    date: 'July 2022',
    location: 'Remote',
    points: [
    'As a Linux SME intern, I teamed up with different departments to streamline how we work, cutting down the time to finish daily tasks by 20%.',
    'Dug deep into research and used my analytical chops to help the team hit their goals, boosting productivity by 15%.',
    'Knocked out my tasks in record time less than a week and got a shout out with a Letter of Recommendation.',

    ],
  },
];

// Project Data
const projects = [
  {
    title: 'Cloud-Based RAG Application with Llama Index',
    date: 'Apr 2024 - May 2024',
    description: 'Built a production-ready RAG application leveraging serverless GCP services and Vertex AI for efficient, scalable, and secure AI-powered functionality.',
    points: [
    'I assembled a rock solid RAG app with Google Cloud Run driving the engine, Cloud Storage holding the goods, and Vertex AI bringing the brains.',
    'Went serverless with a setup that scales on its own, adapting to traffic spikes or lulls like a pro, keeping things smooth and efficient.',
    'Locked in the APIs with Google\'s IAM security, ensuring only the right crew gets through the door.',
    'Fine tuned the cloud resources to keep costs low while still delivering top notch speed and dependability.',
    ],
    tags: ['GCP', 'Cloud Run', 'Cloud Storage', 'Vertex AI', 'Serverless', 'Python', 'Llama Index', 'RAG'],
    githubLink: "https://github.com/AasimMalik20/JavaScript-RAG-Web-Apps-with-LlamaIndex", // Added GitHub link
    liveLink: null,
  },
  {
    title: 'Secure Cloud Data Platform',
    date: 'Dec 2022 - Feb 2023',
    description: 'Architected a secure and compliant data platform on GCP, implementing robust security measures and optimizing data processing workflows.',
    points: [
    'Crafted a bulletproof data platform on GCP, weaving together BigQuery, Cloud Storage, and Data Catalog for a seamless data powerhouse.',
    'Locked down sensitive data with column level security and clever masking, keeping prying eyes at bay.',
    'Engineered slick data pipelines with Cloud Dataflow, turning raw data into gold with lightning fast ETL processes.',
    'Set up a robust data governance system that plays by the rules, ensuring compliance without breaking a sweat.',
    'Slashed data processing costs by 35% with smart query tweaks and storage tiering, proving you can save big without skimping on performance.',
    ],
    tags: ['GCP', 'BigQuery', 'Cloud Storage', 'Data Catalog', 'Dataflow', 'Security', 'Governance', 'ETL'],
    githubLink: null,
    liveLink: null,
  },
  {
    title: 'Multi-Region Cloud Infrastructure',
    date: 'Jul 2022 - Nov 2022',
    description: 'Designed and deployed a highly available multi-region cloud infrastructure for a critical IBM application, ensuring business continuity and optimized performance.',
    points: [
    'Crafted a multi region cloud blueprint that stays up and running, come rain or shine, ensuring the app never skips a beat.',
    'Built disaster recovery plans with pinpoint recovery goals, tailored to keep the business humming even in the worst case scenarios.',
    'Set up global load balancing and a content delivery network to serve data fast, no matter where users are on the planet.',
    'Rolled out monitoring and alerts across all regions with a central hub for logs, giving us eagle eye visibility into the system.',
    'Delivered a jaw dropping 99.99% uptime for mission critical apps, keeping the business running like a well oiled machine.',
    ],
    tags: ['Cloud Architecture', 'High Availability', 'Disaster Recovery', 'Load Balancing', 'CDN', 'Monitoring', 'GCP'], // Added GCP tag based on context
    githubLink: null,
    liveLink: null,
  },
];

// Type for Project Card including flipped state
type ProjectCardProps = {
  project: typeof projects[0];
  style: React.CSSProperties;
  isActive: boolean;
  onClick?: () => void; // Optional click handler for flipping
};

// Flippable Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, style, isActive, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    // Only allow flipping the active card if it has a github link
    if (isActive && project.githubLink) {
      setIsFlipped(!isFlipped);
      if (onClick) onClick(); // Call the provided onClick if needed
    }
  };

  // Reset flip state if the card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setIsFlipped(false);
    }
  }, [isActive]);


  return (
    <div
      className={cn(
        "absolute inset-0 transition-transform duration-500 ease-out flex justify-center items-center perspective-1000",
        // Make inactive cards non-interactive for flipping
        !isActive && "pointer-events-none"
      )}
      style={style}
      onClick={handleCardClick} // Handle click on the outer div
    >
      <div
        className={cn(
          "w-full max-w-2xl h-[500px] relative transition-transform duration-700 transform-style-preserve-3d",
           isFlipped && "rotate-y-180",
           isActive && project.githubLink && "cursor-pointer", // Only show cursor pointer if flippable
           // Apply blur only to non-active cards, not the flip container itself
          !isActive && "blur-[1px]"
        )}
      >
        {/* Front of the card */}
        <Card className={cn(
          "absolute inset-0 backface-hidden overflow-hidden flex flex-col",
          "bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg border border-border" // Use card background & foreground
        )}>
          <CardHeader>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <CardTitle>{project.title}</CardTitle>
              <Badge variant="outline">{project.date}</Badge>
            </div>
            <CardDescription className="pt-1 text-muted-foreground">{project.description}</CardDescription> {/* Ensure description uses muted */}
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto scrollbar-hide">
            <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
              {project.points.map((point, pIndex) => (
                <li key={pIndex}>{point}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1">
              {project.tags.map((tag, tIndex) => (
                <Badge key={tIndex} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          {(project.githubLink || project.liveLink) && (
            <CardFooter className="pt-4 flex gap-2 border-t mt-auto">
              {project.githubLink && (
                // Prevent link click from propagating to the card flip
                <Button variant="link" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                   <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      GitHub <Github className="ml-1 h-3 w-3" />
                   </a>
                </Button>
              )}
              {project.liveLink && (
                <Button variant="link" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                   <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Live Demo <ArrowRight className="ml-1 h-3 w-3" />
                   </a>
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* Back of the card */}
        <Card className={cn(
          "absolute inset-0 backface-hidden overflow-hidden flex flex-col items-center justify-center rotate-y-180",
           "bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg border border-border" // Use card background & foreground
        )}>
           {project.githubLink && (
             // Prevent link click from propagating to the card flip
             <Button variant="default" size="lg" asChild onClick={(e) => e.stopPropagation()}>
               <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                 View on GitHub <Github className="ml-2 h-5 w-5" />
               </a>
             </Button>
           )}
           {!project.githubLink && (
                <p className="text-muted-foreground">No link available for this project.</p>
            )}

        </Card>
      </div>
    </div>
  );
};

// Type for Experience Card
type ExperienceCardProps = {
  experience: typeof workExperiences[0];
  style: React.CSSProperties;
  isActive: boolean;
};

// Experience Card Component (Mirrors ProjectCard structure)
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, style, isActive }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-transform duration-500 ease-out flex justify-center items-center",
        // Make inactive cards non-interactive
        !isActive && "pointer-events-none"
      )}
      style={style}
    >
      <Card className={cn(
        "w-full max-w-2xl shadow-lg border border-border overflow-hidden h-[500px] flex flex-col", // Match height of project card
        "bg-card/80 backdrop-blur-sm text-card-foreground",
        !isActive && "blur-[1px]" // Slightly blur non-active cards
      )}>
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle>{experience.title}</CardTitle>
              <CardDescription className="text-foreground font-medium">
                {experience.company}
              </CardDescription>
            </div>
            <Badge variant="outline">{experience.date}</Badge>
          </div>
          <CardDescription className="pt-1 text-muted-foreground">{experience.location}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto scrollbar-hide">
          <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
            {experience.points.map((point, pIndex) => (
              <li key={pIndex}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};


// Certification Data with Icons
const certifications = [
  {
    title: 'Professional Cloud Architect',
    issuer: 'Google Cloud',
    icon: Cloud,
    color: 'text-foreground', // Use theme color
    hoverImage: null, // Removed per request
    link: 'https://www.credly.com/badges/a0aa0637-f948-4ca6-afeb-e4f0822855af/public_url', // Added link per request
  },
  {
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    icon: Cloud,
    color: 'text-foreground', // Use theme color
    hoverImage: null,
    link: 'https://www.credly.com/badges/25be3a65-4448-43c7-904c-de0d7f2a3575/public_url',
  },
  {
    title: 'Oracle Cloud Infrastructure Generative AI Professional',
    issuer: 'Oracle',
    icon: Database,
    color: 'text-foreground', // Use theme color
    hoverImage: null,
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=E0E9C4E9ACA5E90D8DBB5A343A2FBBD316A7DC87357BEA55F5B07D4E32073F9F',
  },
  {
    title: 'Oracle Cloud Infrastructure 2023 Certified Foundations Associate',
    issuer: 'Oracle (1Z0-1085-23)',
    icon: Database,
    color: 'text-foreground', // Use theme color
    hoverImage: null,
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=9239C29B8DE6F49583D2C113905F445A744579EB91D6C9AAD39C6FD009240CDA',
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco',
    icon: ShieldCheck,
    color: 'text-foreground', // Use theme color
    hoverImage: null,
    link: 'https://www.credly.com/badges/be946124-75c1-44cb-9b1a-26b89c9fc87d/public_url'
  },
  {
    title: 'GitHub Copilot',
    issuer: 'GitHub',
    icon: Github,
    color: 'text-foreground',
    hoverImage: null,
    link: 'https://www.credly.com/badges/7037903a-d802-4c1b-afd1-20f07a6e7cee/public_url',
  },
];


export default function Home() {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0); // State for experience carousel
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // State for project carousel
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  
  // Icon mapping for technical skills
  const skillIcons: { [key: string]: LucideIcon } = {
    'Cloud Platforms': Cloud,
    'Cloud Services': CloudCog,
    'Infrastructure as Code': Layers,
    'Containerization': Container,
    'Security & Compliance': ShieldCheck,
    'Networking': Network,
    'Database Systems': DatabaseZap,
    'Monitoring & Analytics': Activity,
    'Scripting & Programming': Code,
  };


  const handlePrevExperience = () => {
    setCurrentExperienceIndex((prevIndex) =>
      prevIndex === 0 ? workExperiences.length - 1 : prevIndex - 1
    );
  };

  const handleNextExperience = () => {
    setCurrentExperienceIndex((prevIndex) =>
      prevIndex === workExperiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }

        /* Override container max-width for the slideshow section */
        .full-width-slideshow {
           max-width: none !important;
           padding-left: 0 !important;
           padding-right: 0 !important;
           /* Ensure the container itself doesn't clip the animation */
           overflow-x: clip; /* Use clip to hide overflow without scrollbars */
           position: relative; /* Needed for absolute positioning of inner content if required */
        }
        /* Animation for horizontal scrolling */
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          /* Slide by the width of ONE set of items for seamless loop */
          100% { transform: translateX(-50%); }
        }

        .animate-slideLeft > div {
          /* Double the width to accommodate two sets of items */
          width: 200%;
          animation: slideLeft 60s linear infinite;
        }

        /* Pause animation on hover */
        .group:hover .animate-slideLeft > div {
          animation-play-state: paused;
        }

        /* Custom class for accent present date */
        .text-present-accent { color: hsl(142.1 76.2% 36.3%); } /* Green color */
        .dark .text-present-accent { color: hsl(142.1 70.6% 45.3%); } /* Lighter Green for dark mode */

        /* Custom Company Colors */
        .text-accenture-purple { color: #A100FF; }
        .dark .text-accenture-purple { color: #C77DFF; }

        .text-kodekloud-skyblue { color: #00BFFF; }
        .dark .text-kodekloud-skyblue { color: #00BFFF; }

        .text-gowth-darkblue { color: #00008B; }
        .dark .text-gowth-darkblue { color: #ADD8E6; }
      `}</style>
      <header className="sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <Logo />
          <div className="flex items-center gap-4"> {/* Container for nav and theme toggle */}
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#home"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                HOME
              </a>
              <a
                href="#WHO AM I" // Updated ID
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                WHO AM I
              </a>
               <a
                href="#work-experience" // Link to detailed experience
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                WORK EXPERIENCE
              </a>
              <a
                href="#skills"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                SKILLS
              </a>
              <a
                href="#projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                PROJECTS
              </a>
               <a
                href="#certifications"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                CERTIFICATIONS
              </a>
               <a
                href="#education"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                EDUCATION
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                CONTACT
              </a>
            </nav>

             {/* Theme Toggle Button - Desktop */}
             <div className="hidden md:block">
                <ThemeToggleButton />
             </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center md:hidden"> {/* Container for mobile buttons */}
                <ThemeToggleButton /> {/* Theme Toggle for Mobile */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs p-6">
                    <nav className="flex flex-col space-y-5 mt-6">
                        <SheetClose asChild>
                          <a href="#home" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">HOME</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#WHO AM I" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">WHO AM I</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#work-experience" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">WORK EXPERIENCE</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#skills" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">SKILLS</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#projects" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">PROJECTS</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#certifications" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">CERTIFICATIONS</a>
                        </SheetClose>
                        <SheetClose asChild>
                           <a href="#education" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">EDUCATION</a>
                        </SheetClose>
                         <SheetClose asChild>
                           <a href="#contact" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">CONTACT</a>
                         </SheetClose>
                    </nav>
                  </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16">
          {/* Hero Grid */}
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-24 items-center">
              {/* Left Column: Text Content */}
              <div className="space-y-6 text-center lg:text-left">
                <Badge
                  variant="outline"
                  className="border-foreground/30 text-foreground font-medium py-1 px-3 rounded-full text-sm"
                >
                  HELLO! I AM AASIM MALIK
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  Cloud Architect &<br className="hidden md:block" /> AI Optimist
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:mx-0">
                  A Google Cloud Certified Professional Cloud Architect, passionate about designing scalable, secure cloud solutions and leveraging cloud-native tech for innovation.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start pt-4">
                  <Button size="lg" asChild>
                    <a href="#contact">
                      Get In Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/Aasim_Malik_Resume.pdf" download="Aasim_Malik_Resume.pdf">
                      Download CV
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <Image
                    src="https://placehold.co/384x384.png"
                    width={384}
                    height={384}
                    alt="Aasim Malik Profile Picture"
                    className="rounded-full object-cover border-8 border-background shadow-2xl"
                    data-ai-hint="profile picture"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Technology Icons Slideshow */}
          <div className="w-full overflow-hidden pt-24 group full-width-slideshow">
            <p className="text-sm text-muted-foreground mb-6 text-center uppercase tracking-widest">TECHNOLOGIES I WORK WITH</p>
            <div className="animate-slideLeft">
              <div className="flex">
                  {/* Duplicate Icons for seamless loop */}
                  {[...technologies, ...technologies].map((tech, index) => (
                      <Card
                          key={`${tech.name}-${index}-tech-1`}
                          className="p-4 min-w-[120px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card"
                      >
                          <tech.icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <p className="mt-2 text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                      </Card>
                  ))}
                  {[...technologies, ...technologies].map((tech, index) => (
                      <Card
                          key={`${tech.name}-${index}-tech-2`}
                          className="p-4 min-w-[120px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card"
                      >
                          <tech.icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                          <p className="mt-2 text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                      </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>


        {/* WHO AM I Section */}
        <section id="WHO AM I" className="py-16 bg-secondary"> {/* Updated ID */}
            <div className="container mx-auto px-4 md:px-6">
                 {/* Title centered above the grid - Updated */}
                <div className="flex justify-center items-center gap-2 mb-12">
                    <Lightbulb className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        WHO AM I {/* Updated Title */}
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 items-start"> {/* Increased gap-x */}
                    {/* Left Column */}
                    <div className="space-y-6">
                        <Badge
                            variant="outline"
                            className="border-foreground/30 text-foreground font-medium py-1 px-3 rounded-full text-xs"
                        >
                            PROFESSIONAL OVERVIEW
                        </Badge>
                        <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">
                           I architect scalable & secure cloud solutions
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-md">
                            As a Google Cloud Certified Professional Cloud Architect, I specialize in designing and implementing robust cloud infrastructures. My focus is on optimizing costs, enhancing system reliability, and ensuring security and compliance, leveraging cloud-native technologies to drive innovation.
                        </p>
                    </div>

                    {/* Right Column - Updated with Pills and Date Alignment */}
                    <div className="space-y-8 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-0"> 
                        {coreExperiences.map((exp, index) => (
                            <div key={index} className="md:pl-12 space-y-2">  {/* Removed relative, added space-y-2 */}
                                <p className={cn("text-xs font-semibold uppercase tracking-wider", exp.colorClass || 'text-foreground')}>
                                    {exp.company}
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                    <h4 className="text-xl font-medium text-foreground">{exp.role}</h4>
                                    <p className={cn(
                                        "text-sm text-muted-foreground whitespace-nowrap sm:ml-auto", 
                                        exp.date.toUpperCase() === 'PRESENT' && 'text-present-accent font-semibold' 
                                    )}>
                                        ({exp.date})
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Detailed Work Experience Section - Carousel */}
        <section id="work-experience" className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-center items-center gap-2 mb-12">
                    <Briefcase className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Work Experience
                    </h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                     {/* Use a fixed height container and manage overflow internally */}
                    <div className="relative h-[550px] overflow-visible"> {/* Allow overflow for side cards */}
                        {workExperiences.map((exp, index) => {
                            // Calculate offset relative to the current index
                            let offset = index - currentExperienceIndex;
                            const totalItems = workExperiences.length;

                            // Handle wrapping for circular effect
                            if (offset > totalItems / 2) {
                                offset -= totalItems;
                            } else if (offset < -totalItems / 2) {
                                offset += totalItems;
                            }

                            const scale = 1 - Math.abs(offset) * 0.1; // Decrease scale for distant cards
                            const opacity = Math.max(0, 1 - Math.abs(offset) * 0.4); // Decrease opacity more steeply
                            const zIndex = totalItems - Math.abs(offset); // Cards closer to center are higher
                            const translateX = offset * 75; // INCREASED spacing between cards

                            // Skip rendering cards that are too far away and almost invisible
                            if (Math.abs(offset) > 2) {
                                return null;
                            }

                            return (
                                <ExperienceCard
                                    key={index}
                                    experience={exp}
                                    isActive={index === currentExperienceIndex}
                                    style={{
                                        transform: `translateX(${translateX}%) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: zIndex,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                        onClick={handlePrevExperience}
                        aria-label="Previous Experience"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                        onClick={handleNextExperience}
                        aria-label="Next Experience"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </section>


         {/* Skills Section - Updated Layout */}
        <section id="skills" className="py-16 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-center items-center gap-2 mb-12">
                    <List className="h-6 w-6 text-foreground" />
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Skills
                    </h2>
                </div>
                <Card className="shadow-md border border-border bg-card/80 backdrop-blur-sm mb-12">
                    <CardContent className="p-6 md:p-8">
                       <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                           <Terminal className="h-5 w-5 text-primary" />
                           Technical Skills
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                           {Object.entries(categorizedSkills).map(([category, skills], catIndex) => {
                               const Icon = skillIcons[category] || Star; // Fallback to a default icon
                               return (
                                   <div key={catIndex} className="space-y-4">
                                       <h4 className="flex items-center gap-3 text-lg font-medium text-foreground">
                                           <Icon className="h-5 w-5 text-primary" />
                                           {category}
                                       </h4>
                                       <div className="flex flex-wrap gap-2 pt-2">
                                           {skills.map((skill, skillIndex) => (
                                               <Badge key={skillIndex} variant="secondary" className="text-sm font-light">
                                                   {skill}
                                               </Badge>
                                           ))}
                                       </div>
                                   </div>
                               );
                           })}
                       </div>
                    </CardContent>
                </Card>

                {/* Core Competencies Horizontal Scroll - Full Width */}
                <div className="w-full overflow-hidden pb-4 group full-width-slideshow"> {/* Added full-width class */}
                    <div className="flex justify-center items-center gap-2 mb-6">
                       <Star className="h-5 w-5 text-foreground" /> {/* Use foreground */}
                       <h3 className="text-xl font-semibold text-foreground text-center">
                          Core Competencies
                       </h3>
                     </div>
                    {/* Removed inner overflow hidden and whitespace nowrap */}
                    <div className="animate-slideLeft"> {/* Apply animation to this inner div */}
                         {/* Inner div for animation, doubled content */}
                        <div className="flex"> {/* Container for the flex items, doubled width */}
                            {/* Duplicate Competencies for seamless loop */}
                            {[...coreCompetencies, ...coreCompetencies].map((competency, index) => ( // Duplicate the array once
                                <Badge
                                    key={`${index}-competency-1`} // Unique key part 1
                                    variant="outline"
                                    className="text-sm font-medium py-2 px-4 rounded-full shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card hover:bg-accent hover:text-accent-foreground"
                                >
                                    {competency}
                                </Badge>
                            ))}
                             {/* Second set for loop */}
                            {[...coreCompetencies, ...coreCompetencies].map((competency, index) => ( // Duplicate the array once
                                <Badge
                                    key={`${index}-competency-2`} // Unique key part 2
                                    variant="outline"
                                    className="text-sm font-medium py-2 px-4 rounded-full shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card hover:bg-accent hover:text-accent-foreground"
                                >
                                    {competency}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Projects Section - Carousel */}
        <section id="projects" className="py-16 bg-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center gap-2 mb-12">
              <FolderGit2 className="h-6 w-6 text-foreground" /> {/* Use foreground */}
              <h2 className="text-3xl font-semibold tracking-tight text-center">
                Project Showcase
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Container for projects */}
              <div className="relative h-[550px] overflow-visible"> {/* Ensure container allows visibility of offset cards */}
                {projects.map((project, index) => {
                  // Calculate offset relative to the current project index
                  let offset = index - currentProjectIndex;
                  const totalItems = projects.length;

                  // Handle wrapping for circular effect
                  if (offset > totalItems / 2) {
                    offset -= totalItems;
                  } else if (offset < -totalItems / 2) {
                    offset += totalItems;
                  }

                  const scale = 1 - Math.abs(offset) * 0.1;
                  const opacity = Math.max(0, 1 - Math.abs(offset) * 0.4);
                  const zIndex = totalItems - Math.abs(offset);
                  const translateX = offset * 75; // Adjust spacing

                  // Skip rendering cards that are too far away
                  if (Math.abs(offset) > 2) {
                    return null;
                  }

                  return (
                    <ProjectCard
                        key={project.title + index} // Ensure unique key
                        project={project}
                        isActive={index === currentProjectIndex}
                        style={{
                            transform: `translateX(${translateX}%) scale(${scale})`,
                            opacity: opacity,
                            zIndex: zIndex,
                        }}
                        // Pass onClick to handle flip state if needed, but main flip logic is inside ProjectCard
                     />
                  );
                })}
              </div>

              {/* Navigation Arrows for Projects */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                onClick={handlePrevProject}
                aria-label="Previous Project"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                onClick={handleNextProject}
                aria-label="Next Project"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center gap-2 mb-12">
              <Award className="h-6 w-6 text-foreground" />
              <h2 className="text-3xl font-semibold tracking-tight text-center">
                Certifications
              </h2>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => {
                const CertIcon = cert.icon;
                
                const cardInnerContent = (
                  <Card
                    className="h-full w-full shadow-md border border-border hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center text-center p-6 bg-card hover:bg-accent hover:text-accent-foreground backdrop-blur-sm group relative"
                  >
                    <CardHeader className="p-0">
                      {cert.hoverImage ? (
                        <div className="relative h-20 w-20 mb-4 mx-auto">
                          <Image
                            src={cert.hoverImage}
                            alt={`${cert.title} Badge`}
                            width={80}
                            height={80}
                            className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
                            data-ai-hint="certification badge"
                          />
                          <CertIcon className={cn("h-16 w-16 transition-opacity duration-300 opacity-100 group-hover:opacity-0", cert.color)} />
                        </div>
                      ) : (
                        <CertIcon className={cn("h-16 w-16 mb-4", cert.color)} />
                      )}
                      <CardTitle className="text-lg font-semibold">{cert.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground mt-1">{cert.issuer}</CardDescription>
                    </CardHeader>
                  </Card>
                );

                if (cert.link) {
                  return (
                    <a
                      key={index}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {cardInnerContent}
                    </a>
                  );
                }

                return (
                  <div key={index} className="h-full">
                    {cardInnerContent}
                  </div>
                );
              })}
              {certifications.length % 3 === 2 && <div className="hidden lg:block"></div>}
            </div>
          </div>
        </section>


        {/* Education Section */}
        <section id="education" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <School className="h-6 w-6 text-foreground" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                 Education
                </h2>
             </div>
            <Card className="max-w-3xl mx-auto shadow-sm border border-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-8 w-8 text-foreground flex-shrink-0 mt-1" />
                  <div className="flex-grow">
                    <CardTitle className="mb-1">B.E Computer Science and Engineering</CardTitle>
                    <CardDescription className="text-foreground font-medium">
                      St. Joseph's College of Engineering
                    </CardDescription>
                    <CardDescription className="text-muted-foreground mt-1">
                      Chennai, Tamil Nadu
                    </CardDescription>
                     <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-foreground font-medium">9.01/10.00 CGPA</p>
                        <p className="text-sm text-muted-foreground font-medium">May 2023</p>
                     </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-secondary"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <MessageSquare className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                 Contact Me
                </h2>
             </div>
            <Card className="max-w-xl mx-auto shadow-md border border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription className="text-muted-foreground"> {/* Use muted */}
                  Let's connect! Feel free to reach out.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                 <div className="text-center text-muted-foreground space-y-1">
                    <p>Srinagar, J&K, India</p>
                    <p>
                       <a href="mailto:aasimmalik29@gmail.com" className="hover:text-primary transition-colors"> {/* Use primary for hover */}
                          aasimmalik29@gmail.com
                       </a>
                    </p>
                    <p>
                       <a href="tel:+919176462019" className="hover:text-primary transition-colors"> {/* Use primary for hover */}
                         +91 9176462019
                       </a>
                    </p>
                 </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {/* Email Button */}
                    <Button variant="default" asChild>
                      <a
                        href="mailto:aasimmalik29@gmail.com"
                        className="flex items-center"
                      >
                        Send Email <Mail className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    {/* LinkedIn Button */}
                    <Button asChild className="bg-[#0077b5] text-primary-foreground hover:bg-[#0077b5]/90">
                        <a href="https://www.linkedin.com/in/aasim-malik/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </a>
                    </Button>
                    {/* GitHub Button */}
                     <Button asChild className="bg-black text-white hover:bg-black/90">
                        <a href="https://github.com/AasimMalik20" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                    </Button>
                    {/* WhatsApp Button */}
                    <Button asChild className="bg-[#25D366] text-primary-foreground hover:bg-[#25D366]/90">
                      <a href="https://wa.me/919176462019" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" /> WhatsApp {/* Using Phone icon as proxy */}
                      </a>
                    </Button>
                    {/* Twitter Button */}
                    <Button asChild className="bg-[#1DA1F2] text-primary-foreground hover:bg-[#1DA1F2]/90">
                      <a href="https://x.com/AasimMalik4957?t=b-o3zb-2ZiYHZe2s5AYnLQ&s=09" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Twitter className="mr-2 h-4 w-4" /> Twitter
                      </a>
                    </Button>
                    {/* Medium Button */}
                    <Button asChild className="bg-black text-white hover:bg-black/90">
                      <a href="https://medium.com/@aasimmalik29" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" /> Medium {/* Using BookOpen as proxy */}
                      </a>
                    </Button>

                    {/* Add Portfolio link if available (e.g., link to this site itself or another) */}
                     {/* <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer"> Portfolio </a>
                    </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border mt-16 bg-background"> {/* Changed bg for alternation */}
        <div className="container mx-auto text-center text-muted-foreground text-xs px-4 md:px-6">
          © {new Date().getFullYear()} Aasim Malik. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
