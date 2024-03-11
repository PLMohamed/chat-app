"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SocialButton({ text, onClick, icon }) {
    return (
        <Link
            href="#"
            onClick={onClick}
            className="w-full cursor-pointer space-x-1 rounded-lg border border-gray-300 px-4 py-2 text-center font-medium hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <FontAwesomeIcon icon={icon} className="h-6 w-6 " />
            <span>{text}</span>
        </Link>
    );
}
