# Directory Rules: public/

> **Applies to**: `public/` directory

---

## Responsibilities

Static assets served directly at the root URL path. Files here are publicly accessible.

---

## Current Contents

| File | URL | Purpose |
|------|-----|---------|
| `profile.png` | `/profile.png` | Profile photo — used in Hero section |
| `logo-am.png` | `/logo-am.png` | AM logo image |
| `Aasim_Malik_Resume.pdf` | `/Aasim_Malik_Resume.pdf` | Resume PDF download |

---

## Rules

1. **All files in `public/` are publicly accessible** with no authentication. Do not place any sensitive content here.
2. **File names are URLs.** A file named `Aasim_Malik_Resume.pdf` is served at `/Aasim_Malik_Resume.pdf`.
3. **To update the resume**: Replace `Aasim_Malik_Resume.pdf` with the same filename. No code changes needed.
4. **To update the profile photo**: Replace `profile.png`. Recommended: 384×384px, square, PNG format.
5. **Use `next/image`** for all image references in code (handles optimization, lazy loading, etc.).
6. **Never put** `.env` files, credentials, or private keys here.

---

## Related Documents

- [REPOSITORY_MAP.md](../REPOSITORY_MAP.md)
- [features/FEAT-001-hero.md](../features/FEAT-001-hero.md)
- [features/FEAT-011-resume-download.md](../features/FEAT-011-resume-download.md)
