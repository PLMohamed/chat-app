"use client";

import AuthForm from "@/components/AuthForm";
import AuthSocialMedia from "@/components/ui/AuthSocialMedia";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/InputField";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createUser } from "./action";

export default function SignupForm() {
    const [errors, formAction] = useFormState(createUser, {});
    return (
        <AuthForm title="Create an account">
            <form
                className="space-y-4 md:space-y-6"
                action={formAction}
                onInput={(e) => delete errors[e.target.name]}
            >
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
                <ButtonSubmit title="Sign up" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign in
                    </Link>
                </p>
                <AuthSocialMedia googleText={"Sign up with Google"} />
            </form>
        </AuthForm>
    );
}
