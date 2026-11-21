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
