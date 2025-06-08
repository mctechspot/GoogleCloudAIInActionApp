import { AsteroidExtendedWrapperType } from "@/app/types/asteroid";

export default function ListedAsteroid({asteroid}: AsteroidExtendedWrapperType) {
    return (
        <>
            <button className={"asteroid-button"}
                type={"button"} onClick={() => console.log("ASTEROID")}>{asteroid.name}</button>
        </>
    );
}