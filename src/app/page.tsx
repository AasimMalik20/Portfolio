import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Mail} from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Aasim Malik</h1>
        <p className="text-lg text-muted-foreground">
          Google Cloud Certified Professional Cloud Architect with expertise in
          designing and implementing scalable, secure cloud solutions.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Professional Summary
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>
              A brief overview of my skills and experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Google Cloud Certified Professional Cloud Architect with expertise
              in designing and implementing scalable, secure cloud solutions.
              Skilled in GCP services, cloud architecture, and infrastructure
              optimization. Proven track record of reducing cloud costs by 15%,
              improving system reliability by 40%, and implementing secure,
              compliant cloud environments. Passionate about leveraging
              cloud-native technologies to drive business transformation and
              innovation.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Project Showcase
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Cloud-Based RAG Application with Llama Index</CardTitle>
              <CardDescription>
                Built a production-ready RAG application using Google Cloud
                Run, Cloud Storage, and Vertex AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Implemented serverless architecture with automatic scaling to
                handle variable workloads efficiently. Designed secure API
                endpoints with Cloud IAM authentication and authorization.
              </p>
              <Button variant="link">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Cloud Data Platform</CardTitle>
              <CardDescription>
                Architected a secure data platform on GCP using BigQuery, Cloud
                Storage, and Data Catalog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Implemented column-level security and data masking for sensitive
                information. Designed data pipelines using Cloud Dataflow for
                efficient ETL processes.
              </p>
              <Button variant="link">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Region Cloud Infrastructure — IBM</CardTitle>
              <CardDescription>
                Designed and implemented a multi-region cloud architecture for
                high availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Created disaster recovery procedures with RPO/RTO targets aligned
                to business requirements. Implemented global load balancing and
                CDN for optimized content delivery.
              </p>
              <Button variant="link">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Contact Information
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Feel free to contact me.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: aasimmalik29@gmail.com</p>
            <p>Phone: +91 9176462019</p>
            <Button>
              <a href="mailto:aasimmalik29@gmail.com" className="flex items-center">
                Contact me <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
