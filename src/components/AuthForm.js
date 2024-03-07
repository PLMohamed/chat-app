import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export default function AuthForm({ title, children }) {
    return (
        <div
            className={`mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 ${poppins.className}`}
        >
            <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {title}
                    </h1>
                    {children}
                </div>
            </div>
        </div>
    );
}
