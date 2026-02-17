# Guestlist Setup Instructions

Your Reverb website now has email-based guestlist authentication! Here's how to manage it.

## Current Setup (Simple Array)

The guestlist is currently configured with a simple email array in `script.js`.

**Current test emails:**
- test@spotify.com
- demo@spotify.com
- reverb@spotify.com

### To Add/Remove Emails:

1. Open `script.js`
2. Find the `GUESTLIST` array (around line 8)
3. Add or remove emails:

```javascript
const GUESTLIST = [
    'test@spotify.com',
    'demo@spotify.com',
    'reverb@spotify.com',
    'newemail@spotify.com'  // Add new emails here
];
```

4. Save and push to GitHub

---

## Option 2: Connect to Airtable (Recommended for Easy Management)

### Setup Steps:

1. **Create an Airtable Base:**
   - Go to https://airtable.com
   - Create a new base called "Reverb Guestlist"
   - Create a table with one column: "Email"
   - Add your guest emails

2. **Get your API credentials:**
   - Go to https://airtable.com/account
   - Generate a Personal Access Token
   - Copy your Base ID from the base URL

3. **Update script.js:**
   - Uncomment the Airtable section (lines ~12-14)
   - Add your credentials:
   ```javascript
   const AIRTABLE_API_KEY = 'your-token-here';
   const AIRTABLE_BASE_ID = 'appXXXXXXXXXXXXXX';
   const AIRTABLE_TABLE_NAME = 'Guestlist';
   ```

4. **Switch to Airtable checking:**
   - Comment out the simple array return
   - Uncomment the Airtable fetch code (lines ~20-32)

**Benefits:** Easy to manage via Airtable interface, can share access with team

---

## Option 3: Connect to Google Sheets

### Setup Steps:

1. **Create a Google Sheet:**
   - Create a new sheet
   - Put emails in column A
   - Share it publicly or get API access

2. **Enable Google Sheets API:**
   - Go to Google Cloud Console
   - Enable Sheets API
   - Create an API key

3. **Update script.js:**
   - Add your credentials
   - Uncomment the Google Sheets section

**Benefits:** Familiar spreadsheet interface, easy bulk updates

---

## How It Works

1. **First Visit:** User sees guestlist gate with email input
2. **Email Check:** System checks if email is on your list
3. **Success:** User sees "Welcome!" message → Landing animation → Full site
4. **Failure:** "Email not found" error message
5. **Session:** Once authenticated, user stays logged in for the browser session

---

## Testing

**Test the guestlist:**
1. Visit your site: https://commsreverb.github.io/demo/
2. Try email: `test@spotify.com`
3. Should see success message and access site
4. Try unlisted email (e.g., `fake@email.com`)
5. Should see error message

---

## Security Notes

- Current setup is client-side (emails visible in code)
- For higher security, consider server-side validation
- Session-based (clears when browser closes)
- To force re-authentication, clear sessionStorage

---

## Need Help?

The guestlist logic is in `script.js` starting at line 4.
The form HTML is in `index.html` around line 11.
The styling is in `styles.css` starting at line 61.
