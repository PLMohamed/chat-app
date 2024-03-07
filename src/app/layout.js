import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const metadata = {
    title: "Chat App",
    description: "A simple chat app for connecting with friends and family.",
    keywords: [
        "chat",
        "app",
        "react",
        "socket.io",
        "nextjs",
        "node.js",
        "html",
        "css",
        "javascript",
        "js",
        "web",
        "tailwindcss",
        "tailwind",
        "firebase",
        "web development",
        "messenger",
        "chat app",
        "chat application",
        "chat room",
        "chat with friends",
        "chat with family",
        "chat with people",
        "chat with others",
        "chat with strangers",
        "chat with anyone",
        "chat with everyone",
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className=" bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
                {children}
            </body>
        </html>
    );
}
