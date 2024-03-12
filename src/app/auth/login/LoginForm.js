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
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { convertErrorCodeToMessage } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { storeUserInfo } from "@/utils/users";

export default function LoginForm() {
    const [errors, setErrors] = useState({});
    const [pending, setPending] = useState(false);

    async function handleSubmit(e) {
        setPending(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const errors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        // Validating data
        if (!email) errors.email = "Email is required";
        else if (!emailRegex.test(email))
            errors.email = "Invalid email address";

        if (!password) errors.password = "Password is required";

        if (Object.keys(errors).length > 0) {
            setPending(false);
            return setErrors(errors);
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = userCredential.user;
            if (!user) throw new Error("User not found");
        } catch (error) {
            const errorMessage = await convertErrorCodeToMessage(error.code);
            console.log(errorMessage, error.code);
            return setErrors({ server: errorMessage });
        } finally {
            setPending(false);
        }
        redirect("/");
    }

    async function handleLoginWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);
            if (!userCredential) throw new Error("User not found");
            const user = userCredential.user;

            await storeUserInfo(
                user.uid,
                user.email,
                user.displayName,
                user.photoURL,
            );
        } catch (error) {
            const errorMessage = await convertErrorCodeToMessage(error.code);
            console.log(errorMessage, error.code);
            return setErrors({ server: errorMessage });
        }
        redirect("/");
    }

    return (
        <AuthForm title="Sign in to your account">
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                onInput={(e) =>
                    delete errors[e.target.name] && setErrors({ ...errors })
                }
                noValidate
            >
                {errors?.server && (
                    <Alert type="danger" message={errors.server} id="alert" />
                )}
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
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <Checkbox title="Remember me" id="remember" />
                    </div>
                    <Link
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Forgot password?
                    </Link>
                </div>
                <ButtonSubmit title="Sign in" pending={pending} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account yet?{" "}
                    <Link
                        href="signup"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign up
                    </Link>
                </p>
                <AuthSocialMedia
                    googleText={"Sign in with Google"}
                    googleOnClick={handleLoginWithGoogle}
                />
            </form>
        </AuthForm>
    );
}
