import Image from "next/image";
import HomeConfig from "@/app/config/home.json";
import AsteroidsImage from "@/public/asteroids.jpeg";

export default function Home() {
  return (
    <div className={"home-container bg-navy"}>
      <Image
        src={AsteroidsImage}
        alt={"Asteroids"}
        height={100}
        width={100}
      />
    </div>
  );
}
