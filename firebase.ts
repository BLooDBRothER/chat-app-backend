import admin, { ServiceAccount } from "firebase-admin";
import { config } from "dotenv";
import firebaseServiceKey from './firebase.json';

config();

const firebaseAdminConfig = {
    credential: admin.credential.cert(firebaseServiceKey as ServiceAccount),
    firestore: process.env.DATABASE_URL
};

admin.initializeApp(firebaseAdminConfig);
