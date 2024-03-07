export default function Checkbox({ title, id }) {
    return (
        <div className="flex space-x-3">
            <div className="relative ">
                <input
                    id={id}
                    aria-describedby={id}
                    type="checkbox"
                    className="focus:ring-3 peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
                <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-primary-600 peer-checked:block dark:text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <label
                htmlFor={id}
                className=" cursor-pointer select-none text-sm text-gray-500 dark:text-gray-300"
            >
                {title}
            </label>
        </div>
    );
}
