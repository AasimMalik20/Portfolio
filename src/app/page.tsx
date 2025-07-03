
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
    {/* AM Logo with diagonal line */}
    <svg
      width="44"
      height="35"
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      {/* A */}
      <path d="M0 22L6 2L12 22" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M3 15H9" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Separator */}
      <path d="M14 2L16 22" stroke="currentColor" strokeWidth="1.5" />
      
      {/* M */}
      <path d="M18 22V2L24 16L30 2V22" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
    <span className="text-xl font-semibold text-foreground">Aasim Malik</span>
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


// Core Experience Data (For Expertise Section)
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
      'Architected multi-region GCP environments with 99.9% uptime, implementing infrastructure as code using Terraform for consistent, repeatable deployments.',
      'Designed and implemented cloud-native solutions using GCP services including Compute Engine, Cloud Storage, Cloud SQL, and Pub/Sub.',
      'Reduced cloud infrastructure costs by 15% through resource optimization, right-sizing, and implementing automated scaling policies.',
      'Implemented comprehensive monitoring solutions using Google Cloud Monitoring, reducing MTTR by 25% through improved observability.',
      'Managed high-availability database services on GCP including Cloud SQL and Firestore, ensuring data integrity and performance optimization.',
      'Established security best practices including IAM role-based access control, VPC Service Controls, and encryption for data at rest and in transit.',
      'Created detailed cloud architecture documentation and runbooks, enabling knowledge sharing and faster onboarding of new team members.',
    ],
  },
  {
    title: 'Sr Devops Engineer',
    company: 'Kode Kloud Engineer (Platform)',
    date: 'Jan 2023 - Jul 2023',
    location: 'Remote',
    points: [
      'Designed and implemented cloud-native architectures on GCP, improving scalability and reducing operational costs by 20%.',
      'Migrated on-premises applications to Google Cloud Platform, resulting in 35% cost savings and 40% improved performance.',
      'Implemented disaster recovery solutions with automated failover capabilities, reducing recovery time objectives (RTO) from hours to minutes.',
      'Designed secure cloud networking architectures using VPC, Cloud Load Balancing, and Cloud Interconnect for enterprise applications.',
      'Optimized BigQuery data warehousing solutions, reducing query times by 45% and storage costs by 30%.',
    ],
  },
  {
    title: 'Devops Engineer',
    company: 'Kode Kloud Engineer (Platform)',
    date: 'Feb 2022 - Dec 2022',
    location: 'Remote',
    points: [
      'Orchestrated migration of legacy infrastructure to Google Cloud Platform, reducing operational costs by 40% and enhancing system scalability.',
      'Implemented serverless architectures using Cloud Functions and Cloud Run, reducing infrastructure management overhead by 60%.',
      'Designed and deployed data analytics pipelines using BigQuery, Dataflow, and Data Studio, enabling real-time business insights.',
      'Created CI/CD pipelines for cloud-native applications, reducing deployment time by 50% and improving release reliability.',
    ],
  },
    {
    title: 'SME Intern',
    company: 'Gowth Central VC',
    date: 'July 2022',
    location: 'Remote',
    points: [
        'Focused on Subject Matter Expertise related to Venture Capital operations and analysis.', // Added placeholder detail
        'Contributed to research and data gathering for investment evaluations.',
        'Supported the team with market trend analysis and reporting.',
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
      'Built a production-ready RAG application using Google Cloud Run, Cloud Storage, and Vertex AI.',
      'Implemented serverless architecture with automatic scaling to handle variable workloads efficiently.',
      'Designed secure API endpoints with Cloud IAM authentication and authorization.',
      'Optimized cloud resource usage to minimize costs while maintaining high performance.',
      'Utilized Google Cloud Monitoring for comprehensive application observability.',
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
      'Architected a secure data platform on GCP using BigQuery, Cloud Storage, and Data Catalog.',
      'Implemented column-level security and data masking for sensitive information.',
      'Designed data pipelines using Cloud Dataflow for efficient ETL processes.',
      'Created comprehensive data governance framework compliant with industry regulations.',
      'Reduced data processing costs by 35% through query optimization and storage tiering.',
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
      'Designed and implemented a multi-region cloud architecture for high availability.',
      'Created disaster recovery procedures with RPO/RTO targets aligned to business requirements.',
      'Implemented global load balancing and CDN for optimized content delivery.',
      'Established monitoring and alerting across regions with centralized logging.',
      'Achieved 99.99% uptime for critical business applications.',
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
    hoverImage: '/cert-gcp-pca.png',
  },
  {
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    icon: Cloud,
    color: 'text-foreground', // Use theme color
    hoverImage: '/cert-gcp-ace.png',
  },
  {
    title: 'Oracle Cloud Infrastructure Generative AI Professional',
    issuer: 'Oracle',
    icon: Database,
    color: 'text-foreground', // Use theme color
    hoverImage: '/cert-oci-genai.png',
  },
  {
    title: 'Oracle Cloud Infrastructure 2023 Certified Foundations Associate',
    issuer: 'Oracle (1Z0-1085-23)',
    icon: Database,
    color: 'text-foreground', // Use theme color
    hoverImage: '/cert-oci-foundations.png',
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco',
    icon: ShieldCheck,
    color: 'text-foreground', // Use theme color
    hoverImage: '/cert-cisco-cybersec.png',
  },
  {
    title: 'GitHub Copilot',
    issuer: 'GitHub',
    icon: Github,
    color: 'text-foreground',
    hoverImage: null,
  },
];


export default function Home() {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0); // State for experience carousel
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // State for project carousel
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  

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
                href="#expertise" // Updated ID
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                EXPERTISE
              </a>
               <a
                href="#work-experience" // Link to detailed experience
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                DETAILS
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
                          <a href="#expertise" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">EXPERTISE</a>
                        </SheetClose>
                        <SheetClose asChild>
                          <a href="#work-experience" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-primary transition-colors">DETAILS</a>
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
        <section id="home" className="pt-24 pb-16 text-center flex flex-col items-center">
           {/* Container for centered content */}
           <div className="container mx-auto flex flex-col items-center px-4 md:px-6">
               <Badge
                 variant="outline"
                 className="mb-4 border-foreground/30 text-foreground font-medium py-1 px-3 rounded-full text-xs"
               >
                 HELLO! I AM AASIM MALIK
               </Badge>
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 max-w-3xl">
                 Cloud Architect & Developer
               </h1>
                
                {/* Profile Image */}
                <div className="relative w-48 h-48 mx-auto mb-12">
                    <Image
                        src="/profile-aasim-malik.jpg"
                        width={192}
                        height={192}
                        alt="Aasim Malik Profile Picture"
                        className="rounded-full object-cover border-4 border-background shadow-lg"
                    />
                </div>


               {/* Download CV Button */}
               <div className="mb-16">
                 <Button variant="outline" size="lg" asChild>
                   {/* Replace '#' with the actual path to your CV file or URL */}
                   <a href="/Aasim_Malik_Resume.pdf" download="Aasim_Malik_Resume.pdf">
                     DOWNLOAD CV
                     <Download className="ml-2 h-4 w-4" />
                   </a>
                 </Button>
               </div>
           </div>

            {/* Technology Icons Slideshow - Full Width */}
            <div className="w-full overflow-hidden pb-4 group full-width-slideshow"> {/* Added full-width class */}
                <p className="text-sm text-muted-foreground mb-6 text-center">TECHNOLOGIES I WORK WITH</p> {/* Centered text */}
                {/* Removed inner overflow hidden and whitespace nowrap */}
                <div className="animate-slideLeft"> {/* Apply animation to this inner div */}
                    {/* Container for the flex items, doubled width */}
                    <div className="flex">
                        {/* Duplicate Icons for seamless loop - enough to fill more than the screen width */}
                        {[...technologies, ...technologies].map((tech, index) => ( // Only duplicate once
                            <Card
                                key={`${tech.name}-${index}-tech-1`} // Unique key part 1
                                className="p-4 min-w-[120px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card"
                            >
                                <tech.icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <p className="mt-2 text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                            </Card>
                        ))}
                         {/* Second set of icons for the loop */}
                        {[...technologies, ...technologies].map((tech, index) => ( // Only duplicate once
                            <Card
                                key={`${tech.name}-${index}-tech-2`} // Unique key part 2
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


        {/* Expertise Section */}
        <section id="expertise" className="py-16 bg-secondary"> {/* Updated ID */}
            <div className="container mx-auto px-4 md:px-6">
                 {/* Title centered above the grid - Updated */}
                <div className="flex justify-center items-center gap-2 mb-12">
                    <Lightbulb className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Expertise {/* Updated Title */}
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
                        Detailed Work Experience
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
                    <List className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Skills
                    </h2>
                </div>
                <Card className="shadow-md border border-border bg-card/80 backdrop-blur-sm mb-12"> {/* Added margin bottom */}
                    <CardContent className="p-6 md:p-8">
                       <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                           <Terminal className="h-5 w-5 text-foreground" /> {/* Use foreground */}
                           Technical Skills
                       </h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8"> {/* Changed to 3 cols on large screens */}
                           {Object.entries(categorizedSkills).map(([category, skills], catIndex) => (
                               <div key={catIndex} className="space-y-4">
                                   <h4 className="text-lg font-medium text-foreground border-b border-border pb-2 mb-3">
                                       {category}
                                   </h4>
                                   <ul className="space-y-2">
                                       {skills.map((skill, skillIndex) => (
                                           <li key={skillIndex} className="flex items-center text-sm text-muted-foreground">
                                               <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground mr-2 flex-shrink-0"></span> {/* Use foreground */}
                                               {skill}
                                           </li>
                                       ))}
                                   </ul>
                               </div>
                           ))}
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
        <section id="certifications" className="py-16 bg-secondary"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-12">
                 <Award className="h-6 w-6 text-foreground" /> {/* Use foreground */}
                 <h2 className="text-3xl font-semibold tracking-tight text-center">
                  Certifications
                 </h2>
             </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3"> {/* Increased max-width and added lg:grid-cols-3 */}
              {certifications.map((cert, index) => {
                const CertIcon = cert.icon;
                return (
                  <Card
                    key={index}
                    className="shadow-md border border-border hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center text-center p-6 bg-card hover:bg-accent hover:text-accent-foreground backdrop-blur-sm group relative" // Use accent for hover
                  >
                    <CardHeader className="p-0 mb-4"> {/* Removed default padding, added margin */}
                      {cert.hoverImage ? (
                        <div className="relative h-20 w-20 mb-4">
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
                      <CardDescription className="text-base text-muted-foreground mt-1">{cert.issuer}</CardDescription> {/* Increased font size */}
                    </CardHeader>
                    {/* <CardContent className="pt-2"> Optional content </CardContent> */}
                  </Card>
                );
              })}
              {/* Add an empty div as a placeholder to push the last item to the left on lg screens if only 5 items */}
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
                     <Button asChild className="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-900 dark:hover:bg-neutral-900/90 dark:text-neutral-50">
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
                    <Button asChild className="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-900 dark:hover:bg-neutral-900/90 dark:text-neutral-50">
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

    

    