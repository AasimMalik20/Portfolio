'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/lib/sheets'
import { LogoBadge } from '@/components/LogoBadge'
import { List } from 'lucide-react'
import { getSiteCopyValue, type SiteCopy } from '@/lib/site-copy'

interface SkillsSectionProps {
  skills: Skill[]
  copy: SiteCopy
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card/80 text-center hover:shadow-md transition-shadow group"
    >
      <LogoBadge name={skill.name} iconSlug={skill.icon_slug} size={32} />
      <span className="text-xs font-medium text-foreground leading-tight">{skill.name}</span>
      {skill.level && (
        <span className="text-xs text-muted-foreground">{skill.level}</span>
      )}
      {skill.years && (
        <span className="text-xs text-muted-foreground">{skill.years}y</span>
      )}
    </motion.div>
  )
}

export function SkillsSection({ skills, copy }: SkillsSectionProps) {
  if (skills.length === 0) return null

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || getSiteCopyValue(copy, 'category_other') || ''
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const categories = Object.entries(grouped)

  let globalIndex = 0

  return (
    <section id="skills" className="py-16 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-2 mb-12">
          <List className="h-6 w-6 text-foreground" />
          {getSiteCopyValue(copy, 'skills_heading') && (
            <h2 className="text-3xl font-semibold tracking-tight">{getSiteCopyValue(copy, 'skills_heading')}</h2>
          )}
        </div>

        <div className="space-y-10">
          {categories.map(([category, catSkills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {catSkills.map(skill => {
                  const idx = globalIndex++
                  return <SkillCard key={skill.name + idx} skill={skill} index={idx} />
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
