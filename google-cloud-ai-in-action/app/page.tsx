import Image from "next/image";
import HomeConfig from "@/app/config/home.json";

export default function Home() {
  return (
    <div className={"bg-navy text-white"}>
      <p>{HomeConfig.en.app_name}</p>
    </div>
  );
}
