"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarItem, { LoadingItem } from "./SideBarItem";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/firebase/client";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SideBar() {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, loading1, error1] = useSignOut(auth);
    if (loading) return <Loading />;

    if (!user) redirect("/auth/login");
    if (user)
        return (
            <>
                <aside
                    id="sidebar"
                    className="fixed left-0 top-0 z-40 flex h-screen w-64 -translate-x-full flex-col bg-neutral-100 transition-transform sm:translate-x-0 dark:bg-gray-800"
                >
                    <div className="flex items-center justify-between bg-primary-600 p-4 text-white dark:bg-primary-600">
                        <span className="text-2xl font-semibold ">Chats</span>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="cursor-pointer text-xl"
                        />
                    </div>
                    <div className="flex h-full flex-col justify-between  py-4 ">
                        <ul className="space-y-4 px-3 font-medium">
                            <SideBarItem
                                img="/accountImagePlaceholder.jpg"
                                title="User"
                                text="my last message"
                            />
                            <SideBarItem
                                img="/accountImagePlaceholder.jpg"
                                title="User"
                                text="my last message"
                            />
                        </ul>
                        <div className="flex space-x-2 border-t px-5 py-3 pt-4 dark:border-gray-400">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <Link
                                href="#"
                                className="flex flex-col overflow-x-hidden"
                                onClick={async () => {
                                    const result = await signOut();
                                    if (result) redirect("/auth/login");
                                }}
                            >
                                <span className="text-lg">
                                    {user.displayName}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </span>
                            </Link>
                        </div>
                    </div>
                </aside>
            </>
        );
}

export function Loading() {
    return (
        <>
            <aside
                id="sidebar"
                className="fixed left-0 top-0 z-40 flex h-screen w-64 -translate-x-full flex-col bg-neutral-100 transition-transform sm:translate-x-0 dark:bg-gray-800"
            >
                <div className="flex items-center justify-between bg-primary-600 p-4 text-white dark:bg-primary-600">
                    <span className="text-2xl font-semibold ">Chats</span>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="cursor-pointer text-xl"
                    />
                </div>
                <div className="flex h-full flex-col justify-between  py-4 ">
                    <ul className="space-y-4 px-3 font-medium">
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                    </ul>
                    <div className="flex space-x-2 border-t px-5 py-3 pt-4 dark:border-gray-400">
                        <LoadingItem />
                    </div>
                </div>
            </aside>
        </>
    );
}
