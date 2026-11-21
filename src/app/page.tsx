import { HomeClient, type HomeSection } from '@/components/HomeClient'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { fetchGitHubMeta } from '@/lib/github'
import {
  excludeCaseStudyProjects,
  selectCaseStudies,
  selectTopRows,
} from '@/lib/portfolio-content'
import { fetchAllSheetData } from '@/lib/sheets'

export const revalidate = 300

export default async function Home() {
  const data = await fetchAllSheetData()
  const caseStudies = selectCaseStudies(data.caseStudies)
  const selectedExperience = selectTopRows(
    data.experience.filter(entry => entry.company.trim() && entry.role.trim()),
    4,
  )
  const selectedSkills = selectTopRows(
    data.skills.filter(skill => skill.name.trim()),
    8,
  )
  const selectedCertifications = selectTopRows(
    data.certifications.filter(certification => certification.name.trim()),
    3,
  )
  const projects = await Promise.all(
    selectTopRows(
      excludeCaseStudyProjects(
        data.projects.filter(project => project.name.trim()),
        caseStudies,
      ),
      3,
    )
      .map(async project => ({
        ...project,
        github: project.repo_url ? await fetchGitHubMeta(project.repo_url) : undefined,
      })),
  )
  const services = selectTopRows(
    data.services.filter(service =>
      service.name.trim() &&
      (service.description.trim() || (service.cta_text && service.cta_url)),
    ),
    3,
  )

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
      ? [{ id: 'testimonials', label: 'Testimonials', content: <TestimonialsSection testimonials={selectTopRows(data.testimonials, 3)} /> }]
      : []),
    ...(selectedCertifications.length > 0
      ? [{ id: 'certifications', label: 'Certifications', content: <CertificationsSection certifications={selectedCertifications} /> }]
      : []),
    ...(Object.values(data.contact).some(value => value.trim())
      ? [{ id: 'contact', label: 'Contact', content: <ContactSection contact={data.contact} /> }]
      : []),
  ]

  return (
    <HomeClient
      name={data.settings.name}
      sections={sections}
    />
  )
}
