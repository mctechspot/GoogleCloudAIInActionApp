import Link from "next/link";
import Image from "next/image";
import HeaderConfig from "@/app/config/header.json";
import HomeConfig from "@/app/config/home.json";
import AsteroidsImage from "@/public/asteroids.png";
import ChevronRight from "@/app/components/icons/ChevronRight";

export default function Home() {


  const startYear: number = 2025;
  const currentYear: number = new Date().getFullYear();
  const yearText: string = currentYear > startYear ? `${startYear} - ${currentYear}` : `${currentYear}`;

  return (
    <div className={"home-container bg-navy text-center text-white"}>
      <div className={"home-container-left"}>
        <Image
          className={"home-banner-image"}
          src={AsteroidsImage}
          alt={"Asteroids"}
        />
      </div>

      <div className={"home-container-right grid-vertical-gap-20px"}>
        <div className={"home-container-right-top grid-vertical-gap-20px"}>
          <p className={"font-size-1-4rem font-weight-900"}>{HomeConfig.en.brand_name}</p>
          <p className={"heading-2"}>{HomeConfig.en.tag_line}</p>


          {/* Info */}
          <Link className={"home-explore-link"}
            href={HeaderConfig.en.nav.info.link}>
            <span>
              {HeaderConfig.en.nav.info.title}
            </span>
            <ChevronRight
              height={20}
              width={20}
              colour={"#FFFFFF"}
            />
          </Link>

          {/* Browse collection */}
          <Link className={"home-explore-link"}
            href={HeaderConfig.en.nav.browse.link}>
            <span>
              {HeaderConfig.en.nav.browse.title}
            </span>
            <ChevronRight
              height={20}
              width={20}
              colour={"#FFFFFF"}
            />
          </Link>

        </div>
        <div className={"home-container-right-bottom"}>
          &copy; {yearText} {HomeConfig.en.brand_name}
        </div>
      </div>
    </div>

  );
}
