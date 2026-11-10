import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Download,
  MapPin,
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
  type LucideIcon,
} from 'lucide-react'
import { CountUp } from '@/components/CountUp'
import { fetchAllSheetData, HeroStats, SettingsData, ContactData } from '@/lib/sheets'

interface HeroSectionProps {
  settings?: SettingsData
  contact?: ContactData
  stats?: HeroStats
}

// Preserved technologies list from existing codebase hero
const technologies: { name: string; icon: LucideIcon }[] = [
  { name: 'GCP', icon: Cloud },
  { name: 'OCI', icon: Database },
  { name: 'Terraform', icon: Layers },
  { name: 'Docker', icon: Container },
  { name: 'Kubernetes/GKE', icon: ShipWheel },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Networking', icon: Network },
  { name: 'Databases', icon: DatabaseZap },
  { name: 'Monitoring', icon: Activity },
  { name: 'Python', icon: Code },
  { name: 'Bash', icon: Terminal },
]

export async function HeroSection(props: HeroSectionProps = {}) {
  let settings = props.settings
  let contact = props.contact
  let stats = props.stats

  if (!settings || !stats) {
    const data = await fetchAllSheetData()
    settings = settings ?? data.settings
    contact = contact ?? data.contact
    stats = stats ?? data.stats
  }

  const name = settings.name?.trim()
  const tagline = settings.tagline?.trim()
  const heroText = settings.hero_text?.trim()
  const location = settings.location?.trim()
  const resumeUrl = contact?.resume_url?.trim() || settings.resume_url?.trim() || '/Aasim_Malik_Resume.pdf'

  // Build stat items (hide any stat that is 0 or empty)
  const statItems: { label: string; num?: number; suffix?: string; text?: string }[] = []

  if (stats.years && stats.years !== '0' && stats.years !== '0+') {
    const parsed = parseInt(stats.years, 10)
    if (!isNaN(parsed) && parsed > 0) {
      const suffix = stats.years.replace(String(parsed), '') || '+'
      statItems.push({ label: 'Years Experience', num: parsed, suffix })
    } else {
      statItems.push({ label: 'Years Experience', text: stats.years })
    }
  }

  if (stats.shipped && stats.shipped > 0) {
    statItems.push({ label: 'Projects Shipped', num: stats.shipped })
  }

  if (stats.live && stats.live > 0) {
    statItems.push({ label: 'Live Systems', num: stats.live })
  }

  if (stats.certs && stats.certs > 0) {
    statItems.push({ label: 'Certifications', num: stats.certs })
  }

  const showStatsRow = statItems.length > 0

  return (
    <section id="home" className="pt-24 pb-16">
      {/* Hero Grid - Reusing exact existing layout */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Badges for Name and Location (Hide if missing) */}
            {(name || location) && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {name && (
                  <Badge
                    variant="outline"
                    className="border-foreground/30 text-foreground font-medium py-1 px-3 rounded-full text-sm"
                  >
                    HELLO! I AM {name.toUpperCase()}
                  </Badge>
                )}
                {location && (
                  <Badge
                    variant="outline"
                    className="border-foreground/30 text-muted-foreground font-medium py-1 px-3 rounded-full text-sm flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    {location}
                  </Badge>
                )}
              </div>
            )}

            {/* Tagline / Title (Hide if missing) */}
            {tagline && (
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                {tagline}
              </h1>
            )}

            {/* Hero Text / Description (Hide if missing) */}
            {heroText && (
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:mx-0">
                {heroText}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start pt-4">
              <Button size="lg" asChild>
                <a href="#contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              {resumeUrl && (
                <Button variant="outline" size="lg" asChild>
                  <a href={resumeUrl} download="Aasim_Malik_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download CV
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats row with CountUp animation on scroll (Hide whole row if all hidden) */}
            {showStatsRow && (
              <div className="pt-6 border-t border-border/60">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                  {statItems.map((item, index) => (
                    <div key={item.label + index} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        {item.num !== undefined ? (
                          <CountUp to={item.num} suffix={item.suffix ?? ''} />
                        ) : (
                          item.text
                        )}
                      </div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Image
                src="/profile.png"
                width={384}
                height={384}
                alt={`${name || 'Aasim Malik'} Profile Picture`}
                className="rounded-full object-cover border-8 border-background shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technology Icons Slideshow (Existing design preserved) */}
      <div className="w-full overflow-hidden pt-24 group full-width-slideshow">
        <p className="text-sm text-muted-foreground mb-6 text-center uppercase tracking-widest">
          TECHNOLOGIES I WORK WITH
        </p>
        <div className="animate-slideLeft">
          <div className="flex">
            {[...technologies, ...technologies].map((tech, index) => (
              <Card
                key={`${tech.name}-${index}-tech-1`}
                className="p-4 min-w-[120px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card"
              >
                <tech.icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                <p className="mt-2 text-xs font-medium text-center text-muted-foreground">
                  {tech.name}
                </p>
              </Card>
            ))}
            {[...technologies, ...technologies].map((tech, index) => (
              <Card
                key={`${tech.name}-${index}-tech-2`}
                className="p-4 min-w-[120px] flex flex-col items-center justify-center shadow-sm border border-border hover:shadow-md transition-shadow mx-2 flex-shrink-0 bg-card"
              >
                <tech.icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                <p className="mt-2 text-xs font-medium text-center text-muted-foreground">
                  {tech.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
