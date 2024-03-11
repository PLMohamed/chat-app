"use client";
import ChatBubble from "@/components/ui/ChatBubble";
import { auth } from "@/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";

export default function Chat() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) return <Loading />;
    if (user)
        return (
            <>
                <section className=" flex flex-col p-8 sm:ml-64">
                    <ChatBubble
                        message={"Hello my friend"}
                        time={"12:00"}
                        user={"User"}
                        image={"/accountImagePlaceholder.jpg"}
                        isMine={true}
                    />
                    <ChatBubble
                        message={"Hello"}
                        time={"12:00"}
                        user={"User"}
                        image={"/accountImagePlaceholder.jpg"}
                        isMine={false}
                    />
                </section>
            </>
        );
}
