import PasswordResetForm from "../components/forms/pass-reset-form";

export default async function ResetPassword() {
    return (
        <main>
            <section className="pt-20 relative">
                <div className="container mx-auto px-4">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-semibold secondary-font">
                            Reset Password
                        </h1>
                    </div>
                    <PasswordResetForm />
                </div>
            </section>
        </main>
    );
}
