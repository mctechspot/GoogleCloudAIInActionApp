"use client"
import Link from "next/link";
import Header from "@/app/components/navigation/Header";
import Footer from "@/app/components/navigation/Footer";
import PaperPlaneIcon from "@/app/components/icons/PaperPlaneIcon";
import ErrorConfig from "@/app/config/error.json";

export default function Error() {

  return (
    <>
      <div className={"main-layout"}>

        <Header />

        <div className={"main-content bg-offwhite"}>
          <div className={"main-padding grid-vertical-gap-20px"}>
            <p className={"text-center"}>{ErrorConfig.en.error_500.message}</p>
            <Link href={ErrorConfig.en.error_500.direct.link} className={"text-center error-page-button"}>
              <span>{ErrorConfig.en.error_500.direct.text}</span>
              <PaperPlaneIcon
                height={20}
                width={20}
                colour={"#FFFFFF"}
              />
            </Link>
          </div>

        </div>

        <Footer />

      </div >

    </>

  );
}
