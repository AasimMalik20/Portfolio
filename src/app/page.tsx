// @ts-nocheck - TODO: Fix TS errors
'use client';

import React, { useState } from 'react'; // Import useState
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  ArrowRight,
  Download,
  Cloud,
  Database,
  Layers,
  Container,
  ShipWheel,
  ShieldCheck,
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
  Award,
  MessageSquare,
  User,
  List,
  FolderGit2,
  Sparkles, // Keep Sparkles for Soft Skills
  Lightbulb,
  ChevronLeft, // Import ChevronLeft
  ChevronRight, // Import ChevronRight
  Menu // Import Menu for mobile
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

// Placeholder Logo Component
const Logo = () => (
  <div className="flex items-center gap-2">
    {/* Simple SVG Placeholder - Replace with actual logo if available */}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary" // Use primary color for the logo stroke
    >
      <path
        d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7L12 12M12 12L22 7M12 12V22M12 12L6 9.5M12 12L18 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

// Categorized Skills for improved display (including Soft Skills)
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

// Soft Skills Section Data
const softSkills = [
    'Cloud Architecture & Design',
    'Problem Solving',
    'Cost Optimization Strategies',
    'Performance Tuning & Improvement',
    'Security Implementation & Best Practices',
    'Technical Documentation',
    'Collaboration & Knowledge Sharing',
    'Process Automation (IaC, CI/CD)',
    'Migration Planning & Execution',
    'High Availability & Disaster Recovery',
    'System Reliability Enhancement',
];


// Core Experience Data (For Expertise Section)
const coreExperiences = [
   {
    company: 'ACCENTURE',
    role: 'Associate Software Engineer',
    date: 'PRESENT',
    location: 'Bengaluru, Karnataka'
  },
  {
    company: 'KODE KLOUD ENGINEER (PLATFORM)',
    role: 'Sr Devops Engineer',
    date: 'JAN 2023 - JUL 2023',
    location: 'Remote'
  },
  {
    company: 'KODE KLOUD ENGINEER (PLATFORM)',
    role: 'Devops Engineer',
    date: 'FEB 2022 - DEC 2022',
    location: 'Remote'
  },
  {
    company: 'GOWTH CENTRAL VC',
    role: 'SME Intern',
    date: 'JULY 2022',
    location: 'Remote'
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


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // State for carousel, starts at 0 (latest experience)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? workExperiences.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === workExperiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              HOME
            </a>
            <a
              href="#expertise" // Updated ID
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              EXPERTISE
            </a>
             <a
              href="#work-experience" // Link to detailed experience
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              DETAILS
            </a>
            <a
              href="#skills"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              SKILLS
            </a>
            <a
              href="#projects"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              PROJECTS
            </a>
             <a
              href="#certifications"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              CERTIFICATIONS
            </a>
             <a
              href="#education"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              EDUCATION
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              CONTACT
            </a>
          </nav>
          {/* Mobile Menu Trigger */}
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
             <SheetTrigger asChild className="md:hidden">
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
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="home"
          className="pt-24 pb-16 text-center container mx-auto flex flex-col items-center px-4 md:px-6"
        >
           <Badge
             variant="outline"
             className="mb-4 border-primary/50 text-primary font-medium py-1 px-3 rounded-full text-xs"
           >
             HELLO! I AM AASIM MALIK
           </Badge>
           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 max-w-3xl">
             Cloud Architect & Developer
           </h1>
           <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg mb-12 border-4 border-secondary">
             <Image
               src="https://picsum.photos/400/400?grayscale" // Grayscale placeholder, make it square
               alt="Aasim Malik Portrait"
               layout="fill"
               objectFit="cover"
               className="grayscale" // Ensure grayscale effect
               priority // Load image eagerly as it's above the fold
             />
           </div>

           {/* Download CV Button */}
           <div className="mb-16">
             <Button variant="outline" size="lg" asChild>
               {/* Replace '#' with the actual path to your CV file or URL */}
               <a href="/Aasim_Malik_Resume.pdf" download="Aasim_Malik_CV.pdf">
                 DOWNLOAD CV
                 <Download className="ml-2 h-4 w-4" />
               </a>
             </Button>
           </div>

           {/* Technology Icons Slideshow */}
           <div className="w-full max-w-4xl overflow-hidden pb-4 group"> {/* Added group class */}
              <p className="text-sm text-muted-foreground mb-6">TECHNOLOGIES I WORK WITH</p>
              {/* Outer div for overflow hiding and hover effect */}
             <div className="relative overflow-hidden">
                  {/* Inner div for animation, doubled content */}
                 <div className="flex animate-slideLeft group-hover:pause"> {/* Added animation class and hover pause */}
                     {/* Original Icons */}
                     {[...technologies, ...technologies].map((tech, index) => ( // Duplicate the array
                     <Card
                     key={index} // Use index as key for simplicity here
                     className="p-4 min-w-[100px] min-h-[80px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0" // Added mx-2 and flex-shrink-0
                     title={tech.name} // Tooltip for accessibility
                     >
                     <tech.icon className="h-8 w-8 text-muted-foreground" />
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
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Expertise {/* Updated Title */}
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <Badge
                            variant="outline"
                            className="border-primary/50 text-primary font-medium py-1 px-3 rounded-full text-xs"
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

                    {/* Right Column */}
                    <div className="space-y-8 pt-8 md:pt-0 border-t md:border-t-0 md:border-l md:pl-12 border-border">
                        {coreExperiences.map((exp, index) => (
                            <div key={index}>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{exp.company}</p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                    <h4 className="text-xl font-medium text-foreground">{exp.role}</h4>
                                    <p className="text-sm text-muted-foreground whitespace-nowrap">({exp.date})</p>
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
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Detailed Work Experience
                    </h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                     {/* Use a fixed height container and manage overflow internally */}
                    <div className="relative h-[500px] overflow-visible"> {/* Allow overflow for side cards */}
                        {workExperiences.map((exp, index) => {
                            // Calculate offset relative to the current index
                            let offset = index - currentIndex;
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
                                <div
                                    key={index}
                                    className="absolute inset-0 transition-transform duration-500 ease-out flex justify-center items-center"
                                    style={{
                                        transform: `translateX(${translateX}%) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: zIndex,
                                        pointerEvents: index === currentIndex ? 'auto' : 'none', // Interaction only for current card
                                    }}
                                >
                                    <Card className={cn(
                                        "w-full max-w-2xl shadow-lg border border-border overflow-hidden h-[450px] flex flex-col", // Fixed height and flex col
                                        "bg-gradient-to-br from-background to-secondary/30", // Subtle gradient background
                                        index !== currentIndex && "blur-[1px]" // Slightly blur non-active cards
                                    )}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <CardTitle>{exp.title}</CardTitle>
                                                    <CardDescription className="text-primary font-medium">
                                                        {exp.company}
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="outline">{exp.date}</Badge>
                                            </div>
                                            <CardDescription className="pt-1">{exp.location}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow overflow-y-auto scrollbar-hide"> {/* Make content scrollable */}
                                            <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
                                                {exp.points.map((point, pIndex) => (
                                                    <li key={pIndex}>{point}</li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80" // Added background for visibility
                        onClick={handlePrev}
                        aria-label="Previous Experience"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80" // Added background for visibility
                        onClick={handleNext}
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
                    <List className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-semibold tracking-tight text-center">
                        Skills & Expertise
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> {/* Changed grid to 2 columns */}
                    {/* Technical Skills Card */}
                    <Card className="shadow-md border border-border bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                           <CardTitle className="text-center text-2xl font-semibold flex items-center justify-center gap-2">
                              <Terminal className="h-5 w-5" /> {/* Technical icon */}
                              Technical Skills
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                                {Object.entries(categorizedSkills).map(([category, skills], catIndex) => (
                                    <div key={catIndex} className="space-y-4">
                                        <h3 className="text-lg font-medium text-foreground border-b border-border pb-2 mb-3">
                                            {category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {skills.map((skill, skillIndex) => (
                                                <li key={skillIndex} className="flex items-center text-sm text-muted-foreground">
                                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Soft Skills Card */}
                     <Card className="shadow-md border border-border bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold flex items-center justify-center gap-2">
                                <Sparkles className="h-5 w-5" /> {/* Soft skills icon */}
                                Core Competencies
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <ul className="space-y-3">
                                {softSkills.map((skill, index) => (
                                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2.5 flex-shrink-0 border border-primary/30"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        {/* Projects Section */}
        <section id="projects" className="py-16 bg-background"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center gap-2 mb-12">
                 <FolderGit2 className="h-6 w-6 text-primary" />
                 <h2 className="text-3xl font-semibold tracking-tight text-center">
                  Project Showcase
                 </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {/* Project 1 */}
              <Card className="shadow-sm border border-border flex flex-col">
                <CardHeader>
                  <CardTitle>
                    Cloud-Based RAG Application with Llama Index
                  </CardTitle>
                   <CardDescription>Apr 2024 - May 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-1 text-sm leading-relaxed">
                    <li>Built a production-ready RAG application using Google Cloud Run, Cloud Storage, and Vertex AI.</li>
                    <li>Implemented serverless architecture with automatic scaling to handle variable workloads efficiently.</li>
                    <li>Designed secure API endpoints with Cloud IAM authentication and authorization.</li>
                    <li>Optimized cloud resource usage to minimize costs while maintaining high performance.</li>
                     <li>Utilized Google Cloud Monitoring for comprehensive application observability.</li>
                  </ul>
                   <div className="mt-4 flex flex-wrap gap-1">
                       <Badge variant="outline" className="text-xs">GCP</Badge>
                       <Badge variant="outline" className="text-xs">Cloud Run</Badge>
                       <Badge variant="outline" className="text-xs">Cloud Storage</Badge>
                       <Badge variant="outline" className="text-xs">Vertex AI</Badge>
                       <Badge variant="outline" className="text-xs">Serverless</Badge>
                       <Badge variant="outline" className="text-xs">Python</Badge>
                       <Badge variant="outline" className="text-xs">Llama Index</Badge>
                   </div>
                </CardContent>
                 {/* Optional Links */}
                 {/* <CardFooter className="pt-4 flex gap-2">
                    <Button variant="link" size="sm" asChild>
                       <a href="#" target="_blank" rel="noopener noreferrer">
                          GitHub <Github className="ml-1 h-3 w-3" />
                       </a>
                    </Button>
                 </CardFooter> */}
              </Card>

              {/* Project 2 */}
              <Card className="shadow-sm border border-border flex flex-col">
                <CardHeader>
                  <CardTitle>Secure Cloud Data Platform</CardTitle>
                  <CardDescription>Dec 2022 - Feb 2023</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-1 text-sm leading-relaxed">
                    <li>Architected a secure data platform on GCP using BigQuery, Cloud Storage, and Data Catalog.</li>
                    <li>Implemented column-level security and data masking for sensitive information.</li>
                    <li>Designed data pipelines using Cloud Dataflow for efficient ETL processes.</li>
                    <li>Created comprehensive data governance framework compliant with industry regulations.</li>
                    <li>Reduced data processing costs by 35% through query optimization and storage tiering.</li>
                  </ul>
                   <div className="mt-4 flex flex-wrap gap-1">
                       <Badge variant="outline" className="text-xs">GCP</Badge>
                       <Badge variant="outline" className="text-xs">BigQuery</Badge>
                       <Badge variant="outline" className="text-xs">Cloud Storage</Badge>
                       <Badge variant="outline" className="text-xs">Data Catalog</Badge>
                       <Badge variant="outline" className="text-xs">Dataflow</Badge>
                       <Badge variant="outline" className="text-xs">Security</Badge>
                       <Badge variant="outline" className="text-xs">Governance</Badge>
                   </div>
                </CardContent>
                 {/* Optional Links */}
                 {/* <CardFooter className="pt-4 flex gap-2">
                    <Button variant="link" size="sm" asChild>
                       <a href="#" target="_blank" rel="noopener noreferrer">
                          GitHub <Github className="ml-1 h-3 w-3" />
                       </a>
                    </Button>
                 </CardFooter> */}
              </Card>

               {/* Project 3 */}
              <Card className="shadow-sm border border-border flex flex-col">
                <CardHeader>
                  <CardTitle>Multi-Region Cloud Infrastructure</CardTitle>
                  <CardDescription>Jul 2022 - Nov 2022 (Client: IBM)</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-1 text-sm leading-relaxed">
                    <li>Designed and implemented a multi-region cloud architecture for high availability.</li>
                    <li>Created disaster recovery procedures with RPO/RTO targets aligned to business requirements.</li>
                    <li>Implemented global load balancing and CDN for optimized content delivery.</li>
                    <li>Established monitoring and alerting across regions with centralized logging.</li>
                    <li>Achieved 99.99% uptime for critical business applications.</li>
                   </ul>
                    <div className="mt-4 flex flex-wrap gap-1">
                       <Badge variant="outline" className="text-xs">Cloud Architecture</Badge>
                       <Badge variant="outline" className="text-xs">High Availability</Badge>
                       <Badge variant="outline" className="text-xs">Disaster Recovery</Badge>
                       <Badge variant="outline" className="text-xs">Load Balancing</Badge>
                       <Badge variant="outline" className="text-xs">CDN</Badge>
                       <Badge variant="outline" className="text-xs">Monitoring</Badge>
                   </div>
                </CardContent>
                 {/* Optional Links */}
                 {/* <CardFooter className="pt-4 flex gap-2">
                    <Button variant="link" size="sm" asChild>
                       <a href="#" target="_blank" rel="noopener noreferrer">
                          GitHub <Github className="ml-1 h-3 w-3" />
                       </a>
                    </Button>
                 </CardFooter> */}
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-16 bg-secondary"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-12">
                 <Award className="h-6 w-6 text-primary" />
                 <h2 className="text-3xl font-semibold tracking-tight text-center">
                  Certifications
                 </h2>
             </div>
            <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
              {/* Certification 1 */}
              <Card className="shadow-sm border border-border">
                <CardHeader>
                   <div className="flex items-center gap-3">
                      <Cloud className="h-6 w-6 text-primary" />
                      <div>
                         <CardTitle className="text-lg">Professional Cloud Architect</CardTitle>
                         <CardDescription>Google Cloud</CardDescription>
                      </div>
                   </div>
                </CardHeader>
              </Card>
              {/* Certification 2 */}
               <Card className="shadow-sm border border-border">
                <CardHeader>
                   <div className="flex items-center gap-3">
                      <Cloud className="h-6 w-6 text-primary" />
                      <div>
                         <CardTitle className="text-lg">Associate Cloud Engineer</CardTitle>
                         <CardDescription>Google Cloud</CardDescription>
                       </div>
                   </div>
                </CardHeader>
              </Card>
               {/* Certification 3 */}
               <Card className="shadow-sm border border-border">
                 <CardHeader>
                    <div className="flex items-center gap-3">
                       <Database className="h-6 w-6 text-primary" /> {/* Using Database for Oracle */}
                       <div>
                          <CardTitle className="text-lg">Oracle Cloud Infrastructure Generative AI Professional</CardTitle>
                          <CardDescription>Oracle</CardDescription>
                       </div>
                    </div>
                 </CardHeader>
              </Card>
               {/* Certification 4 */}
                <Card className="shadow-sm border border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                       <Database className="h-6 w-6 text-primary" /> {/* Using Database for Oracle */}
                       <div>
                          <CardTitle className="text-lg">Oracle Cloud Infrastructure 2023 Certified Foundations Associate</CardTitle>
                          <CardDescription>Oracle (1Z0-1085-23)</CardDescription>
                       </div>
                    </div>
                 </CardHeader>
              </Card>
               {/* Certification 5 */}
                <Card className="shadow-sm border border-border">
                  <CardHeader>
                     <div className="flex items-center gap-3">
                       <ShieldCheck className="h-6 w-6 text-primary" /> {/* Using ShieldCheck for Cisco */}
                       <div>
                          <CardTitle className="text-lg">Cybersecurity Essentials</CardTitle>
                          <CardDescription>Cisco</CardDescription>
                        </div>
                     </div>
                  </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 bg-background"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <School className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                 Education
                </h2>
             </div>
            <Card className="max-w-3xl mx-auto shadow-sm border border-border">
              <CardHeader>
                 <div className="flex justify-between items-start flex-wrap gap-2">
                     <div className="flex items-center gap-3">
                         <GraduationCap className="h-6 w-6 text-primary" />
                         <div>
                            <CardTitle>B.E Computer Science and Engineering</CardTitle>
                            <CardDescription className="text-primary font-medium">
                                St. Joseph's College of Engineering
                            </CardDescription>
                         </div>
                     </div>
                     <Badge variant="outline">Graduated May 2023</Badge>
                 </div>
                 <CardDescription className="pt-2 pl-9">
                    Chennai, Tamil Nadu
                 </CardDescription>
              </CardHeader>
              {/* Optional: Add GPA or relevant coursework if desired */}
              {/* <CardContent><p className="text-sm text-muted-foreground pl-9">Relevant Coursework: ...</p></CardContent> */}
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-secondary"> {/* Changed bg for alternation */}
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                 Contact Me
                </h2>
             </div>
            <Card className="max-w-xl mx-auto shadow-md border border-border">
              <CardHeader className="text-center">
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Let's connect! Feel free to reach out.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                 <div className="text-center text-muted-foreground space-y-1">
                    <p>Srinagar, J&K, India</p>
                    <p>
                       <a href="mailto:aasimmalik29@gmail.com" className="hover:text-primary transition-colors">
                          aasimmalik29@gmail.com
                       </a>
                    </p>
                    <p>
                       <a href="tel:+919176462019" className="hover:text-primary transition-colors">
                         +91 9176462019
                       </a>
                    </p>
                 </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <Button variant="default" asChild>
                      <a
                        href="mailto:aasimmalik29@gmail.com"
                        className="flex items-center"
                      >
                        Send Email <Mail className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                        {/* Ensure LinkedIn URL is correct */}
                        <a href="https://www.linkedin.com/in/aasim-malik-b6a008224/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </a>
                    </Button>
                     <Button variant="outline" asChild>
                         {/* Ensure GitHub URL is correct */}
                        <a href="https://github.com/aasimmalik29" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Github className="mr-2 h-4 w-4" /> GitHub
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
