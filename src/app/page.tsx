import { HomeClient, type HomeSection } from '@/components/HomeClient'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { PostsSection } from '@/components/sections/PostsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { fetchGitHubMeta } from '@/lib/github'
import {
  selectCaseStudies,
  selectCapabilities,
  selectStandaloneProjects,
  shouldShowPosts,
} from '@/lib/portfolio-content'
import { fetchAllSheetData } from '@/lib/sheets'
import { getSiteCopyValue } from '@/lib/site-copy'
import { buildJsonLd, resolveSiteUrl } from '@/lib/site-metadata'

export const revalidate = 300

export default async function Home() {
  const data = await fetchAllSheetData()
  const caseStudies = selectCaseStudies(data.caseStudies)
  const selectedExperience = data.experience.filter(
    entry => entry.company.trim() && entry.role.trim(),
  )
  const selectedSkills = data.skills.filter(skill => skill.name.trim())
  const selectedCertifications = data.certifications.filter(
    certification => certification.name.trim(),
  )
  const projects = await Promise.all(
    selectStandaloneProjects(data.projects)
      .map(async project => ({
        ...project,
        github: project.repo_url ? await fetchGitHubMeta(project.repo_url) : undefined,
      })),
  )
  const services = data.services.filter(service =>
      service.name.trim() &&
      (service.description.trim() || (service.cta_text && service.cta_url)),
  )
  const stack = data.stack.filter(item => item.name.trim())
  const capabilities = selectCapabilities(selectedSkills, stack)
  const processSteps = data.process.filter(step => step.title.trim())
  const showPosts = shouldShowPosts(data.posts)
  const copy = data.siteCopy
  const jsonLd = buildJsonLd({
    name: data.settings.name,
    description: getSiteCopyValue(copy, 'site_description') ?? data.settings.hero_text,
    url: resolveSiteUrl(data.settings.site_url ?? process.env.NEXT_PUBLIC_SITE_URL),
    email: data.contact.email,
    linkedIn: data.contact.linkedin,
  })
  const nav = (key: string, fallbackKey: string) =>
    getSiteCopyValue(copy, key) ?? getSiteCopyValue(copy, fallbackKey)

  const sections: HomeSection[] = [
    {
      id: 'home',
      label: nav('nav_home', 'nav_home') ?? '',
      content: <HeroSection settings={data.settings} contact={data.contact} stats={data.stats} copy={copy} marqueeNames={[...selectedSkills.map(skill => skill.name), ...stack.map(item => item.name)]} />,
    },
    ...(services.length > 0
      ? [{ id: 'services', label: nav('nav_services', 'nav_services') ?? '', content: <ServicesSection services={services} copy={copy} /> }]
      : []),
    ...(caseStudies.length > 0
      ? [{ id: 'work', label: nav('nav_work', 'nav_work') ?? '', content: <CaseStudiesSection caseStudies={caseStudies} copy={copy} sectionId="work" /> }]
      : []),
    ...(projects.length > 0
      ? [{ id: caseStudies.length > 0 ? 'work-projects' : 'work', label: nav('nav_work', 'nav_work') ?? '', content: <ProjectsSection projects={projects} copy={copy} sectionId={caseStudies.length > 0 ? 'work-projects' : 'work'} /> }]
      : []),
    ...(processSteps.length > 0
      ? [{ id: 'process', label: nav('nav_process', 'nav_process') ?? '', content: <ProcessSection process={processSteps} copy={copy} /> }]
      : []),
    ...(capabilities.length > 0
      ? [{ id: 'capabilities', label: '', content: <CapabilitiesSection capabilities={capabilities} copy={copy} /> }]
      : []),
    ...(selectedExperience.length > 0
      ? [{ id: 'about', label: nav('nav_about', 'nav_about') ?? '', content: <ExperienceSection experience={selectedExperience} copy={copy} /> }]
      : []),
    ...(data.education.length > 0
      ? [{ id: selectedExperience.length > 0 ? 'about-education' : 'about', label: nav('nav_about', 'nav_about') ?? '', content: <EducationSection education={data.education} copy={copy} sectionId={selectedExperience.length > 0 ? 'about-education' : 'about'} /> }]
      : []),
    ...(selectedCertifications.length > 0
      ? [{ id: 'certifications', label: nav('nav_certifications', 'nav_certifications') ?? '', content: <CertificationsSection certifications={selectedCertifications} copy={copy} /> }]
      : []),
    ...(Object.values(data.contact).some(value => value.trim())
      ? [{ id: 'contact', label: nav('nav_contact', 'nav_contact') ?? '', content: <ContactSection contact={data.contact} copy={copy} /> }]
      : []),
    ...(showPosts
      ? [{ id: 'posts', label: nav('nav_posts', 'nav_posts') ?? '', content: <PostsSection posts={data.posts} copy={copy} /> }]
      : []),
    ...(data.testimonials.length > 0
      ? [{ id: 'testimonials', label: nav('nav_testimonials', 'nav_testimonials') ?? '', content: <TestimonialsSection testimonials={data.testimonials} copy={copy} /> }]
      : []),
  ]

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <HomeClient
        name={data.settings.name}
        sections={sections}
        copy={copy}
        callUrls={{
          audit: data.contact.audit_call_url,
          introduction: data.contact.intro_call_url,
        }}
        email={data.contact.email}
      />
    </>
  )
}
