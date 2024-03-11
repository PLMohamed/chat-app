"use client";
import SideBar, { Loading } from "@/components/SideBar";
import { auth } from "@/firebase/client";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) return <Loading />;
    if (user) {
        return (
            <div>
                <h1>Welcome {user.displayName}</h1>
                <img src={user.photoURL} alt={user.displayName} />
                <SideBar />
            </div>
        );
    }
    if (!user) redirect("/auth/login");
}
