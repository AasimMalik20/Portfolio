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
} from 'lucide-react'; // Added Download and technology icons
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

// Define Technology Icons
const technologies: { name: string; icon: LucideIcon }[] = [
  { name: 'GCP', icon: Cloud },
  { name: 'OCI', icon: Database }, // Using Database as a proxy for Oracle Cloud
  { name: 'Terraform', icon: Layers },
  { name: 'Docker', icon: Container },
  { name: 'Kubernetes/GKE', icon: ShipWheel },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Networking', icon: Network },
  { name: 'Databases', icon: DatabaseZap },
  { name: 'Monitoring', icon: Activity },
  { name: 'Python', icon: Code },
  { name: 'Bash', icon: Terminal },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 bg-background z-50 py-4 border-b border-border">
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
              EXPERTISE
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
          <div className="w-full max-w-4xl overflow-hidden pb-4">
             <p className="text-sm text-muted-foreground mb-6">TECHNOLOGIES I WORK WITH</p>
            <div
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide" // scrollbar-hide is a custom utility needed or use a plugin
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar standard CSS
            >
              {technologies.map((tech, index) => (
                <Card
                  key={index}
                  className="p-4 min-w-[80px] min-h-[80px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow"
                  title={tech.name} // Tooltip for accessibility
                >
                  <tech.icon className="h-8 w-8 text-muted-foreground" />
                </Card>
              ))}
              {/* Add duplicates for infinite scroll illusion if needed */}
               {technologies.map((tech, index) => (
                <Card
                  key={`duplicate-${index}`}
                  className="p-4 min-w-[80px] min-h-[80px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow"
                   aria-hidden="true" // Hide duplicates from screen readers
                >
                  <tech.icon className="h-8 w-8 text-muted-foreground" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="professional-summary" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Professional Summary
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md border border-border">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>
                  An overview of my skills and experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Google Cloud Certified Professional Cloud Architect with
                  expertise in designing and implementing scalable, secure
                  cloud solutions. Skilled in GCP services, cloud architecture,
                  and infrastructure optimization. Proven track record of
                  reducing cloud costs by 15%, improving system reliability by
                  40%, and implementing secure, compliant cloud environments.
                  Passionate about leveraging cloud-native technologies to drive
                  business transformation and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="work-experience" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-12 text-center">
              Work Experience
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Experience 1: Accenture */}
              <Card className="shadow-sm border border-border">
                <CardHeader>
                  <div className="flex justify-between items-start">
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
                  <div className="flex justify-between items-start">
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
                  <div className="flex justify-between items-start">
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
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Skills & Expertise
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md border border-border">
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>
                  My areas of technical proficiency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex flex-wrap gap-2">
                   {/* Cloud Platforms */}
                   <Badge variant="secondary">Google Cloud Platform (GCP)</Badge>
                   <Badge variant="secondary">Oracle Cloud Infrastructure (OCI)</Badge>
                   {/* Cloud Services */}
                   <Badge variant="secondary">Compute Engine</Badge>
                   <Badge variant="secondary">Cloud Storage</Badge>
                   <Badge variant="secondary">Cloud SQL</Badge>
                   <Badge variant="secondary">BigQuery</Badge>
                   <Badge variant="secondary">Cloud Functions</Badge>
                   <Badge variant="secondary">Pub/Sub</Badge>
                   <Badge variant="secondary">Cloud Run</Badge>
                   {/* IaC */}
                   <Badge variant="secondary">Terraform</Badge>
                   <Badge variant="secondary">Cloud Deployment Manager</Badge>
                   {/* Containerization */}
                   <Badge variant="secondary">Docker</Badge>
                   <Badge variant="secondary">Kubernetes</Badge>
                   <Badge variant="secondary">Google Kubernetes Engine (GKE)</Badge>
                   {/* Security */}
                   <Badge variant="secondary">IAM</Badge>
                   <Badge variant="secondary">VPC Service Controls</Badge>
                   <Badge variant="secondary">Cloud Security Command Center</Badge>
                   <Badge variant="secondary">Data Encryption</Badge>
                   {/* Networking */}
                   <Badge variant="secondary">VPC</Badge>
                   <Badge variant="secondary">Cloud Load Balancing</Badge>
                   <Badge variant="secondary">Cloud CDN</Badge>
                   <Badge variant="secondary">Cloud Interconnect</Badge>
                   <Badge variant="secondary">Cloud DNS</Badge>
                   {/* Databases */}
                   <Badge variant="secondary">Cloud SQL</Badge>
                   <Badge variant="secondary">Cloud Spanner</Badge>
                   <Badge variant="secondary">Firestore</Badge>
                   <Badge variant="secondary">Bigtable</Badge>
                   {/* Monitoring & Analytics */}
                   <Badge variant="secondary">Cloud Monitoring</Badge>
                   <Badge variant="secondary">Cloud Logging</Badge>
                   <Badge variant="secondary">Error Reporting</Badge>
                   <Badge variant="secondary">Cloud Trace</Badge>
                   {/* Scripting */}
                   <Badge variant="secondary">Python</Badge>
                   <Badge variant="secondary">Bash</Badge>
                 </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-12 text-center">
              Project Showcase
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    <li>Implemented serverless architecture with automatic scaling.</li>
                    <li>Designed secure API endpoints with Cloud IAM authentication.</li>
                    <li>Optimized cloud resource usage for cost-effectiveness.</li>
                     <li>Utilized Google Cloud Monitoring for observability.</li>
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
                <CardContent>
                  {/* Add GitHub link if available */}
                  {/* <Button variant="link" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      View on GitHub <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button> */}
                </CardContent>
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
                    <li>Implemented column-level security and data masking.</li>
                    <li>Designed data pipelines using Cloud Dataflow for ETL.</li>
                    <li>Created data governance framework compliant with regulations.</li>
                    <li>Reduced data processing costs by 35% through optimization.</li>
                  </ul>
                   <div className="mt-4 flex flex-wrap gap-1">
                       <Badge variant="outline" className="text-xs">GCP</Badge>
                       <Badge variant="outline" className="text-xs">BigQuery</Badge>
                       <Badge variant="outline" className="text-xs">Cloud Storage</Badge>
                       <Badge variant="outline" className="text-xs">Data Catalog</Badge>
                       <Badge variant="outline" className="text-xs">Dataflow</Badge>
                       <Badge variant="outline" className="text-xs">Security</Badge>
                   </div>
                </CardContent>
                 <CardContent>
                    {/* Add GitHub link if available */}
                 </CardContent>
              </Card>

               {/* Project 3 */}
              <Card className="shadow-sm border border-border flex flex-col">
                <CardHeader>
                  <CardTitle>Multi-Region Cloud Infrastructure</CardTitle>
                  <CardDescription>Jul 2022 - Nov 2022 (for IBM)</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-1 text-sm leading-relaxed">
                    <li>Designed and implemented a multi-region cloud architecture for high availability.</li>
                    <li>Created disaster recovery procedures with defined RPO/RTO targets.</li>
                    <li>Implemented global load balancing and CDN.</li>
                    <li>Established monitoring and alerting across regions.</li>
                    <li>Achieved 99.99% uptime for critical applications.</li>
                   </ul>
                    <div className="mt-4 flex flex-wrap gap-1">
                       <Badge variant="outline" className="text-xs">GCP</Badge> {/* Or specify IBM Cloud if that was the platform */}
                       <Badge variant="outline" className="text-xs">High Availability</Badge>
                       <Badge variant="outline" className="text-xs">Disaster Recovery</Badge>
                       <Badge variant="outline" className="text-xs">Load Balancing</Badge>
                       <Badge variant="outline" className="text-xs">CDN</Badge>
                       <Badge variant="outline" className="text-xs">Monitoring</Badge>
                   </div>
                </CardContent>
                 <CardContent>
                   {/* Add GitHub link if available */}
                 </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-12 text-center">
              Certifications
            </h2>
            <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
              {/* Certification 1 */}
              <Card className="shadow-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Professional Cloud Architect</CardTitle>
                  <CardDescription>Google Cloud</CardDescription>
                </CardHeader>
                 {/* Optional: Add link/details */}
                 {/* <CardContent><p className="text-xs text-muted-foreground">Validation: [Link/ID]</p></CardContent> */}
              </Card>
              {/* Certification 2 */}
               <Card className="shadow-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Associate Cloud Engineer</CardTitle>
                  <CardDescription>Google Cloud</CardDescription>
                </CardHeader>
              </Card>
               {/* Certification 3 */}
               <Card className="shadow-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">OCI Generative AI Professional</CardTitle>
                  <CardDescription>Oracle</CardDescription>
                </CardHeader>
              </Card>
               {/* Certification 4 */}
                <Card className="shadow-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">OCI Foundations Associate</CardTitle>
                   <CardDescription>Oracle (1Z0-1085-23)</CardDescription>
                </CardHeader>
              </Card>
               {/* Certification 5 */}
                <Card className="shadow-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Cybersecurity Essentials</CardTitle>
                  <CardDescription>Cisco</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Education
            </h2>
            <Card className="max-w-3xl mx-auto shadow-sm border border-border">
              <CardHeader>
                 <div className="flex justify-between items-start">
                     <div>
                        <CardTitle>B.E Computer Science and Engineering</CardTitle>
                        <CardDescription className="text-primary font-medium">
                            St. Joseph's College of Engineering
                        </CardDescription>
                     </div>
                     <Badge variant="outline">Graduated May 2023</Badge>
                 </div>
                 <CardDescription className="pt-1">Chennai, Tamil Nadu</CardDescription>
              </CardHeader>
              {/* Optional: Add GPA or relevant coursework if desired */}
              {/* <CardContent><p className="text-sm text-muted-foreground">Relevant Coursework: ...</p></CardContent> */}
            </Card>
          </div>
        </section>


        <section id="contact" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Contact Me
            </h2>
            <Card className="max-w-xl mx-auto shadow-md border border-border">
              <CardHeader className="text-center">
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Interested in collaborating or have questions? Reach out!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                 <div className="text-center text-muted-foreground">
                    <p>Srinagar, J&K, India</p>
                    <p>Email: aasimmalik29@gmail.com</p>
                    <p>Phone: +91 9176462019</p>
                 </div>
                <div className="flex space-x-4 mt-4">
                    <Button variant="default" asChild>
                      <a
                        href="mailto:aasimmalik29@gmail.com"
                        className="flex items-center"
                      >
                        Send Email <Mail className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="https://www.linkedin.com/in/aasim-malik-/" target="_blank" rel="noopener noreferrer"> {/* Replace with actual LinkedIn URL */}
                            LinkedIn
                        </a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="https://github.com/aasimmalik29" target="_blank" rel="noopener noreferrer"> {/* Replace with actual GitHub URL */}
                            GitHub
                        </a>
                    </Button>
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
