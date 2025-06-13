import Link from "next/link";
import Asteroid from "@/app/components/icons/Asteroid";
import HeaderConfig from "@/app/config/header.json";

export default function Header() {
    return (
        <>
            <header id={"header"} className={"bg-navy text-white"}>
                <div className={"header-content"}>
                    {/* Logo */}
                    <div className={"header-content-left"}>
                        <Link href={"/"}>
                            <div className={"header-logo-container"}>
                                <Asteroid
                                    height={50}
                                    width={50}
                                    colour={"#FFFFFF"}
                                />
                                <span>Asteroid Collection</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className={"header-content-right"}>
                        <div className={"header-content-nav"}>
                            <Link href={HeaderConfig.en.nav.info.link}>{HeaderConfig.en.nav.info.title}</Link>
                            <Link href={HeaderConfig.en.nav.browse.link}>{HeaderConfig.en.nav.browse.title}</Link>
                        </div>
                    </div>
                </div>



            </header>
        </>
    );
}