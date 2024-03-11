"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";

/**
 * @param {String} message
 * @param {Enumerator: "danger" | "success" | "info"} type
 * @returns {JSX.Element}
 */
export default function Alert({ message, type, id }) {
    const alertRef = useRef(null);
    const buttonRef = useRef(null);
    const { pending } = useFormStatus();

    // Reset style when reSending the form
    if (pending)
        alertRef.current.classList.remove(
            "hidden",
            "translate-x-full",
            "opacity-0",
        );

    // Close the alert
    const closeAlert = () => {
        alertRef.current.classList.add(
            "transition-all",
            "duration-300",
            "ease-in-out",
            "translate-x-full",
            "opacity-0",
        );
        setTimeout(() => {
            alertRef.current.classList.add("hidden");
        }, 300);
    };

    switch (type) {
        case "danger":
            return (
                <div
                    id={id}
                    className="mb-4 flex items-center rounded-lg border border-gray-300 bg-red-50 p-4 text-red-800  dark:border-gray-600 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    ref={alertRef}
                >
                    <svg
                        className="h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">{message}</div>
                    <button
                        type="button"
                        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                        data-dismiss-target={`#${id}`}
                        aria-label="Close"
                        ref={buttonRef}
                        onClick={closeAlert}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            );
            break;

        default:
            return null;
    }
}
