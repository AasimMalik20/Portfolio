# FEAT-011: Resume Download

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — Hero section, `public/Aasim_Malik_Resume.pdf`

---

## Description

"Download CV" button in the Hero section triggers a browser download of the PDF resume.

---

## Implementation

```tsx
<Button variant="outline" size="lg" asChild>
  <a href="/Aasim_Malik_Resume.pdf" download="Aasim_Malik_Resume.pdf">
    Download CV
    <Download className="ml-2 h-4 w-4" />
  </a>
</Button>
```

The `download` attribute:
1. Triggers a file download instead of navigation
2. Sets the suggested filename to `Aasim_Malik_Resume.pdf`

The file is served statically from `public/Aasim_Malik_Resume.pdf`.

---

## To Update the Resume

Replace the file at `public/Aasim_Malik_Resume.pdf` with the new version. Keep the same filename to avoid changing any code.

---

## Related Documents

- [features/FEAT-001-hero.md](./FEAT-001-hero.md)
- [REPOSITORY_MAP.md](../REPOSITORY_MAP.md)
