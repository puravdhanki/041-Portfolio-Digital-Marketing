/**
 * Google Apps Script Backend for Purav Dhanki Portfolio
 *
 * FEATURES:
 * 1. Saves all form inquiries directly into your private Google Sheet (Backend Database).
 * 2. Optional: Sends an instant WhatsApp message to your phone (+91 81089 01069) via CallMeBot API.
 * 3. Returns pure JSON (NO email redirection, NO page redirect).
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet named "Portfolio Inquiries"
 * 2. In Row 1, add headers: Timestamp | Name | Email | Inquiry Type | Message
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code and click Save
 * 5. Click Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and paste it into script.js
 */

// If you have a CallMeBot API Key, enter it here (Get it free in 10 seconds: send "I allow callmebot to send me messages" on WhatsApp to +34 644 26 33 77)
var CALLMEBOT_API_KEY = ""; // e.g. "123456" (Optional)
var MY_PHONE_NUMBER = "918108901069";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        var parsed = {};
        e.postData.contents.split("&").forEach(function(part) {
          var item = part.split("=");
          parsed[decodeURIComponent(item[0])] = decodeURIComponent(item[1] || "");
        });
        data = parsed;
      }
    }

    var timestamp = new Date();
    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var inquiry = data.inquiry || data.inquiry_type || "General";
    var message = data.message || "";

    // 1. SAVE DIRECTLY TO GOOGLE SHEET (DATABASE)
    sheet.appendRow([timestamp, name, email, inquiry, message]);

    // 2. OPTIONAL SERVER-SIDE WHATSAPP ALERT (If CallMeBot key provided)
    if (CALLMEBOT_API_KEY && CALLMEBOT_API_KEY.trim() !== "") {
      try {
        var waMessage = "🔔 New Portfolio Lead!\n👤 Name: " + name + "\n✉️ Email: " + email + "\n🎯 Type: " + inquiry + "\n💬 Message: " + message;
        var waUrl = "https://api.callmebot.com/whatsapp.php?phone=" + MY_PHONE_NUMBER + "&text=" + encodeURIComponent(waMessage) + "&apikey=" + CALLMEBOT_API_KEY;
        UrlFetchApp.fetch(waUrl, { muteHttpExceptions: true });
      } catch (waErr) {
        Logger.log("WhatsApp alert error: " + waErr);
      }
    }

    // 3. RETURN CLEAN JSON WITHOUT ANY REDIRECT
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Inquiry saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Purav Dhanki Portfolio Form Backend is online.")
    .setMimeType(ContentService.MimeType.TEXT);
}

