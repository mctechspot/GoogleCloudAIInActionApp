"use client"
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Asteroid from "@/app/components/icons/AsteroidIcon";
import HeaderConfig from "@/app/config/header.json";
import CloseIcon from "@/app/components/icons/CloseIcon";
import HamburgerIcon from "@/app/components/icons/HamburgerIcon";

export default function Header() {

    const [showCondensedNav, setShowCondensedNav]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const condensedNavRef: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        
        document.addEventListener("click", handleOutsideCondensedNavClick);

        return(() => {
            document.removeEventListener("click", handleOutsideCondensedNavClick);
        });

    }, [showCondensedNav]);

    const handleOutsideCondensedNavClick = (event: MouseEvent): void => {
        const condensedNavElement: HTMLDivElement | null = condensedNavRef.current;
        const path = event.composedPath();

        if(condensedNavElement && !path.includes(condensedNavElement)){
            setShowCondensedNav(false);
        }
    }
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

                        {/* Standard Navigation */}
                        <div className={"header-content-nav"}>
                            <Link href={HeaderConfig.en.nav.info.link}>{HeaderConfig.en.nav.info.title}</Link>
                            <Link href={HeaderConfig.en.nav.browse.link}>{HeaderConfig.en.nav.browse.title}</Link>
                        </div>

                        {/* Condensed Navigation */}
                        <div className={"header-content-nav-condensed"}>
                            <button type={"button"}
                                onClick={() => setShowCondensedNav(!showCondensedNav)}>
                                <HamburgerIcon
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            </button>
                            {showCondensedNav ? (
                                <div className={"header-content-nav-condensed-content"}>
                                    {/* Close Icon */}
                                    <button className={"header-content-nav-condensed-close-button"}
                                        type={"button"}
                                        onClick={() => setShowCondensedNav(!showCondensedNav)}>
                                        <CloseIcon
                                            height={20}
                                            width={20}
                                            colour={"#FFFFFF"}
                                        />
                                    </button>

                                    <div className={"header-content-nav-condensed-content-nav"} ref={condensedNavRef}>
                                        <Link href={HeaderConfig.en.nav.info.link} className={"text-center"}>{HeaderConfig.en.nav.info.title}</Link>
                                        <Link href={HeaderConfig.en.nav.browse.link} className={"text-center"}>{HeaderConfig.en.nav.browse.title}</Link>
                                    </div>
                                </div>
                            ) : ("")}
                        </div>
                    </div>
                </div>

            </header>
        </>
    );
}