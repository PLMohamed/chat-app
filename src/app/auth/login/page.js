"use client";
import Loading from "@/app/loading";
import LoginForm from "./LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import { redirect } from "next/navigation";

export default function Login() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) return <Loading />;
    if (user) redirect("/");
    if (!user);
    return <LoginForm />;
}
