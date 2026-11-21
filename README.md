# Aasim Malik Portfolio

Next.js portfolio content is read server-side from a private Google Sheet.

## Google Sheets setup

1. Enable the Google Sheets API in a Google Cloud project and create a service account.
2. Share the spreadsheet with the service-account email as a Viewer.
3. Copy the required values from `.env.example` to `.env.local`. Keep the private key secret; do not commit `.env.local` or service-account key files.
4. For Firebase App Hosting, configure `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` as runtime secrets/environment variables. Configure `REVALIDATE_SECRET` as well if using the on-edit webhook.

The homepage curates visible content from the Projects, CaseStudies, Experience, Skills, Certifications, Services, Testimonials, Contact, and Settings tabs. It prioritizes case studies, avoids repeating projects represented by a case study, and omits empty sections. Data is cached for five minutes. See the [Sheets design](./docs/superpowers/specs/2026-11-10-sheets-portfolio-design.md) for tab columns and the [Apps Script webhook](./apps-script/onEdit.js) for optional on-edit revalidation.

## Development

```sh
npm run dev
npm run typecheck
npm run build
```
