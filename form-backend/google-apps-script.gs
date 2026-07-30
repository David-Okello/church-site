/**
 * Contact-form → Google Sheet backend (free, no server).
 *
 * WHAT THIS DOES
 *   Receives contact-form submissions from the website and appends each one
 *   as a row in a Google Sheet the whole team can open — no login on the site,
 *   no database, no cost.
 *
 * SETUP (one-time, ~10 minutes)
 *   1. Go to https://sheets.new to create a new Google Sheet.
 *      Name it e.g. "Wanyjok Website — Messages".
 *   2. In that sheet: Extensions → Apps Script. Delete any sample code.
 *   3. Paste ALL of this file in, and click Save (💾).
 *   4. Click Deploy → New deployment → (gear) Web app.
 *        - Description: "Contact form"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Click Deploy, authorize when prompted, and COPY the Web app URL
 *      (it looks like https://script.google.com/macros/s/AKfyc..../exec).
 *   5. Paste that URL into church-site/components/ContactForm.tsx
 *      (replace the FORM_ENDPOINT placeholder), then commit & push.
 *
 * The sheet gets a header row automatically on the first submission.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", "Name", "Email / Phone", "Message"]);
    }

    var p = (e && e.parameter) ? e.parameter : {};

    // Honeypot — bots fill the hidden "botcheck" field; ignore those.
    if (p.botcheck) {
      return json({ result: "ignored" });
    }

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.contact || "",
      p.message || ""
    ]);

    return json({ result: "success" });
  } catch (err) {
    return json({ result: "error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ status: "ok" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
