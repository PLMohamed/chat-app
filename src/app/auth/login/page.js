import AuthForm from "@/components/AuthForm";
import AuthSocialMedia from "@/components/ui/AuthSocialMedia";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/InputField";
import Link from "next/link";

export default function Login() {
    return (
        <AuthForm title="Sign in to your account">
            <form className="space-y-4 md:space-y-6" action="#">
                <InputField
                    title="Email"
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                />
                <InputField
                    title="Password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <Checkbox title="Remember me" id="remember" />
                    </div>
                    <Link
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Forgot password?
                    </Link>
                </div>
                <ButtonSubmit title="Sign in" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account yet?{" "}
                    <Link
                        href="signup"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign up
                    </Link>
                </p>
                <AuthSocialMedia googleText={"Sign in with Google"} />
            </form>
        </AuthForm>
    );
}
