const errorPayload = (status:number, errorCode: string, message: string) => ({
    status,
    errorCode,
    message
});

const SERVICE_ERROR = {
    ALL: {
        INVALID_REQUEST: errorPayload(400, "INVALID_REQUEST", "Invalid Request")
    },
    USER: {
        NOT_AUTHENTICATED: errorPayload(401, "NOT_AUTHENTICATED", "Please Login!"),
        NO_USER_FOUND: errorPayload(404, "NO_USER_FOUND", "No User Found")
    },
    GROUP: {
        NO_GROUP_FOUND: errorPayload(404, "NO_GROUP_FOUND", "No Group Found"),
    },
    NOTIFICATION: {
        NOTIFICATION_TRIGGERED: errorPayload(400, "NOTIFICATION_TRIGGERED", "Notification Already Triggered")
    }
};

export default SERVICE_ERROR;
