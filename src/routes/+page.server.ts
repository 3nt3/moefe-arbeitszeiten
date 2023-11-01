// // authenticate to google docs using service account
//
// import { docs_v1, google } from 'googleapis';
// import { authenticate } from '@google-cloud/local-auth';
// import privateKey from '../../credentials.json';
//
//
// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/documents'];
//
// // load service account credentials
// try {
//   const jwtClient = new google.auth.JWT(
//     privateKey.client_email,
//     undefined,
//     privateKey.private_key,
//     SCOPES,
//   );
//
//   // authenticate request
//   jwtClient.authorize(async (err, tokens) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Successfully connected!");
//   });
//
//   // create google docs client
//   const docs = google.docs({
//     version: 'v1',
//     auth: jwtClient,
//   });
//
//   doDocumentThings(docs);
// } catch (err) {
//   console.log(err);
// }
//
// async function doDocumentThings(docs: docs_v1.Docs) {
//   const document = await docs.documents.get({
//     documentId: '1b9JyQlbY_qQWeTTElPT5UeumOArohRlgOv27E2cOZ8I',
//   })
//
//   document.data.
// }
// import createReport from 'docx-templates';
import createReport from 'docx-templates';
import fs from 'fs';
import { exec } from 'child_process';

const template = fs.readFileSync('template.docx');

// find all workdays in a month
const dates = [];
const month = 11;
const year = 2023;

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
  "August", "September", "Oktober", "November", "Dezember"];

const date = new Date(year, month - 1, 1);
while (date.getMonth() === month - 1) {
  const day = date.getDay();
  if (day !== 0 && day !== 6) {
    dates.push({ name: date.toLocaleDateString("de-DE"), fridayXML: day === 5 ? '||<w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="decffc" /></w:tcPr>||' : ''});
  }
  date.setDate(date.getDate() + 1);
}

const buffer = await createReport({
  template,
  data: {
    dates,
    month: months[month - 1],
    year
  },
  cmdDelimiter: ['{', '}'],
  literalXmlDelimiter: '||'
});

fs.writeFileSync('report.docx', buffer)
console.log("generated successfully")

// open generated file
exec('open report.docx');

