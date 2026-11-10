# shadcn/ui Components

> **Source**: `src/components/ui/`  
> **Last Verified**: 2026-11-09

See [modules/UI_COMPONENTS.md](../modules/UI_COMPONENTS.md) for the full inventory.

This document covers usage patterns specific to this project.

---

## Button Usage Patterns

```tsx
// Primary action
<Button size="lg" asChild>
  <a href="#contact">Get In Touch <ArrowRight className="ml-2 h-4 w-4" /></a>
</Button>

// Secondary/outline
<Button variant="outline" size="lg" asChild>
  <a href="/Aasim_Malik_Resume.pdf" download>Download CV</a>
</Button>

// Ghost icon button
<Button variant="ghost" size="icon" aria-label="Previous">
  <ChevronLeft className="h-6 w-6" />
</Button>

// Custom colored (social buttons)
<Button asChild className="bg-[#0077b5] text-primary-foreground hover:bg-[#0077b5]/90">
  <a href="...">LinkedIn</a>
</Button>
```

---

## Card Usage Pattern

```tsx
<Card className="shadow-md border border-border bg-card/80 backdrop-blur-sm">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
  <CardFooter>
    {/* footer actions */}
  </CardFooter>
</Card>
```

---

## Badge Usage Patterns

```tsx
// Intro pill
<Badge variant="outline" className="border-foreground/30 ...">HELLO! I AM AASIM MALIK</Badge>

// Skill pill
<Badge variant="secondary" className="text-sm font-light">Kubernetes</Badge>

// Date label on cards
<Badge variant="outline">{experience.date}</Badge>

// Project tag
<Badge variant="secondary" className="text-xs">{tag}</Badge>
```

---

## Sheet Usage (Mobile Nav)

```tsx
<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon"><Menu /></Button>
  </SheetTrigger>
  <SheetContent side="right" className="w-full max-w-xs p-6">
    <nav>
      <SheetClose asChild>
        <a href="#section" onClick={closeMobileMenu}>SECTION</a>
      </SheetClose>
    </nav>
  </SheetContent>
</Sheet>
```

---

## Related Documents

- [modules/UI_COMPONENTS.md](../modules/UI_COMPONENTS.md)
- [rules/CODING_RULES.md](../rules/CODING_RULES.md)
