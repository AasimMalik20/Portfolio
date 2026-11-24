# Aasim Malik Portfolio

Next.js portfolio content is read server-side from a private Google Sheet.

## Google Sheets setup

1. Enable the Google Sheets API in a Google Cloud project and create a service account.
2. Share the spreadsheet with the service-account email as a Viewer.
3. Copy the required values from `.env.example` to `.env.local`. Keep the private key secret; do not commit `.env.local` or service-account key files.
4. For Firebase App Hosting, configure `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` as runtime secrets/environment variables. Configure `REVALIDATE_SECRET` as well if using the on-edit webhook.

The homepage displays usable rows from the Projects, CaseStudies, Experience, Skills, Certifications, Services, Testimonials, Posts, Stack, and Process tabs. Rows marked `visible=FALSE` are hidden; blank visibility values remain visible. Projects can appear alongside linked case studies, and the Sheet's visible column can be used to hide duplicates. Posts appear when the Posts tab has rows or a Reddit username is configured. Empty sections are omitted, and Sheet data is cached for five minutes. See the [Sheets design](./docs/superpowers/specs/2026-11-10-sheets-portfolio-design.md) for tab columns and the [Apps Script webhook](./apps-script/onEdit.js) for optional on-edit revalidation.

## CMS copy and contact schema

The `SiteCopy` tab is a key/value table with `key`, `value`, and an optional `visible` column. Only rows with blank visibility or a value other than `FALSE` are read; `visible=FALSE` hides a copy key. Required copy-key groups cover metadata, navigation, hero, section headings and field labels, CTA labels, accessibility text, footer, and not-found UI. The exact public origin is editable under the `site.public_origin` key in `SiteCopy`; it must be replaced or supplied as a valid origin and no origin fallback is stored in application code.

The `Contact` tab is also a key/value table and supports the optional `visible` column. `audit_call_url` and `intro_call_url` are separate visibility-aware keys:

| Key | Initial value for the Sheet |
| --- | --- |
| `audit_call_url` | `https://cal.com/aasim-malik/audit` |
| `intro_call_url` | `https://cal.com/aasim-malik/intro-chat` |

These URLs are initial values for the user to enter in the Sheet. They are not application defaults. The app reads Sheet data in this CMS; it does not write back to Google Sheets.

## Development

```sh
npm run dev
npm run typecheck
npm run build
```
