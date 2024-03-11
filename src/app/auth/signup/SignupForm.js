"use client";

import AuthForm from "@/components/AuthForm";
import AuthSocialMedia from "@/components/ui/AuthSocialMedia";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/InputField";
import Link from "next/link";
import Alert from "@/components/Alert";
import { useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { redirect } from "next/navigation";
import { convertErrorCodeToMessage } from "@/lib/firebase";

export default function SignupForm() {
    const [errors, setErrors] = useState({});
    const [pending, setPending] = useState(false);

    async function handleSubmit(e) {
        setPending(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const username = formData.get("username");
        const errors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Validating data
        if (!email) errors.email = "Email is required";
        else if (!emailRegex.test(email))
            errors.email = "Invalid email address";

        if (!password) errors.password = "Password is required";
        else if (!passwordRegex.test(password))
            errors.password =
                "Password must contain at least 8 characters, including 1 letter and 1 number";

        if (!username) errors.username = "Username is required";
        else if (!usernameRegex.test(username))
            errors.username =
                "Username must contain 3 to 30 characters with no special characters";

        if (Object.keys(errors).length > 0) {
            setPending(false);
            return setErrors(errors);
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = userCredential.user;
            if (!user) throw new Error("User not found");

            await user.updateProfile({
                displayName: username,
            });
        } catch (error) {
            const errorMessage = await convertErrorCodeToMessage(error.code);
            return setErrors({ server: errorMessage });
        } finally {
            setPending(false);
        }
        redirect("/");
    }

    async function handleSignupWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);
            if (!userCredential) throw new Error("User not found");
        } catch (error) {
            const errorMessage = await convertErrorCodeToMessage(error.code);
            console.log(errorMessage, error.code);
            return setErrors({ server: errorMessage });
        }
        redirect("/");
    }

    return (
        <AuthForm title="Create an account">
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                onInput={(e) =>
                    delete errors[e.target.name] && setErrors({ ...errors })
                }
                noValidate
            >
                {errors.server && (
                    <Alert type="danger" message={errors.server} id="alert" />
                )}
                <InputField
                    title="Username"
                    type="text"
                    id="username"
                    placeholder="John Doe"
                    error={errors.username}
                />
                <InputField
                    title="Email"
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    error={errors.email}
                />
                <InputField
                    title="Password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    error={errors.password}
                />

                <Checkbox
                    title="I agree to the terms and privacy."
                    id="terms"
                    error={errors.terms}
                />
                <ButtonSubmit title="Sign up" pending={pending} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign in
                    </Link>
                </p>
                <AuthSocialMedia
                    googleText={"Sign up with Google"}
                    googleOnClick={handleSignupWithGoogle}
                />
            </form>
        </AuthForm>
    );
}
