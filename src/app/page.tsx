'use client';

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
  Linkedin, // Added LinkedIn
  Github, // Added GitHub
  School, // Added School for Education
  GraduationCap, // Added GraduationCap for Education
  Briefcase, // Added Briefcase for Work Experience
  Award, // Added Award for Certifications
  MessageSquare, // Added MessageSquare for Contact
  User, // Added User for Summary
  List, // Added List for Skills
  FolderGit2, // Added FolderGit2 for Projects
} from 'lucide-react'; // Added more icons
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react'; // Import LucideIcon type

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

// Extract skills from resume for the Skills section
const skillsList = [
  // Cloud Platforms
  'Google Cloud Platform (GCP)', 'Oracle Cloud Infrastructure',
  // Cloud Services
  'Compute Engine', 'Cloud Storage', 'Cloud SQL', 'BigQuery', 'Cloud Functions', 'Pub/Sub', 'Cloud Run',
  // Infrastructure as Code
  'Terraform', 'Google Cloud Deployment Manager',
  // Containerization
  'Docker', 'Kubernetes', 'Google Kubernetes Engine (GKE)',
  // Security & Compliance
  'IAM', 'VPC Service Controls', 'Cloud Security Command Center', 'Data Encryption',
  // Networking
  'VPC', 'Cloud Load Balancing', 'Cloud CDN', 'Cloud Interconnect', 'Cloud DNS',
  // Database Systems
  'Cloud SQL', 'Cloud Spanner', 'Firestore', 'Bigtable', 'BigQuery',
  // Monitoring & Analytics
  'Cloud Monitoring', 'Cloud Logging', 'Error Reporting', 'Cloud Trace',
  // Scripting & Programming
  'Python', 'Bash',
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              HOME
            </a>
            <a
              href="#professional-summary"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              SUMMARY
            </a>
            <a
              href="#work-experience"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              EXPERIENCE
            </a>
            <a
              href="#skills"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              SKILLS {/* Updated from EXPERTISE */}
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
          {/* Mobile Menu Trigger (Optional) */}
          <button className="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>

      <main className="flex-grow">
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
              {/* Replace '#' with the actual path to your CV file */}
              <a href="/aasim_malik_cv.pdf" download="Aasim_Malik_CV.pdf">
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

        <section id="professional-summary" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                Professional Summary
                </h2>
            </div>
            <Card className="max-w-3xl mx-auto shadow-md border border-border">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                 {/* Removed unnecessary description */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Google Cloud Certified Professional Cloud Architect with expertise in designing and implementing scalable, secure cloud
                  solutions. Skilled in GCP services, cloud architecture, and infrastructure optimization. Proven track record of reducing cloud
                  costs by 15%, improving system reliability by 40%, and implementing secure, compliant cloud environments. Passionate
                  about leveraging cloud-native technologies to drive business transformation and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="work-experience" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-12">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                Work Experience
                </h2>
             </div>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Experience 1: Accenture */}
              <Card className="shadow-sm border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle>Associate Software Engineer</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        Accenture
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Jul 2023 - Present</Badge>
                  </div>
                   <CardDescription className="pt-1">Bengaluru, Karnataka</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
                    <li>Architected multi-region GCP environments with 99.9% uptime, implementing infrastructure as code using Terraform for consistent, repeatable deployments.</li>
                    <li>Designed and implemented cloud-native solutions using GCP services including Compute Engine, Cloud Storage, Cloud SQL, and Pub/Sub.</li>
                    <li>Reduced cloud infrastructure costs by 15% through resource optimization, right-sizing, and implementing automated scaling policies.</li>
                    <li>Implemented comprehensive monitoring solutions using Google Cloud Monitoring, reducing MTTR by 25% through improved observability.</li>
                    <li>Managed high-availability database services on GCP including Cloud SQL and Firestore, ensuring data integrity and performance optimization.</li>
                    <li>Established security best practices including IAM role-based access control, VPC Service Controls, and encryption for data at rest and in transit.</li>
                     <li>Created detailed cloud architecture documentation and runbooks, enabling knowledge sharing and faster onboarding of new team members.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Experience 2: Kode Kloud (Sr) */}
               <Card className="shadow-sm border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle>Sr Devops Engineer</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        Kode Kloud Engineer (Platform)
                      </CardDescription>
                    </div>
                     <Badge variant="outline">Jan 2023 - Jul 2023</Badge>
                  </div>
                   <CardDescription className="pt-1">Remote</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
                     <li>Designed and implemented cloud-native architectures on GCP, improving scalability and reducing operational costs by 20%.</li>
                     <li>Migrated on-premises applications to Google Cloud Platform, resulting in 35% cost savings and 40% improved performance.</li>
                     <li>Implemented disaster recovery solutions with automated failover capabilities, reducing recovery time objectives (RTO) from hours to minutes.</li>
                     <li>Designed secure cloud networking architectures using VPC, Cloud Load Balancing, and Cloud Interconnect for enterprise applications.</li>
                     <li>Optimized BigQuery data warehousing solutions, reducing query times by 45% and storage costs by 30%.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Experience 3: Kode Kloud */}
               <Card className="shadow-sm border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle>Devops Engineer</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        Kode Kloud Engineer (Platform)
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Feb 2022 - Dec 2022</Badge>
                  </div>
                   <CardDescription className="pt-1">Remote</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-2 text-sm leading-relaxed">
                     <li>Orchestrated migration of legacy infrastructure to Google Cloud Platform, reducing operational costs by 40% and enhancing system scalability.</li>
                     <li>Implemented serverless architectures using Cloud Functions and Cloud Run, reducing infrastructure management overhead by 60%.</li>
                     <li>Designed and deployed data analytics pipelines using BigQuery, Dataflow, and Data Studio, enabling real-time business insights.</li>
                     <li>Created CI/CD pipelines for cloud-native applications, reducing deployment time by 50% and improving release reliability.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex justify-center items-center gap-2 mb-8">
                <List className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                Skills & Expertise {/* Keep title matching nav */}
                </h2>
            </div>
            <Card className="max-w-3xl mx-auto shadow-md border border-border">
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                {/* Removed unnecessary description */}
              </CardHeader>
              <CardContent>
                 <div className="flex flex-wrap gap-2">
                   {skillsList.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                   ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center gap-2 mb-12">
                 <FolderGit2 className="h-6 w-6 text-primary" />
                 <h2 className="text-3xl font-semibold tracking-tight text-center">
                 Project Showcase
                 </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2"> {/* Adjusted grid for potentially fewer projects */}
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
                {/* Add GitHub/Live Demo links if applicable - Keeping structure */}
                 {/* <CardContent className="pt-4 flex gap-2">
                   <Button variant="link" size="sm" asChild>
                     <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # */}
                     {/*  GitHub <Github className="ml-1 h-3 w-3" />
                     </a>
                   </Button>
                 </CardContent> */}
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
                 {/* <CardContent className="pt-4 flex gap-2">
                    <Button variant="link" size="sm" asChild>
                       <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # */}
                          {/* GitHub <Github className="ml-1 h-3 w-3" />
                       </a>
                    </Button>
                 </CardContent> */}
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
                       <Badge variant="outline" className="text-xs">Cloud Architecture</Badge> {/* Generic as platform not specified for IBM */}
                       <Badge variant="outline" className="text-xs">High Availability</Badge>
                       <Badge variant="outline" className="text-xs">Disaster Recovery</Badge>
                       <Badge variant="outline" className="text-xs">Load Balancing</Badge>
                       <Badge variant="outline" className="text-xs">CDN</Badge>
                       <Badge variant="outline" className="text-xs">Monitoring</Badge>
                   </div>
                </CardContent>
                 {/* <CardContent className="pt-4 flex gap-2">
                    <Button variant="link" size="sm" asChild>
                       <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # */}
                          {/* GitHub <Github className="ml-1 h-3 w-3" />
                       </a>
                    </Button>
                 </CardContent> */}
              </Card>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-16 bg-secondary">
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
        <section id="education" className="py-16 bg-background">
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
                         <GraduationCap className="h-6 w-6 text-primary" /> {/* Use GraduationCap */}
                         <div>
                            <CardTitle>B.E Computer Science and Engineering</CardTitle>
                            <CardDescription className="text-primary font-medium">
                                St. Joseph's College of Engineering
                            </CardDescription>
                         </div>
                     </div>
                     <Badge variant="outline">Graduated May 2023</Badge>
                 </div>
                 <CardDescription className="pt-2 pl-9"> {/* Indent description */}
                    Chennai, Tamil Nadu
                 </CardDescription>
              </CardHeader>
              {/* Optional: Add GPA or relevant coursework if desired */}
              {/* <CardContent><p className="text-sm text-muted-foreground pl-9">Relevant Coursework: ...</p></CardContent> */}
            </Card>
          </div>
        </section>


        <section id="contact" className="py-16 bg-secondary">
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
                        <a href="https://www.linkedin.com/in/aasim-malik-/" target="_blank" rel="noopener noreferrer" className="flex items-center"> {/* Updated LinkedIn URL */}
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="https://github.com/aasimmalik29" target="_blank" rel="noopener noreferrer" className="flex items-center"> {/* Updated GitHub URL */}
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                    </Button>
                    {/* Add Portfolio link from resume */}
                     {/* <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # with Portfolio URL */}
                            {/* Portfolio
                        </a>
                    </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border mt-16 bg-background">
        <div className="container mx-auto text-center text-muted-foreground text-xs px-4 md:px-6">
          © {new Date().getFullYear()} Aasim Malik. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
