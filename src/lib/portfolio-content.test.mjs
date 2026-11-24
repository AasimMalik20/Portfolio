import assert from 'node:assert/strict'
import test from 'node:test'
import * as portfolioContent from './portfolio-content.ts'

test('isVisible handles true, false, and blank values', () => {
  assert.equal(portfolioContent.isVisible?.('TRUE'), true)
  assert.equal(portfolioContent.isVisible?.(' false '), false)
  assert.equal(portfolioContent.isVisible?.(''), true)
  assert.equal(portfolioContent.isVisible?.('  '), true)
  assert.equal(portfolioContent.isVisible?.(undefined), true)
  assert.equal(portfolioContent.isVisible?.(null), true)
})

test('selectProjects keeps projects linked to case studies', () => {
  const projects = [
    { name: 'Project Alpha', case_study_slug: 'case-one' },
    { name: 'Project Beta', case_study_slug: 'case-two' },
    { name: 'Project Gamma' },
    { name: '  ', case_study_slug: 'case-three' },
  ]

  assert.deepEqual(portfolioContent.selectProjects?.(projects), projects.slice(0, 3))
})

test('selectCaseStudies returns all meaningful rows ordered by priority', () => {
  const rows = [
    { order: 5, title: 'Release Automation', summary: 'Reduced deployment time.' },
    { order: 2, title: 'Data Platform', problem: 'Fragmented reporting.' },
    { order: 4, title: 'Customer Portal', result: 'Improved self-service.' },
    { order: 1, title: '  ', summary: 'Incomplete without a title.' },
    { order: 3, title: 'Cloud Migration', solution: 'Moved to managed services.' },
    { order: 6, title: 'Observability', summary: 'Reduced incident response time.' },
  ]

  assert.deepEqual(
    portfolioContent.selectCaseStudies(rows),
    [rows[1], rows[4], rows[2], rows[0], rows[5]],
  )
})

test('shouldShowPosts ignores rows without usable URLs unless Reddit is configured', () => {
  const posts = [{}, { url: '' }, { url: '   ' }]

  assert.equal(portfolioContent.shouldShowPosts?.(posts), false)
  assert.equal(portfolioContent.shouldShowPosts?.(posts, 'portfolio-user'), true)
})

test('mergePosts keeps more than three Sheet posts', () => {
  const posts = [
    { url: 'https://example.com/1', timestamp: 1 },
    { url: 'https://example.com/2', timestamp: 2 },
    { url: 'https://example.com/3', timestamp: 3 },
    { url: 'https://example.com/4', timestamp: 4 },
    { url: 'https://example.com/5', timestamp: 5 },
  ]

  assert.deepEqual(portfolioContent.mergePosts?.(posts), [...posts].reverse())
})

test('filterUsableTestimonials requires both an author and a quote', () => {
  const testimonials = [
    { author: 'A. Client', quote: 'Clear outcomes and excellent delivery.' },
    { author: 'B. Client', quote: '  ' },
    { author: '  ', quote: 'A quote without an author.' },
  ]

  assert.deepEqual(portfolioContent.filterUsableTestimonials(testimonials), [testimonials[0]])
})

test('isMeaningfulCaseStudy requires a title and supporting detail', () => {
  assert.equal(portfolioContent.isMeaningfulCaseStudy({ title: 'Migration', summary: 'Reduced cost.' }), true)
  assert.equal(portfolioContent.isMeaningfulCaseStudy({ title: '  ', summary: 'Reduced cost.' }), false)
  assert.equal(portfolioContent.isMeaningfulCaseStudy({ title: 'Migration', summary: '  ' }), false)
})

test('parseVisibleKeyValueRows excludes false visibility and keeps blank visibility', () => {
  const rows = [
    { key: 'hero_title', value: 'Visible title', visible: '' },
    { key: 'hidden_title', value: 'Hidden title', visible: 'FALSE' },
    { key: 'also_visible', value: 'Also visible', visible: ' true ' },
  ]

  assert.deepEqual(portfolioContent.parseVisibleKeyValueRows(rows), {
    hero_title: 'Visible title',
    also_visible: 'Also visible',
  })
})

test('parseVisibleKeyValueRows returns SiteCopy values by key', () => {
  const rows = [
    { Key: 'nav_services', Value: 'Services' },
    { Key: 'hero_title', Value: 'Build reliable systems', Visible: ' FALSE ' },
  ]

  assert.deepEqual(portfolioContent.parseVisibleKeyValueRows(rows), {
    nav_services: 'Services',
  })
})

test('parseVisibleKeyValueRows preserves existing key/value tab compatibility', () => {
  const contactRows = [
    { key: 'email', value: 'hello@example.com' },
    { key: 'audit_call_url', value: 'https://cal.com/aasim-malik/audit', visible: 'TRUE' },
  ]
  const settingsRows = [
    { key: 'stats_shipped', value: '12' },
    { Key: 'stats_live', Value: '8' },
  ]

  assert.deepEqual(portfolioContent.parseVisibleKeyValueRows(contactRows), {
    email: 'hello@example.com',
    audit_call_url: 'https://cal.com/aasim-malik/audit',
  })
  assert.deepEqual(portfolioContent.parseVisibleKeyValueRows(settingsRows), {
    stats_shipped: '12',
    stats_live: '8',
  })
})

test('parseVisibleKeyValueRows omits and logs visible rows with missing values', () => {
  const rows = [
    { key: 'missing_value', visible: 'TRUE' },
    { key: 'blank_value', value: '  ', visible: '' },
    { first: 'legacy_key', second: 'legacy_value' },
  ]
  const warnings = []
  const originalWarn = console.warn
  console.warn = (...args) => warnings.push(args.join(' '))

  try {
    assert.deepEqual(portfolioContent.parseVisibleKeyValueRows(rows), {
      legacy_key: 'legacy_value',
    })
  } finally {
    console.warn = originalWarn
  }

  assert.equal(warnings.length, 2)
  assert.match(warnings[0], /missing_value/)
  assert.match(warnings[1], /blank_value/)
  assert.doesNotMatch(warnings[0], /TRUE/)
})
