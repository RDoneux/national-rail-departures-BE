/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
// import * as express from "express";
import { GoogleMapsService } from "./google-maps/google-maps.services";
import { Server } from "./server";

// const server = express();

// server.get("/test-endpoint", (request, response) => {
//   response.send("hello world");
// });

const server = new Server(3000, [new GoogleMapsService()]);

exports.app = functions.https.onRequest(server.server);
