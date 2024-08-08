import admin, { ServiceAccount } from "firebase-admin";
import firebaseServiceKey from "../firebase.json";

const firebaseAdminConfig = {
    credential: admin.credential.cert(firebaseServiceKey as ServiceAccount),
    firestore: process.env.DATABASE_URL,
};

const firebaseApp = admin.initializeApp(firebaseAdminConfig);

export default firebaseApp;
