# FEAT-008: Contact Section

> **Status**: ✅ Implemented  
> **Source**: `src/app/page.tsx` — `<section id="contact">`

---

## Description

Displays contact information and social links. No server-side form processing. All contact is via direct external links.

---

## Contact Information

| Field | Value |
|-------|-------|
| Location | Srinagar, J&K, India |
| Email | aasimmalik29@gmail.com |
| Phone | +91 9176462019 |

---

## Social/Contact Buttons

| Platform | URL | Color |
|----------|-----|-------|
| Email | mailto:aasimmalik29@gmail.com | Default (black/white) |
| LinkedIn | linkedin.com/in/aasim-malik/ | `#0077b5` (LinkedIn blue) |
| GitHub | github.com/AasimMalik20 | Black |
| WhatsApp | wa.me/919176462019 | `#25D366` (WhatsApp green) |
| Twitter | x.com/AasimMalik4957 | `#1DA1F2` (Twitter blue) |
| Medium | medium.com/@aasimmalik29 | Black |

All external buttons use `target="_blank" rel="noopener noreferrer"`.

---

## No Contact Form

The contact section does not have a form. There is no server-side email sending, no Firestore submission, and no validation. This is intentional for simplicity but `react-hook-form` and `zod` are installed if a form is needed.

---

## To Modify Contact Details

Find `<section id="contact">` in `page.tsx` and update the text/links directly.

## To Add a Contact Form

1. Add a `<form>` using `react-hook-form` + `zod` (already installed)
2. Create a Next.js Server Action in `src/app/actions.ts`
3. Send email via a service like Resend, SendGrid, or Firebase Functions
4. Show success/error feedback using the existing `toast()` system

---

## Related Documents

- [FEATURES.md](../FEATURES.md)
- [PRD.md](../PRD.md)
