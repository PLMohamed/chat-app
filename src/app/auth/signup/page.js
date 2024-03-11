"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import SignupForm from "./SignupForm";
import { auth } from "@/firebase/client";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

export default function Signup() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) return <Loading />;
    if (user) redirect("/");
    if (!user) return <SignupForm />;
}
