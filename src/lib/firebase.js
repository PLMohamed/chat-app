// Function to convert Firebase error codes to messages
export function convertErrorCodeToMessage(errorCode) {
    let errorMessage = "";

    switch (errorCode) {
        case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
        case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
        case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
        case "auth/email-already-exists":
            errorMessage = "Email already exists.";
            break;
        case "auth/invalid-credential":
            errorMessage = "Invalid credential.";
            break;
        case "auth/too-many-requests":
            errorMessage = "Too many requests. Try again later.";
            break;
        case "auth/email-already-exists":
            errorMessage = "Email already exists.";
            break;
        default:
            errorMessage = "An error occurred. Please try again later.";
            break;
    }

    return errorMessage;
}
