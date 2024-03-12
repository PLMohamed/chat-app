"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarItem, { LoadingItem } from "./SideBarItem";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "@/firebase/client";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { getUserInfo } from "@/utils/users";

export default function SideBar() {
    const [user, loading, error] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const [snapshot] = useCollection(collection(db, "chat"));
    const chats = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const chatExists = (uid) =>
        chats?.find(
            (chat) => chat.users.includes(user.uid) && chat.users.includes(uid),
        );

    if (loading) return <Loading />;
    if (user)
        return (
            <>
                <aside
                    id="sidebar"
                    className="fixed left-0 top-0 z-40 mr-64 flex h-screen w-64 -translate-x-full flex-col bg-neutral-100 transition-transform sm:translate-x-0 dark:bg-gray-800"
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
                            {chats?.map(async (chat) => {
                                const friend = chat.users.find(
                                    (uid) => uid !== user.uid,
                                );
                                if (!friend) return null;
                                const friendInfo = await getUserInfo(friend);
                                return (
                                    <SideBarItem
                                        key={chat.id}
                                        index={chat.id}
                                        img={
                                            friendInfo.avatar ||
                                            "/accountImagePlaceholder.jpg"
                                        }
                                        title={friendInfo.username}
                                        text="none"
                                    />
                                );
                            })}
                        </ul>
                        <div className="flex space-x-2 border-t px-5 py-3 pt-4 dark:border-gray-400">
                            <img
                                src={
                                    user.photoURL ||
                                    "/accountImagePlaceholder.jpg"
                                }
                                alt={user.displayName}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div
                                className="flex cursor-pointer flex-col overflow-x-hidden"
                                onClick={async () => {
                                    await signOut();
                                }}
                            >
                                <span className="text-lg">
                                    {user.displayName}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </span>
                            </div>
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
