import Image from "next/image";

export default function ChatBubble({ message, time, user, image, isMine }) {
    return (
        <>
            <article
                className={`flex w-full  ${isMine ? " justify-end" : " justify-start"}`}
            >
                <div
                    className={`flex  gap-2.5 ${isMine ? "flex-row-reverse " : "items-start justify-start"}
                    `}
                >
                    <Image
                        src={image}
                        alt={user}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                    />
                    <div
                        className={`leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700 ${isMine ? "bg-primary-600 text-white dark:bg-primary-600" : "bg-white text-gray-900 dark:text-white"} `}
                    >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {time}
                            </span>
                        </div>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                            {message}
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
}

export function ChatBubbleLoading({ isMine }) {
    return (
        <article
            className={`flex w-full  ${isMine ? " justify-end" : " justify-start"} animate-pulse`}
        >
            <div
                className={`flex  gap-2.5 ${isMine ? "flex-row-reverse " : "items-start justify-start"}
                    `}
            >
                <div className="aspect-square h-8 w-8 rounded-full bg-gray-500"></div>
                <div
                    className={`leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700  `}
                >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="h-3 w-12 text-sm font-semibold text-gray-900 dark:text-white"></span>
                        <span className="h-3 w-4 text-sm font-normal text-gray-500 dark:text-gray-400"></span>
                    </div>
                    <p className="h-3 w-20 py-2.5 text-sm font-normal text-gray-900 dark:text-white"></p>
                </div>
            </div>
        </article>
    );
}
