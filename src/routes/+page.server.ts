// authenticate to google docs using service account

import { docs_v1, google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import privateKey from '../../credentials.json';


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/documents'];

// load service account credentials
try {
  const jwtClient = new google.auth.JWT(
    privateKey.client_email,
    undefined,
    privateKey.private_key,
    SCOPES,
  );

  // authenticate request
  jwtClient.authorize(async (err, tokens) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Successfully connected!");
  });

  // create google docs client
  const docs = google.docs({
    version: 'v1',
    auth: jwtClient,
  });

  doDocumentThings(docs);
} catch (err) {
  console.log(err);
}

async function doDocumentThings(docs: docs_v1.Docs) {
  const foo = await docs.documents.get({
    documentId: '1b9JyQlbY_qQWeTTElPT5UeumOArohRlgOv27E2cOZ8I',
  })

  console.log(foo.data);
}
