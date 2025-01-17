import DeleteAccountButton from "@/app/components/dashboard/buttons/delete-account-button";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
export const dynamic = "force-dynamic";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";

export default async function Account() {
    const user = (await getServerSession(options))?.user;

    const adminApprovalClass = {
        PENDING: "text-white",
        VERIFIED: "text-[#fc69f8]",
        REJECTED: "text-white",
    };

    return (
        <>
            <div className="block md:hidden mb-10">
                <Link
                    href="/dashboard"
                    className="text-xl font-semibold flex items-center gap-2"
                >
                    <Image
                        src="/images/icons/back-arrow.svg"
                        alt="Back Arrow"
                        width="31"
                        height="18"
                    />
                    Back
                </Link>
            </div>
            <div className="md:grid grid-cols-8 gap-8">
                <div className="col-span-2 relative hidden md:block">
                    <DashboardNav />
                </div>
                <div className="rounded-[20px] border-2 border-[#30e5f3] p-8 xl:p-20 col-span-6">
                    <p className="text-3xl md:text-5xl font-semibold mb-8 secondary-font">
                        Account
                    </p>
                    <div className="grid sm:grid-cols-2 gap-x-20 gap-y-4 mb-8">
                        <ul className="flex flex-col gap-4">
                            <li>
                                Username:{" "}
                                <strong className="break-words">
                                    {user?.username}
                                </strong>
                            </li>
                            <li>
                                Name:{" "}
                                <strong>{`${user?.dappUser?.firstName} ${user?.dappUser?.lastName}`}</strong>
                            </li>
                            <li>
                                Email:{" "}
                                <strong className="break-words">
                                    {user?.dappUser?.email}
                                </strong>
                            </li>
                            <li>
                                Contact Number:{" "}
                                <strong>
                                    {`${user?.dappUser?.phoneCode}${user?.dappUser?.contactNumber}`}
                                </strong>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-4">
                            <li>
                                Active:{" "}
                                <strong>
                                    {user?.dappUser?.isActive ? (
                                        <span className="text-[#fc69f8]">
                                            YES
                                        </span>
                                    ) : (
                                        <span className="text-white">NO</span>
                                    )}
                                </strong>
                            </li>
                            <li>
                                KYC Verified:{" "}
                                <strong>
                                    {user?.dappUser?.isKYCVerified ? (
                                        <span className="text-[#fc69f8]">
                                            YES
                                        </span>
                                    ) : (
                                        <span className="text-white">
                                            PENDING
                                        </span>
                                    )}
                                </strong>
                            </li>
                            <li>
                                Admin Approval:{" "}
                                <strong>
                                    {
                                        <span
                                            className={
                                                adminApprovalClass[
                                                    user?.dappUser
                                                        ?.adminApproval
                                                ]
                                            }
                                        >
                                            {user?.dappUser?.adminApproval}
                                        </span>
                                    }
                                </strong>
                            </li>
                        </ul>
                    </div>
                    <hr className="border-none h-[2px] bg-[#30e5f3] mb-8" />
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <Link href="/reset-password">
                            <button
                                className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="RESET PASSWORD"
                            >
                                RESET PASSWORD
                            </button>
                        </Link>
                        <DeleteAccountButton user={user?.dappUser} />
                    </div>
                </div>
            </div>
        </>
    );
}
