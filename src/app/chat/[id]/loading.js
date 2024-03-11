import { ChatBubbleLoading } from "@/components/ui/ChatBubble";

export default function Loading() {
    return (
        <div className="flex h-screen flex-col space-y-2 p-8 sm:ml-64">
            <ChatBubbleLoading isMine={true} />
            <ChatBubbleLoading isMine={false} />
            <ChatBubbleLoading isMine={false} />
            <ChatBubbleLoading isMine={true} />
        </div>
    );
}
