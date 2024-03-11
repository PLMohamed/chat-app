import { getAuthState } from "@/utils/userState";

export async function getUserData() {
    const user = await getAuthState();
    if (user) {
        return {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };
    }
    return null;
}
