/**
 * Google Apps Script — Installable On-Edit Trigger
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this code
 * 3. In Script Properties (Project Settings → Script Properties) add:
 *    - PORTFOLIO_REVALIDATE_URL  → https://your-site.com/api/revalidate
 *    - PORTFOLIO_REVALIDATE_SECRET → (same value as your REVALIDATE_SECRET env var)
 * 4. Go to Triggers (clock icon) → Add Trigger:
 *    - Function: onEditTrigger
 *    - Event source: From spreadsheet
 *    - Event type: On edit
 *    (Use INSTALLABLE trigger, not the simple onEdit — it needs UrlFetchApp permission)
 */

function onEditTrigger() {
  var props = PropertiesService.getScriptProperties();
  var url = props.getProperty('PORTFOLIO_REVALIDATE_URL');
  var secret = props.getProperty('PORTFOLIO_REVALIDATE_SECRET');

  if (!url || !secret) {
    console.warn('onEditTrigger: PORTFOLIO_REVALIDATE_URL or PORTFOLIO_REVALIDATE_SECRET not set in Script Properties');
    return;
  }

  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + secret,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({ source: 'apps-script' }),
      muteHttpExceptions: true,
    });
  } catch (e) {
    console.error('onEditTrigger: fetch failed', e);
  }
}
