import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SocialButton from "./SocialButton";

export default function AuthSocialMedia({ googleText, facebookText }) {
    return (
        <section>
            <div className="flex items-center gap-4">
                <hr className="h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                <span className="-translate-y-px">or</span>
                <hr className="h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {googleText && (
                    <SocialButton text={googleText} href="#" icon={faGoogle} />
                )}
                {facebookText && (
                    <SocialButton
                        text={facebookText}
                        href="#"
                        icon={faFacebook}
                    />
                )}
            </div>
        </section>
    );
}
