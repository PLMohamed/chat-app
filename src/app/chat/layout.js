import SideBar from "@/components/SideBar";

export default function ChatLayout({ children }) {
    return (
        <>
            <SideBar />
            {children}
        </>
    );
}
