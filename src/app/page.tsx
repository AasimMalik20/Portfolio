import { HomeClient, type HomeSection } from '@/components/HomeClient'
import { AboutSection } from '@/components/sections/AboutSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StackSection } from '@/components/sections/StackSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { fetchAllSheetData } from '@/lib/sheets'
import { getSiteCopyValue } from '@/lib/site-copy'

export const revalidate = 300

export default async function Home() {
  const data = await fetchAllSheetData()
  const copy = data.siteCopy
  const bookingUrl = data.contact.booking_url?.trim()
    || data.contact.audit_call_url?.trim()
    || data.contact.intro_call_url?.trim()
  const navCtaText = data.settings.nav_cta_text?.trim()
  const sections: HomeSection[] = []

  sections.push({
    id: 'home',
    label: '',
    content: <HeroSection settings={data.settings} bookingUrl={bookingUrl} />,
  })
  if (data.services.length > 0) sections.push({ id: 'services', label: getSiteCopyValue(copy, 'nav_services') ?? '', content: <ServicesSection services={data.services} copy={copy} /> })
  if (data.caseStudies.length > 0) sections.push({ id: 'work', label: getSiteCopyValue(copy, 'nav_work') ?? '', content: <CaseStudiesSection caseStudies={data.caseStudies} copy={copy} sectionId="work" /> })
  if (data.testimonials.length > 0) sections.push({ id: 'testimonials', label: '', content: <TestimonialsSection testimonials={data.testimonials} copy={copy} /> })
  if (data.proof.length > 0) sections.push({ id: 'proof', label: '', content: <ProofSection items={data.proof} /> })
  if (data.process.length > 0) sections.push({ id: 'process', label: getSiteCopyValue(copy, 'nav_process') ?? '', content: <ProcessSection process={data.process} copy={copy} /> })
  if (data.stack.length > 0) sections.push({ id: 'stack', label: '', content: <StackSection stack={data.stack} settings={data.settings} /> })
  if (data.settings.about_heading?.trim() || data.settings.about_text?.trim() || data.certifications.length > 0) sections.push({ id: 'about', label: getSiteCopyValue(copy, 'nav_about') ?? '', content: <AboutSection settings={data.settings} certifications={data.certifications} /> })
  if (bookingUrl || data.contact.email || data.contact.linkedin || data.contact.github || data.contact.phone || data.settings.contact_heading || data.settings.contact_response_time || data.settings.contact_timezone) sections.push({ id: 'contact', label: '', content: <ContactSection contact={data.contact} settings={data.settings} copy={copy} bookingUrl={bookingUrl} /> })

  return <HomeClient name={data.settings.name} sections={sections} copy={copy} email={data.contact.email} bookingUrl={bookingUrl} bookingLabel={navCtaText} cvUrl={data.contact.cv_url || data.contact.resume_url} cvLabel={getSiteCopyValue(copy, 'hero_download_cv')} />
}
