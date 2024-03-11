import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
    weight: ["400", "500"],
    subsets: ["latin"],
});

export default function SideBarItem({ img, title, text }) {
    return (
        <li>
            <Link
                href="#"
                className={`group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${inter.className}`}
            >
                <Image
                    src={img}
                    alt={title}
                    width={48}
                    height={48}
                    className="flex-shrink-0 rounded-full"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/accountImagePlaceholder.png";
                    }}
                />
                <div className="ms-3">
                    <p className="text-lg font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {title}
                    </p>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        {text}
                    </p>
                </div>
            </Link>
        </li>
    );
}

export function LoadingItem() {
    return (
        <li className="list-none">
            <Link
                href="#"
                className={`group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700`}
            >
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-500"></div>
                <div className="ms-3 space-y-2">
                    <p className=" h-3 w-20 animate-pulse rounded-lg bg-gray-500 text-lg font-medium"></p>
                    <p className="h-3 w-28 animate-pulse rounded-lg bg-gray-500 text-sm font-light text-gray-500 dark:text-gray-400"></p>
                </div>
            </Link>
        </li>
    );
}
