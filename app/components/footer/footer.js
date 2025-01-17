import Image from "next/image";
import Link from "next/link";
import LowPowerModeVideo from "../general/low-power-mode-video";

export default async function Footer() {
    return (
        <footer className="relative pt-32 pb-4 sm:pb-10 container mx-auto">
            <div className="container mx-auto px-4">
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-8 items-center">
                    <Image
                        className=""
                        src="/images/general/dr-green-logo.png"
                        alt="Dr Green Digital Key"
                        width={217}
                        height={85}
                    />
                    <div>
                        {/* <p className="uppercase opacity-50 text-[19px] font-semibold tracking-wider mb-4">
                            SOCIALS
                        </p> */}
                        <div className="flex items-center gap-x-8 xl:gap-x-8 gap-y-4 flex-wrap">
                            <Link
                                href="https://www.facebook.com/drgreennftportugal"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Facebook.svg"
                                    alt="Facebook"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://twitter.com/DrGreen_nft"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/x.svg"
                                    alt="X"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://www.instagram.com/drgreen"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Insta.png"
                                    alt="Insta"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/company/drgreennft"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Linkedin.svg"
                                    alt="LinkedIn"
                                    width={16}
                                    height={16}
                                />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@DrGreen_NFT"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Youtube.svg"
                                    alt="YouTube"
                                    width={18}
                                    height={18}
                                />
                            </Link>
                            <Link
                                href="https://discord.gg/DrGreen"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Discord.svg"
                                    alt="Discord"
                                    width={16}
                                    height={13}
                                />
                            </Link>
                            <Link
                                href="https://opensea.io/collection/dr-green-digital-key"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Opensea.svg"
                                    alt="Opensea"
                                    width={17}
                                    height={15}
                                />
                            </Link>
                            <Link
                                href="https://www.pinterest.co.uk/DrGreenNFT"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Pinterest.svg"
                                    alt="Pinterest"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://t.me/DrGreenNFTentry"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/telegram.svg"
                                    alt="Telegram"
                                    width={18}
                                    height={17}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-x-8 gap-y-20 mt-16 sm:mt-20">
                    <div className="flex flex-col sm:flex-row justify-start items-start gap-16">
                        {/* Support Section */}
                        <div>
                            <p className="opacity-50 text-[19px] font-semibold tracking-wider mb-4">
                                Support
                            </p>
                            <div className="flex flex-col gap-y-4">
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    FAQs
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div>
                            <p className="opacity-50 text-[19px] font-semibold tracking-wider mb-4">
                                Quick Links
                            </p>
                            <div className="flex flex-col gap-y-4">
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    The Process
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    News
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Legal Section */}
                        <div>
                            <p className="opacity-50 text-[19px] font-semibold tracking-wider mb-4">
                                Legal
                            </p>
                            <div className="flex flex-col gap-y-4">
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    Terms
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    Privacy
                                </Link>
                                <Link
                                    href="/"
                                    className="text-base font-medium font-montserrat"
                                >
                                    Cookies
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div>
                        <p className=" text-[22px] font-medium text-[#2b2b2b] tracking-wider mb-4">
                            Join the community
                        </p>
                        <p className="text-base text-[#2b2b2b] mb-2">
                            Register your details today to ensure you&apos;re
                            among the chosen few who get to witness the dawn of
                            a new era in Cannabis Delivery. Your Digital Key
                            awaits you!
                        </p>
                        <div className="w-full flex items-center space-x-4 py-4">
                            <input
                                required
                                name="email"
                                id="email"
                                type="text"
                                placeholder="Email Address"
                                className="p-2 flex-grow rounded-[7px] border-2 bg-[#2B2B2B] text-[#2b2b2b] bg-opacity-10 outline-0"
                            />
                            <button
                                className="uppercase py-4 px-6 rounded-full bg-[#0aba90] border border-[#0aba90] text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                Submit
                            </button>
                        </div>

                        <p className="text-[13px] from-neutral-300 tracking-tight">
                            Your data will be used to process your submission,
                            support your experience throughout this website, and
                            for other purposes described in our{" "}
                            <Link href="/">privacy policy.</Link>
                        </p>
                    </div>
                </div>
                <div className="py-24 flex justify-between">
                    <p className="text-xs font-bold">
                        2024 &copy; DR GREEN NFT
                    </p>
                    <Link
                        className="text-xs font-bold"
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        BY ALPHAGEEK
                    </Link>
                </div>
            </div>
        </footer>
    );
}