# Google Sheets Guestlist Setup

## Quick Setup (5 minutes)

### Step 1: Create Your Guestlist Spreadsheet

1. Go to Google Drive: https://drive.google.com
2. Create a new Google Sheet
3. Name it: "Reverb Event Guestlist" (or whatever you want)
4. In **Column A**, add emails (one per row):
   ```
   A1: Email
   A2: john@example.com
   A3: sarah@example.com
   A4: mike@spotify.com
   ```
5. No header needed, just emails in column A

### Step 2: Publish Your Sheet

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. In the popup:
   - **First dropdown**: Select "Entire Document" or your specific sheet
   - **Second dropdown**: Select **"Comma-separated values (.csv)"**
3. Click **"Publish"**
4. **Copy the URL** that appears (looks like: `https://docs.google.com/spreadsheets/d/e/2PACX-xxx/pub?output=csv`)

### Step 3: Add URL to Your Site

1. Open `script.js` in your code
2. Find line ~9: `const GOOGLE_SHEET_CSV_URL = ...`
3. **Replace** the URL with your published sheet URL
4. Change line 17 from `const USE_GOOGLE_SHEET = false;` to:
   ```javascript
   const USE_GOOGLE_SHEET = true;
   ```
5. Save and push to GitHub

### Step 4: Test It!

1. Visit your site
2. Try an email from your Google Sheet
3. Should grant access!

---

## Managing Your Guestlist

**To add someone:**
- Just add their email to Column A in your sheet
- Changes are live immediately (may take 1-2 minutes to cache refresh)

**To remove someone:**
- Delete their row from the sheet

**To see who's on the list:**
- Just open your Google Sheet

---

## Example Google Sheet Structure

```
| A                  |
|--------------------|
| john@spotify.com   |
| sarah@example.com  |
| guest@company.com  |
| vip@email.com      |
```

That's it! Just emails in column A, one per row.

---

## Security Note

- The published sheet is publicly accessible (anyone with the URL can see it)
- Don't include sensitive info beyond emails
- For higher security, consider using Google Sheets API with private sheets

---

## Troubleshooting

**Guestlist not working?**
- Make sure sheet is published as CSV (not web page)
- Check that `USE_GOOGLE_SHEET = true` in script.js
- Verify emails have no extra spaces or characters
- Open browser console to see error messages

**Changes not appearing?**
- Wait 1-2 minutes for cache to refresh
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
