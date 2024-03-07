"use client";

export default function InputField({
    title,
    type,
    id,
    placeholder,
    required,
    error,
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {title}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
                ${error ? "border-red-600 dark:border-red-400" : " "}`}
                placeholder={placeholder}
                required={required}
                onKeyDown={handleKeyDown}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
