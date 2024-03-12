import { db } from "@/firebase/client";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export async function storeUserInfo(uid, email, username, avatar) {
    const userRef = doc(db, "users", uid);

    const result = setDoc(userRef, {
        email: email,
        username: username,
        avatar: avatar,
    });

    if (result) return true;
    return false;
}

export async function getUserInfo(uid) {
    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);
    if (user.exists()) return user.data();
    return null;
}
