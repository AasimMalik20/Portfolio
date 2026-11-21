import assert from 'node:assert/strict'
import test from 'node:test'
import {
  excludeCaseStudyProjects,
  filterUsableTestimonials,
  isMeaningfulCaseStudy,
  selectTopRows,
} from './portfolio-content.ts'

test('selectTopRows returns highest-priority rows without mutating input', () => {
  const rows = [{ order: 4 }, { order: 1 }, { order: 3 }, { order: 2 }]

  assert.deepEqual(selectTopRows(rows, 2), [{ order: 1 }, { order: 2 }])
  assert.deepEqual(rows, [{ order: 4 }, { order: 1 }, { order: 3 }, { order: 2 }])
})

test('excludeCaseStudyProjects removes projects represented by selected case studies', () => {
  const projects = [
    { case_study_slug: 'case-one' },
    { case_study_slug: ' CASE-TWO ' },
    { case_study_slug: 'other-case' },
    {},
  ]
  const caseStudies = [{ slug: 'case-one' }, { slug: 'case-two' }]

  assert.deepEqual(excludeCaseStudyProjects(projects, caseStudies), [
    { case_study_slug: 'other-case' },
    {},
  ])
})

test('filterUsableTestimonials requires both an author and a quote', () => {
  const testimonials = [
    { author: 'A. Client', quote: 'Clear outcomes and excellent delivery.' },
    { author: 'B. Client', quote: '  ' },
    { author: '  ', quote: 'A quote without an author.' },
  ]

  assert.deepEqual(filterUsableTestimonials(testimonials), [testimonials[0]])
})

test('isMeaningfulCaseStudy requires a title and supporting detail', () => {
  assert.equal(isMeaningfulCaseStudy({ title: 'Migration', summary: 'Reduced cost.' }), true)
  assert.equal(isMeaningfulCaseStudy({ title: '  ', summary: 'Reduced cost.' }), false)
  assert.equal(isMeaningfulCaseStudy({ title: 'Migration', summary: '  ' }), false)
})
