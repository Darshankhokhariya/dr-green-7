import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import CartAccount from "./cart-account";
import GetContent from "@/lib/wp/get-content";

export default async function Header() {
    const session = await getServerSession(options);
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        pageContent {
            menuIcon {
                node {
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            menuIconText
            menuLogo {
                node {
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                title
            }
        }
    }
}
    `;
    const pageContent = (await GetContent(query)).pageBy.pageContent;
    const featuredImage = (await GetContent(query)).pageBy.featuredImage.node;

    return (
        <>
            <header className="sticky top-0 left-0 w-full z-[1000]">
                <div className="py-5 sm:py-10">
                    <div className="container mx-auto px-4 2xl:max-w-[calc(100%_-_5rem)]">
                        <div className="grid grid-cols-3 items-center">
                            <div className="flex justify-start items-center gap-4">

                                <Image
                                    src="/images/icons/menu.svg"
                                    alt="Planet Icon"
                                    width={30} // Provide a width in pixels
                                    height={30} // Provide a height in pixels
                                    priority
                                    className="max-w-[30px] sm:max-w-full h-auto"
                                />
                                <Image
                                    src="/images/general/main.png"
                                    alt="Planet Icon"
                                    width={50} // Provide a width in pixels
                                    height={50} // Provide a height in pixels
                                    priority
                                    className="max-w-[30px] sm:max-w-full h-auto"
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <Link href="/">
                                    <Image
                                        src="/images/logos/dr-green-logo.png" // Local image path
                                        alt="Website Logo"
                                        width={88} // Replace with the actual width of your image
                                        height={95} // Replace with the actual height of your image
                                        priority
                                    />
                                </Link>
                            </div>
                            
                            <CartAccount session={session} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
