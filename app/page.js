import Image from "next/image";
import Link from "next/link";
import FAQs from "./components/general/faqs";
import GetContent from "@/lib/wp/get-content";
import TextHightlight from "./components/animated/text-highlight";
import LowPowerModeVideo from "./components/general/low-power-mode-video";
import GenerateSignature from "@/lib/dapp/generate-signature";
import EligibleConditionsCarousel from "./components/carousels/eligible-conditions-carousel";
import NewsCarousel from "./components/carousels/news-carousel";
import Header from "./components/header/header";

export async function generateMetadata() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageContent {
            heroCelebrityPhoto {
                node {
                    sourceUrl
                }
            }
        }
    }
}
    `;
    const pageBy = (await GetContent(query)).pageBy;

    return {
        title: "Dr. Green: " + pageBy.title,
        description: "Your trusted source for medical cannabis.",
        openGraph: {
            images: [pageBy.pageContent.heroCelebrityPhoto.node.sourceUrl],
        },
    };
}

export default async function Home() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageSide {
            featuredStrainId
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
        pageContent {
            heroPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            heroCelebrityPhoto {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            largeParagraphText
            madePossibleParagraphText
            madePossibleBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            madePossibleCelebrityImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
    globalContent {
        eligibleConditions {
            condition {
                condition
                description
            }
        }
        threeSteps {
            steps {
                description
                icon {
                    node {
                        mediaDetails {
                            height
                            width
                        }
                        sourceUrl
                        title
                    }
                }
                title
            }
        }
    }
}
    `;
    const content = (await GetContent(query)).pageBy;
    const global = (await GetContent(query)).globalContent;

    const featuredStrainId = content.pageSide.featuredStrainId;
    const payload = { strainId: featuredStrainId };
    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );
    const strain = await getStrains.json();

    const feed = await fetch(
        "https://rss.app/feeds/v1.1/uE6LV8h0fRax2HfE.json",
        {
            method: "GET",
        }
    );

    const rssItems = (await feed.json()).items;


    const strains = [
        { name: 'Blue Dream', imgSrc: '/images/product/1.png', tags: ['CBG', 'THC-18'] },
        { name: 'Jack Herer', imgSrc: '/images/product/2.png', tags: ['CBG', 'THC-18'] },
        { name: 'Bubba Kush', imgSrc: '/images/product/3.png', tags: ['CBG', 'THC-18'] },
        { name: 'OG Kush', imgSrc: '/images/product/4.png', tags: ['CBG', 'THC-18'] },
    ];

    return (
        <main>
            <div className="relative h-max">
                {/* Background Video */}
                <div className="absolute top-0 z-0 overflow-hidden w-full h-full">
                    <video
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/wave.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <Header />

                {/* Hero Section */}
                <section className="relative pt-32 sm:pt-24 bg-gradient-to-b from-transparent to-white">
                    {/* Hero Content */}
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                        <div className="text-center">
                            <h1 className="text-primary text-lg sm:text-xl lg:text-2xl uppercase mb-4 sm:mb-6 font-semibold">
                                Welcome to Goldilocks
                            </h1>
                            <p className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-snug text-gray-900">
                                The Industry Leading <br className="hidden sm:block" />
                                Cannabis Marketplace
                            </p>
                        </div>
                        <div className="text-center mt-6 sm:mt-8">
                            <button className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg shadow-md hover:bg-green-700 transition duration-300">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full h-[400px] sm:h-[600px] lg:h-[800px] mt-6 sm:mt-12 relative">
                        <img
                            alt="Background"
                            src="/images/general/bg.png"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>
            </div>

            <section className="py-32 mx-auto max-w-5xl">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl pb-10 text-center">Shop by strain</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                            {strains.map((strain, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 shadow-md bg-white relative flex flex-col justify-center items-center"
                                    style={{ width: "100%", aspectRatio: "1 / 1" }} // Ensures a square aspect ratio
                                >
                                    {/* Image */}
                                    <img
                                        src={strain.imgSrc}
                                        alt={strain.name}
                                        className="h-3/5 object-contain mb-4"
                                    />

                                    {/* Tags */}
                                    <div className="flex gap-2 absolute top-3 right-2">
                                        {strain.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold mb-2 text-center">
                                        {strain.name}
                                    </h3>

                                    {/* Button */}
                                    <button className="bg-primary text-white py-3 font-light mt-5 px-4 rounded-full hover:bg-primary/90">
                                        Shop Now
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center">
                            <button className="bg-[#2b2b2b] text-white py-3 px-6 mt-6 font-normal rounded-full hover:bg-gray-800">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <div>
                {/* Top Section */}
                <section className="text-center py-12 px-6">
                    <p className="text-primary font-semibold uppercase tracking-wide mb-4">
                        Lorem Ipsum Dolor
                    </p>
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
                        Lorem ipsum dolor sit amet, consectetur elit, sed diam <br /> nonummy dolore
                        volutpat.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center text-center bg-white p-6">
                            <div className="bg-white p-4 rounded-[20px] mb-4 shadow">
                                <img src="/images/icons/Diamond.png" alt="" className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Title Goes Here</h3>
                            <p className="text-[#2b2b2b]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                                n
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex flex-col items-center text-center bg-white p-6">
                            <div className="bg-white p-4 rounded-[20px] mb-4 shadow">
                                <img src="/images/icons/Diamond.png" alt="" className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Title Goes Here</h3>
                            <p className="text-[#2b2b2b]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                                n
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex flex-col items-center text-center bg-white p-6">
                            <div className="bg-white p-4 rounded-[20px] mb-4 shadow">
                                <img src="/images/icons/Diamond.png" alt="" className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Title Goes Here</h3>
                            <p className="text-[#2b2b2b]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                                n
                            </p>
                        </div>
                    </div>
                </section>

                {/* "Refer to your doctor" Banner */}
                <section className="relative text-white py-32 px-6 mx-8 rounded-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center rounded-2xl"
                        style={{
                            backgroundImage: "url('/images/general/Refer.png')",
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-[#27a274] opacity-60 rounded-2xl"></div> {/* Overlay div */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <p className="text-sm uppercase tracking-wide font-bold mb-2">
                            Need a Prescription?
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[100px] font-semibold mb-6">
                            Refer to your doctor
                        </h2>
                        <button className="bg-black text-white py-4 px-6 font-medium rounded-full hover:bg-gray-800">
                            Refer Now
                        </button>
                    </div>
                </section>
            </div>


            <div className="px-4 md:px-12 lg:px-20 py-48 space-y-12 max-w-7xl mx-auto">
                {/* Product Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-20 lg:gap-20">
                    {/* Product Image and Tags */}
                    <div className="relative flex justify-center items-center">
                        <div className="border rounded-lg p-4">
                            <img
                                src="/images/general/buy.png" // Replace with your image path
                                alt="Gastro Pop"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                            <span className="bg-[#2b2b2b] text-white text-xs px-3 py-1 rounded-full">
                                CBC
                            </span>
                            <span className="bg-[#2b2b2b] text-white text-xs px-3 py-1 rounded-full">
                                THC-18
                            </span>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="pt-6 md:pt-20">
                        <p className="text-primary font-semibold uppercase tracking-wide mb-2">
                            Exclusive
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Gastro Pop
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Acapulco Gold, a rare sativa marijuana strain, is renowned for its
                            exceptional qualities.
                        </p>
                        <button className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90">
                            Buy Now
                        </button>
                        <div className="mt-6 space-y-1 text-[#2b2b2b] text-base sm:text-lg">
                            <p>
                                <span className="font-bold">Feelings:</span> Happy
                            </p>
                            <p>
                                <span className="font-bold">Helps With:</span> Stress
                            </p>
                            <p>
                                <span className="font-bold">Flavours:</span> Dark Chocolate
                            </p>
                            <p>
                                <span className="font-bold">Popularity:</span> 75
                            </p>
                        </div>
                    </div>
                </section>

                {/* Informational Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                            Made Possible by <br /> DR. Green
                        </h2>
                        <p className="text-[#2b2b2b] mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                            cannabis strains. Lorem ipsum dolor sit amet, consectetur euismod
                            tincidunt ut laoreet dolore aliquam erat volutpat.
                        </p>
                        <button className="bg-[#2b2b2b] text-white py-3 px-6 rounded-full hover:bg-[#2b2b2b]/90">
                            Learn More
                        </button>
                    </div>

                    {/* Informational Image */}
                    <div>
                        <img
                            src="/images/general/learnmore.png" // Replace with your image path
                            alt="Made Possible by DR. Green"
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </section>
            </div>


            <section className="relative pt-40" id="faqs">
                <div className="container mx-auto px-4">
                    <div>
                        <div className="text-start mb-20">
                            <h2 className="text-5xl sm:leading-tight font-semibold ">
                                Questions?
                            </h2>
                            <p className="text-[30px] text-primary font-light">
                                We&apos;ve got answers
                            </p>
                        </div>
                        <FAQs />
                    </div>
                </div>
            </section>

            <section className="py-28">
                <div className="container mx-auto px-4">
                    <div>
                        <div className="flex items-center gap-x-4 text-center">
                            <p className="text-[40px] font-semibold ">
                                Something else on your mind? 🧐
                            </p>
                            <Link href="mailto:support@drgreennft.com">
                                <button
                                    className="py-3 px-6 font-normal  rounded-full bg-[#2b2b2b] text-[#fbfbfb]  text-[26px] duration-200 ease-in-out"
                                    title="Reach Out"
                                >
                                    Reach Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section id="shop-by-strain" className="relative">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8">
                        Shop <br />
                        <span className="green-stroke">by strain</span>
                    </h2>
                    <ShopStrains />
                </div>
            </section> */}

            {/* <section className="mt-40 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold tracking-widest mb-8 text-[#fc69f8]">
                            NEED A PRESCRIPTION?
                        </p>
                        <h2 className="text-5xl sm:text-[74px] mb-12 secondary-font">
                            Check your eligibility
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button
                                className="secondary-font uppercase py-3 px-6 bg-transparent rounded-[7px] border border-[#fc69f8] border-2 text-[#fc69f8] text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                Check Eligibility
                            </button>
                        </Link>
                    </div>
                </div>
            </section> */}

            {/* <section className="mt-12 pt-40 pb-52 relative">
                <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none mask-top-bottom mix-blend-screen">
                    <LowPowerModeVideo
                        image={
                            <Image
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                src="/images/general/car.webp"
                                alt="Smoke"
                                width={1920}
                                height={1080}
                            />
                        }
                        video={
                            <video
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="none"
                                poster="/images/general/wave.png"
                                width={1920}
                                height={1080}
                            >
                                <source
                                    src="/videos/wave.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        }
                    />
                </div>
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="secondary-font">
                            Exclusive from {content.title}
                        </h2>
                    </div>
                    <div className="mx-auto sm:max-w-[80%] md:max-w-full backdrop-blur-[20px] rounded-[20px] border border-4 border-[#30e5f3] p-8 sm:p-16 mt-8 sm:mt-16 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <div className="relative w-[100%] lg:w-[80%] h-0 pb-[100%] lg:pb-[80%] mx-auto">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.data.imageUrl
                                }
                                alt={strain.data.name}
                                fill
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-6xl font-semibold secondary-font">
                                {strain.data.name}
                            </p>
                            <hr className="h-[2px] border-none bg-[#30e5f3] my-10" />
                            <p className="text-xl mb-4">
                                <span className="font-bold">FEELINGS: </span>
                                {strain.data.feelings}
                            </p>
                            <p className="text-xl mb-4">
                                <span className="font-bold">HELPS WITH: </span>
                                {strain.data.helpsWith}
                            </p>
                            <p className="text-xl mb-16">
                                <span className="font-bold">FLAVOURS: </span>
                                {strain.data.flavour}
                            </p>
                            <Link href="#eligibile-conditions">
                                <button
                                    className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                    title="Eligible Conditions"
                                >
                                    Eligible Conditions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="pt-40 sm:pt-80 pb-80 relative">
                <div className="container mx-auto px-4">
                    <div className="">
                        <TextHightlight
                            text={
                                <p
                                    className="text-4xl sm:text-5xl lg:text-5xl font-medium lg:leading-snug"
                                    dangerouslySetInnerHTML={{
                                        __html: content.pageContent
                                            .largeParagraphText,
                                    }}
                                />
                            }
                            class="home-text"
                        />
                    </div>
                </div>
            </section> */}

            {/* <section className="mt-20 sm:mt-0">
                <div className="container mx-auto px-4">
                    <div>
                        <p className="text-[#fc69f8] text-lg font-semibold tracking-widest mb-2">
                            NEWS / UPDATES
                        </p>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8 secondary-font">
                            Dr. Green In The Press
                        </h2>
                        <NewsCarousel items={rssItems} />
                    </div>
                </div>
            </section> */}

            {/* <section className="relative pb-32 pt-32 mt-40">
                <span className="absolute top-0 left-0 w-full h-full z-[-9] bg-[rgba(0,0,0,0.25)]" />
                <div className="mask-top-bottom absolute left-0 top-0 w-full h-full z-[-10] pointer-events-none">
                    <Image
                        className="absolute top-0 left-0 h-full w-full object-cover object-top"
                        src={
                            content.pageContent.madePossibleBackgroundImage.node
                                .sourceUrl
                        }
                        alt={
                            content.pageContent.madePossibleBackgroundImage.node
                                .title
                        }
                        width={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.height
                        }
                    />
                </div>
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] leading-tight font-semibold mb-4 secondary-font">
                            Made possible <br />
                            by Dr. Green
                        </h2>
                        <p
                            className="text-[22px] font-light max-w-[750px] mb-8"
                            dangerouslySetInnerHTML={{
                                __html: content.pageContent
                                    .madePossibleParagraphText,
                            }}
                        />
                        <Link href="https://drgreennft.com/" target="_blank">
                            <button
                                className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="Learn More"
                            >
                                Learn More
                            </button>
                        </Link>
                        <div className="mt-10 sm:mt-0 xl:mt-[-10%] pointer-events-none">
                            <div className="ml-auto w-fit flex flex-col justify-center items-center max-w-full">
                                <div className="h-0 pb-[100%] relative max-w-full w-[800px]">
                                    <Image
                                        className="absolute top-0 left-0 h-full w-full object-cover object-center rounded-full"
                                        src={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .sourceUrl
                                        }
                                        alt={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .title
                                        }
                                        width={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.width
                                        }
                                        height={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.height
                                        }
                                    />
                                </div>
                                <Image
                                    src="/images/general/shadow.webp"
                                    alt="Shadow"
                                    width={654}
                                    height={86}
                                    className="max-w-full w-[623px] h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


        </main >
    );
}
