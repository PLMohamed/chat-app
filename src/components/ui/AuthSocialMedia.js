import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SocialButton from "./SocialButton";

export default function AuthSocialMedia({
    googleText,
    googleOnClick,
    facebookText,
    facebookOnClick,
}) {
    return (
        <section>
            <div className="flex items-center gap-4">
                <hr className="h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
                <span className="-translate-y-px">or</span>
                <hr className="h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {googleText && (
                    <SocialButton
                        text={googleText}
                        onClick={googleOnClick}
                        icon={faGoogle}
                    />
                )}
                {facebookText && (
                    <SocialButton
                        text={facebookText}
                        onClick={facebookOnClick}
                        icon={faFacebook}
                    />
                )}
            </div>
        </section>
    );
}
