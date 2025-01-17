"use client";
import { userLogin } from "@/lib/form-actions/actions";
import { useRef, useState, useActionState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm(props) {
    const [state, action, isPending] = useActionState(userLogin, undefined);
    const [invalid, setInvalid] = useState(null);
    const [success, setSuccess] = useState(null);
    const form = useRef("");
    const router = useRouter();

    async function attemptLogin(signInOptions) {
        form.current.reset();
        const test = await signIn("credentials", signInOptions);
        if (test.status == 401) {
            setInvalid("Incorrect credentials.");
        } else if (test.status != 200) {
            setInvalid(
                "Internal system error. Please contact support, or try again."
            );
        } else {
            setSuccess("Redirecting...");
            setInvalid(null);
            router.push(props.callbackUrl || "/dashboard/account");
        }
    }

    if (state?.success) {
        const signInOptions = {
            username: state.username,
            password: state.password,
            redirect: false,
        };
        attemptLogin(signInOptions);
    }

    return (
        <form
            ref={form}
            action={action}
            id="login"
            name="login"
            className="max-w-[600px] mx-auto text-center grid grid-cols-1 gap-4"
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="username">Username</label>
                    <div>
                        <input
                            required
                            name="username"
                            id="username"
                            type="text"
                            autoComplete="username"
                            className="p-4 rounded-[7px] border-2 border-[#30e5f3] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.username && (
                        <p className="text-[#30e5f3]">
                            {state?.errors?.username}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input
                            required
                            name="password"
                            id="password"
                            type="password"
                            autoComplete="password"
                            className="p-4 rounded-[7px] border-2 border-[#30e5f3] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.password && (
                        <p className="text-[#30e5f3]">
                            {state?.errors?.password}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <button
                    type="submit"
                    title="LOGIN"
                    className={`secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center ${
                        isPending ? "pointer-events-none" : ""
                    }`}
                >
                    LOGIN
                    <svg
                        className={`animate-spin h-4 w-4 text-black ${
                            isPending ? "inline" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </button>
                <p>Or</p>
                <Link href="/register">
                    <button
                        title="REGISTER"
                        className="secondary-font uppercase py-3 px-6 bg-transparent rounded-[7px] border border-[#fc69f8] border-2 text-[#fc69f8] text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                    >
                        REGISTER
                    </button>
                </Link>
            </div>
            {invalid && <p className="text-[#30e5f3] text-center">{invalid}</p>}
            {success && <p className="text-[#fc69f8] text-center">{success}</p>}
        </form>
    );
}
