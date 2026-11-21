import { HomeClient, type HomeSection } from '@/components/HomeClient'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PostsSection } from '@/components/sections/PostsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { StackSection } from '@/components/sections/StackSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { fetchGitHubMeta } from '@/lib/github'
import { fetchAllSheetData } from '@/lib/sheets'

export const revalidate = 300

export default async function Home() {
  const data = await fetchAllSheetData()
  const projects = await Promise.all(
    data.projects.map(async project => ({
      ...project,
      github: project.repo_url ? await fetchGitHubMeta(project.repo_url) : undefined,
    })),
  )

  const sections: HomeSection[] = [
    {
      id: 'home',
      label: 'Home',
      content: <HeroSection settings={data.settings} contact={data.contact} stats={data.stats} />,
    },
    ...(data.services.length > 0
      ? [{ id: 'services', label: 'Services', content: <ServicesSection services={data.services} /> }]
      : []),
    ...(data.experience.length > 0
      ? [{ id: 'work-experience', label: 'Experience', content: <ExperienceSection experience={data.experience} /> }]
      : []),
    ...(data.skills.length > 0
      ? [{ id: 'skills', label: 'Skills', content: <SkillsSection skills={data.skills} /> }]
      : []),
    ...(projects.length > 0
      ? [{ id: 'projects', label: 'Projects', content: <ProjectsSection projects={projects} /> }]
      : []),
    ...(data.stack.length > 0
      ? [{ id: 'stack', label: 'Tech Stack', content: <StackSection stack={data.stack} /> }]
      : []),
    ...(data.process.length > 0
      ? [{ id: 'process', label: 'Process', content: <ProcessSection process={data.process} /> }]
      : []),
    ...(data.testimonials.length > 0
      ? [{ id: 'testimonials', label: 'Testimonials', content: <TestimonialsSection testimonials={data.testimonials} /> }]
      : []),
    ...(data.certifications.length > 0
      ? [{ id: 'certifications', label: 'Certifications', content: <CertificationsSection certifications={data.certifications} /> }]
      : []),
    ...(data.education.length > 0
      ? [{ id: 'education', label: 'Education', content: <EducationSection education={data.education} /> }]
      : []),
    {
      id: 'posts',
      label: 'Posts',
      content: <PostsSection posts={data.posts} settings={data.settings} />,
    },
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
