# RSVP Form - Google Sheets Setup

Your custom RSVP form is ready! Follow these steps to connect it to a Google Sheet.

## Step 1: Create Your Google Sheet

1. Go to https://drive.google.com
2. Create a new Google Sheet
3. Name it: "Event RSVPs" (or whatever you want)
4. Add these column headers in Row 1:
   ```
   A1: Timestamp
   B1: First Name
   C1: Last Name
   D1: Email
   E1: Company
   F1: Attendance
   G1: Dietary Restrictions
   H1: Plus One
   ```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. **Paste this code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Add a new row with the form data
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.company,
      data.attendance,
      data.dietary,
      data.plusOne
    ]);

    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'RSVP submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Return error
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾)
5. Name your project: "RSVP Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description**: "RSVP Form Endpoint"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important!)
5. Click **Deploy**
6. **Authorize access**:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to RSVP Form Handler (unsafe)" (it's safe, it's your script)
   - Click "Allow"
7. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)

## Step 4: Add URL to Your Website

1. Open `index.html` in your code
2. Find line ~460: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. **Replace** with your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Save and push to GitHub

## Step 5: Test It!

1. Go to your site
2. Click **"RSVP Test"** button
3. Fill out the form
4. Submit
5. Check your Google Sheet - new row should appear!

---

## How It Works

1. User clicks "RSVP Test" → Modal opens
2. User fills out form (Name, Email, Company, etc.)
3. Click "Submit RSVP"
4. JavaScript sends data to your Google Apps Script
5. Script writes data to your Google Sheet
6. User sees "Success!" message

---

## Customizing the Form

Want to add/remove fields? Edit these files:

**HTML (`index.html` around line 450):**
- Add/remove form fields in the modal

**Apps Script:**
- Update the `sheet.appendRow([...])` to match your fields
- Update column headers in your sheet

**Example: Add "Phone" field:**

1. Add to HTML form:
```html
<div class="form-group">
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone">
</div>
```

2. Add to JavaScript formData object:
```javascript
phone: document.getElementById('phone').value,
```

3. Add to Apps Script appendRow:
```javascript
sheet.appendRow([
  data.timestamp,
  data.firstName,
  data.lastName,
  data.email,
  data.phone,  // Add here
  data.company,
  // ... etc
]);
```

4. Add column header in Sheet: "Phone"

---

## Troubleshooting

**Form not submitting?**
- Check that you copied the full Web App URL
- Make sure "Who has access" is set to "Anyone"
- Check browser console for errors (F12)

**Data not appearing in sheet?**
- Verify column headers match the Apps Script
- Check the Apps Script "Executions" log for errors

**"Authorization required" error?**
- Re-deploy the script
- Make sure you clicked "Allow" during authorization

---

## Security Notes

- The form URL is public (anyone can submit)
- Consider adding CAPTCHA for production use
- Email addresses are visible in your sheet (keep it private)
- No sensitive data validation on client-side

For high-security RSVPs, consider server-side validation or third-party services.
