import { Response } from "express";
import admin from "firebase-admin";
import SERVICE_ERROR from "@/error/serviceErrorCode";

const validateToken = async (idToken: string | undefined, res: Response) => {
    try {
        const tokenPrefix = idToken?.split(" ").at(0);
        const token = idToken?.split(" ").at(1);

        if (tokenPrefix !== "Bearer" || !token) {
            res.status(SERVICE_ERROR.USER.NOT_AUTHENTICATED.status).json(SERVICE_ERROR.USER.NOT_AUTHENTICATED.message);
            throw Error("Unauthorized");
        }
        return await admin.auth().verifyIdToken(token);
    } catch (err) {
        return res.status(SERVICE_ERROR.USER.NOT_AUTHENTICATED.status).json(SERVICE_ERROR.USER.NOT_AUTHENTICATED.message);
    }
};

export default validateToken;
