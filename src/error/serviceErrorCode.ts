const errorPayload = (message: string) => (
    {
        message: message
    }
)

const SERVICE_ERROR = {
    NOT_AUTHENTICATED: errorPayload("Please Login!")
}

export default SERVICE_ERROR
