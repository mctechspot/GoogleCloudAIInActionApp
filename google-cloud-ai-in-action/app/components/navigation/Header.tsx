import Link from "next/link";
import Asteroid from "@/app/components/icons/Asteroid";

export default function Header() {
    return (
        <>
            <header id={"header"} className={"bg-navy text-white"}>
                <div className={"header-content-left"}>
                    <div className={"header-content"}>
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
                </div>

                <div className={"header-content-right"}>
                    <div className={"header-content-nav"}>

                    </div>
                </div>

            </header>
        </>
    );
}