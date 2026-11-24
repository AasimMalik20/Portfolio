import { HomeClient, type HomeSection } from '@/components/HomeClient'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { PostsSection } from '@/components/sections/PostsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { StackSection } from '@/components/sections/StackSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { fetchGitHubMeta } from '@/lib/github'
import {
  selectCaseStudies,
  selectProjects,
  shouldShowPosts,
} from '@/lib/portfolio-content'
import { fetchAllSheetData } from '@/lib/sheets'
import { getSiteCopyValue } from '@/lib/site-copy'

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
    selectProjects(data.projects)
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
  const process = data.process.filter(step => step.title.trim())
  const showPosts = shouldShowPosts(data.posts)
  const copy = data.siteCopy
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
      ? [{ id: 'work', label: nav('nav_work', 'nav_work') ?? '', content: <CaseStudiesSection caseStudies={caseStudies} copy={copy} /> }]
      : []),
    ...(projects.length > 0
      ? [{ id: 'projects', label: nav('nav_work', 'nav_work') ?? '', content: <ProjectsSection projects={projects} copy={copy} /> }]
      : []),
    ...(process.length > 0
      ? [{ id: 'process', label: nav('nav_process', 'nav_process') ?? '', content: <ProcessSection process={process} copy={copy} /> }]
      : []),
    ...(selectedSkills.length > 0
      ? [{ id: 'skills', label: nav('nav_skills', 'nav_skills') ?? '', content: <SkillsSection skills={selectedSkills} copy={copy} /> }]
      : []),
    ...(stack.length > 0
      ? [{ id: 'stack', label: nav('nav_stack', 'nav_stack') ?? '', content: <StackSection stack={stack} copy={copy} /> }]
      : []),
    ...(selectedExperience.length > 0
      ? [{ id: 'about', label: nav('nav_about', 'nav_about') ?? '', content: <ExperienceSection experience={selectedExperience} copy={copy} /> }]
      : []),
    ...(data.education.length > 0
      ? [{ id: 'education', label: nav('nav_about', 'nav_about') ?? '', content: <EducationSection education={data.education} copy={copy} /> }]
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
    <HomeClient
      name={data.settings.name}
      sections={sections}
      copy={copy}
      callUrls={{
        audit: data.contact.audit_call_url,
        introduction: data.contact.intro_call_url,
      }}
    />
  )
}
