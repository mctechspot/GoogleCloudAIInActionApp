import Image from "next/image";
import InfoConfig from "@/app/config/info.json";
import Header from "@/app/components/navigation/Header";
import Footer from "@/app/components/navigation/Footer";
import AsteroidImage from "@/public/asteroids.jpeg";

export default function Info() {

    return (
        <>
            <div className={"main-layout"}>
                <Header />

                {/* Main Content */}
                <div className={"main-content bg-offwhite"}>
                    <div className={""}>
                        <div className={"main-padding grid-vertical-gap-20px"}>
                            <p className={"heading-1 text-uppercase text-center"}>{InfoConfig.en.title}</p>
                            <div className={"info-image-container block-center"}>
                                <Image
                                    className={"info-image"}
                                    src={AsteroidImage}
                                    alt={"Asteroids"}
                                />
                            </div>
                            <div className={"grid-vertical-gap-20px"}>
                                {InfoConfig.en.description.map((paragraph: string, index: number) => {
                                    return (
                                        <p key={`browse-description-paragraph-${index + 1}`}
                                            className={"text-justify"}>
                                            {paragraph}
                                        </p>
                                    );
                                })}

                            </div>

                        </div>
                    </div>

                    <Footer />
                </div>

            </div>

        </>
    );
}