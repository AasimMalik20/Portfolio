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
import { fetchGitHubMeta } from '@/lib/github'
import {
  selectCaseStudies,
  selectProjects,
  shouldShowPosts,
} from '@/lib/portfolio-content'
import { fetchAllSheetData } from '@/lib/sheets'

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
  const showPosts = shouldShowPosts(data.posts, data.settings.reddit_username)

  const sections: HomeSection[] = [
    {
      id: 'home',
      label: 'Home',
      content: <HeroSection settings={data.settings} contact={data.contact} stats={data.stats} />,
    },
    ...(services.length > 0
      ? [{ id: 'services', label: 'Services', content: <ServicesSection services={services} /> }]
      : []),
    ...(caseStudies.length > 0
      ? [{ id: 'case-studies', label: 'Case Studies', content: <CaseStudiesSection caseStudies={caseStudies} /> }]
      : []),
    ...(projects.length > 0
      ? [{ id: 'projects', label: 'Projects', content: <ProjectsSection projects={projects} /> }]
      : []),
    ...(selectedExperience.length > 0
      ? [{ id: 'work-experience', label: 'Experience', content: <ExperienceSection experience={selectedExperience} /> }]
      : []),
    ...(selectedSkills.length > 0
      ? [{ id: 'skills', label: 'Skills', content: <SkillsSection skills={selectedSkills} /> }]
      : []),
    ...(data.testimonials.length > 0
      ? [{ id: 'testimonials', label: 'Testimonials', content: <TestimonialsSection testimonials={data.testimonials} /> }]
      : []),
    ...(selectedCertifications.length > 0
      ? [{ id: 'certifications', label: 'Certifications', content: <CertificationsSection certifications={selectedCertifications} /> }]
      : []),
    ...(Object.values(data.contact).some(value => value.trim())
      ? [{ id: 'contact', label: 'Contact', content: <ContactSection contact={data.contact} /> }]
      : []),
    ...(showPosts
      ? [{ id: 'posts', label: 'Posts', content: <PostsSection posts={data.posts} settings={data.settings} /> }]
      : []),
    ...(stack.length > 0
      ? [{ id: 'stack', label: 'Tech Stack', content: <StackSection stack={stack} /> }]
      : []),
    ...(process.length > 0
      ? [{ id: 'process', label: 'Process', content: <ProcessSection process={process} /> }]
      : []),
  ]

  return (
    <HomeClient
      name={data.settings.name}
      sections={sections}
    />
  )
}
