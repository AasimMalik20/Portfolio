'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Mail, ArrowRight} from 'lucide-react'; // Removed Mic import
import Image from 'next/image';

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
    <span className="text-xl font-semibold">Aasim Malik</span>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background z-50 py-4 border-b border-border">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm font-medium hover:text-primary">
              HOME
            </a>
            <a
              href="#skills"
              className="text-sm font-medium hover:text-primary"
            >
              EXPERTISE
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-primary"
            >
              PROJECTS {/* Changed from CASE STUDY */}
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-primary"
            >
              CONTACT
            </a>
          </nav>
          {/* Removed the div containing Book A Call and Mic buttons */}
          {/* Add mobile menu trigger here if needed */}
        </div>
      </header>

      <main className="flex-grow">
        <section
          id="home"
          className="pt-24 pb-16 text-center container mx-auto flex flex-col items-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary text-primary font-medium py-1 px-3 rounded-full"
          >
            HELLO! I AM AASIM MALIK
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-8 max-w-3xl">
            Cloud Architect & Developer
          </h1>
          <div className="relative w-full max-w-md h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://picsum.photos/400/600?grayscale" // Placeholder image, potentially grayscale
              alt="Aasim Malik Portrait"
              layout="fill"
              objectFit="cover"
              priority // Load image eagerly as it's above the fold
            />
          </div>
        </section>

        <section id="professional-summary" className="py-16 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Professional Summary
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>
                  An overview of my skills and experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
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

        <section id="work-experience" className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Work Experience
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>Google</CardTitle>
                <CardDescription>Cloud Architect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designed and implemented cloud solutions for enterprise
                  clients. Reduced cloud costs by 15% and improved system
                  reliability by 40%.
                </p>
              </CardContent>
            </Card>
            {/* Add more work experience cards as needed */}
          </div>
        </section>

        <section id="skills" className="py-16 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Skills & Expertise
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>
                  My areas of technical proficiency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Google Cloud Platform (GCP) Services</li>
                  <li>Cloud Architecture & Design</li>
                  <li>Infrastructure Optimization & Cost Management</li>
                  <li>Data Pipelines (Dataflow, Pub/Sub)</li>
                  <li>Serverless Computing (Cloud Run, Cloud Functions)</li>
                  <li>Kubernetes Engine (GKE)</li>
                  <li>Infrastructure as Code (Terraform)</li>
                  <li>CI/CD Pipelines</li>
                  <li>Security & Compliance on Cloud</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Project Showcase
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-md flex flex-col">
                <CardHeader>
                  <CardTitle>
                    Cloud-Based RAG Application with Llama Index
                  </CardTitle>
                  <CardDescription>
                    Production-ready RAG app using Cloud Run, Storage, Vertex
                    AI.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Implemented serverless architecture with automatic scaling.
                    Designed secure API endpoints with Cloud IAM.
                  </p>
                </CardContent>
                <CardContent>
                  <Button variant="link" asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md flex flex-col">
                <CardHeader>
                  <CardTitle>Secure Cloud Data Platform</CardTitle>
                  <CardDescription>
                    Architected a secure data platform using BigQuery, Cloud
                    Storage, Data Catalog.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Implemented column-level security and data masking. Designed
                    efficient ETL pipelines using Cloud Dataflow.
                  </p>
                </CardContent>
                <CardContent>
                  <Button variant="link" asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md flex flex-col">
                <CardHeader>
                  <CardTitle>Multi-Region Cloud Infrastructure</CardTitle>
                  <CardDescription>
                    Designed HA multi-region architecture for IBM Cloud (example).
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    Created DR procedures aligning RPO/RTO with business needs.
                    Implemented global load balancing and CDN.
                  </p>
                </CardContent>
                <CardContent>
                  <Button variant="link" asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-16 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Certifications
            </h2>
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>
                  Google Cloud Certified - Professional Cloud Architect
                </CardTitle>
                <CardDescription>Validation Date: [Insert Date]</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Demonstrates the ability to design, develop, and manage
                  robust, secure, scalable, highly available, and dynamic
                  solutions to drive business objectives.
                </p>
                {/* Add link to certification badge if available */}
              </CardContent>
            </Card>
             {/* Add more certification cards as needed */}
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">
              Contact Me
            </h2>
            <Card className="max-w-xl mx-auto shadow-md">
              <CardHeader className="text-center">
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Interested in collaborating? Reach out!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <p className="text-muted-foreground">
                  Email: aasimmalik29@gmail.com
                </p>
                <p className="text-muted-foreground">Phone: +91 9176462019</p>
                <Button asChild>
                  <a
                    href="mailto:aasimmalik29@gmail.com"
                    className="flex items-center"
                  >
                    Send Email <Mail className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border mt-16">
          <div className="container mx-auto text-center text-muted-foreground text-sm">
              © {new Date().getFullYear()} Aasim Malik. All rights reserved.
          </div>
      </footer>
    </div>
  );
}
