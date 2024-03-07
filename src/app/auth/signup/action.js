"use server";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function createUser(prevState, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordCapitalLetterRegex = /^(?=.*[A-Z])/;
    const passwordNumberRegex = /^(?=.*\d)/;
    const passwordFinalRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    // Validating data
    if (!username) errors.username = "Username is required";
    else if (!usernameRegex.test(username))
        errors.username = "Username must be alphanumeric only";

    if (!email) errors.email = "Email is required";
    else if (!emailRegex.test(email)) errors.email = "Invalid email address";

    if (!password) errors.password = "Password is required";
    else if (!passwordCapitalLetterRegex.test(password))
        errors.password = "Password must contain at least one capital letter";
    else if (!passwordNumberRegex.test(password))
        errors.password = "Password must contain at least one number";
    else if (!passwordFinalRegex.test(password))
        errors.password = "Password must be at least length 6";

    if (Object.keys(errors).length > 0) return errors;

    // Creating user
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = userCredential.user;
        await user.updateProfile({
            displayName: username,
        });
        // cookies().set("auth", REFRESHTOKEN , {
        //     path: "/",
        //     maxAge: 30 * 24 * 60 * 60,
        // });
    } catch (error) {
        return { server: error.message };
    }
}
