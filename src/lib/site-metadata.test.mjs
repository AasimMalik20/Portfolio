import assert from 'node:assert/strict'
import test from 'node:test'
import { buildJsonLd, resolveSiteUrl } from './site-metadata.ts'

test('resolveSiteUrl accepts only absolute HTTP(S) URLs', () => {
  assert.equal(resolveSiteUrl('https://portfolio.example/about')?.href, 'https://portfolio.example/about')
  assert.equal(resolveSiteUrl('http://portfolio.example')?.href, 'http://portfolio.example/')
  assert.equal(resolveSiteUrl('portfolio.example'), undefined)
  assert.equal(resolveSiteUrl('javascript:alert(1)'), undefined)
  assert.equal(resolveSiteUrl(undefined), undefined)
})

test('buildJsonLd creates Person and ProfessionalService entries from verified contact details', () => {
  assert.deepEqual(
    buildJsonLd({
      name: 'Aasim Malik',
      description: 'Builds reliable AI automations.',
      url: new URL('https://portfolio.example'),
      email: 'hello@example.com',
      linkedIn: 'https://www.linkedin.com/in/aasim',
    }),
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: 'Aasim Malik',
          description: 'Builds reliable AI automations.',
          url: 'https://portfolio.example/',
          email: 'mailto:hello@example.com',
          sameAs: ['https://www.linkedin.com/in/aasim'],
        },
        {
          '@type': 'ProfessionalService',
          name: 'Aasim Malik',
          description: 'Builds reliable AI automations.',
          url: 'https://portfolio.example/',
          provider: { '@type': 'Person', name: 'Aasim Malik' },
        },
      ],
    },
  )
})
