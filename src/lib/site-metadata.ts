export type JsonLdInput = {
  name?: string
  description?: string
  url?: URL
  email?: string
  linkedIn?: string
}

export function resolveSiteUrl(value: string | undefined | null): URL | undefined {
  if (!value?.trim()) return undefined

  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : undefined
  } catch {
    return undefined
  }
}

export function buildJsonLd({ name, description, url, email, linkedIn }: JsonLdInput) {
  if (!name?.trim()) return undefined

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: name.trim(),
  }
  const service: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    name: name.trim(),
    provider: { '@type': 'Person', name: name.trim() },
  }
  const cleanDescription = description?.trim()
  const cleanEmail = email?.trim()
  const cleanLinkedIn = resolveSiteUrl(linkedIn)

  if (cleanDescription) {
    person.description = cleanDescription
    service.description = cleanDescription
  }
  if (url) {
    person.url = url.href
    service.url = url.href
  }
  if (cleanEmail) person.email = `mailto:${cleanEmail.replace(/^mailto:/i, '')}`
  if (cleanLinkedIn) person.sameAs = [cleanLinkedIn.href]

  return {
    '@context': 'https://schema.org',
    '@graph': [person, service],
  }
}
