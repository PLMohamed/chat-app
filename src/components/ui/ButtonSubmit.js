"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import { useFormStatus } from "react-dom";

const poppins = Poppins({
    weight: ["500"],
    subsets: ["latin"],
});

export default function ButtonSubmit({ title, className, pending, ...props }) {
    return (
        <button
            type="submit"
            disabled={pending}
            aria-disabled={pending}
            className={`w-full  rounded-lg bg-primary-600  px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-300 dark:bg-primary-600 dark:focus:ring-primary-800 
            ${pending ? "cursor-not-allowed opacity-50" : "hover:bg-primary-700 dark:hover:bg-primary-700 "}
            ${poppins.className}
            ${className}`}
            {...props}
        >
            {title}
            {pending && (
                <FontAwesomeIcon icon={faSpinner} spin className="ml-2" />
            )}
        </button>
    );
}
