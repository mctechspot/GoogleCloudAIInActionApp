"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BrowseConfig from "@/app/config/browse.json";
import Header from "@/app/components/navigation/Header";
import { FormEvent } from "react";
import { AsteroidExtendedType } from "@/app/types/asteroid";
import Asteroid from "@/app/components/asteroids/ListedAsteroid";

export default function Browse() {

    const [searchInput, setSearchInput]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");


    const asteroids: AsteroidExtendedType[] = [{
        _id: "2001580",
        name: "1580 Betulia (1950 KA)",
        absolute_magnitude_h: 14.67,
        estimated_diameter_min: 3.0942469862,
        estimated_diameter_max: 6.9189466003,
        is_potentially_hazardous: false,
        orbit_id: "324",
        orbit_determination_date: "2025-02-18 05:50:30",
        first_observation_date: "1952-10-27 00:00:00",
        last_observation_date: "2025-02-17 00:00:00",
        semi_major_axis: 2.195302581929946,
        inclination: 52.18774063207562,
        orbit_class_type: {
            _id: "ae46690e-0e16-4efe-b8f1-766bb5fbbe7d",
            abbreviation: "AMO",
            name: "Amor-class Asteroid",
            description: "These asteroids have orbits that fall strictly outside the Earth's orbit.",
            colour: "#4287F5"
        }
    },
    {
        _id: "2001221",
        name: "1221 Amor (1932 EA1)",
        absolute_magnitude_h: 17.37,
        estimated_diameter_min: 0.8923905787,
        estimated_diameter_max: 1.9954459964,
        is_potentially_hazardous: false,
        orbit_id: "143",
        orbit_determination_date: "2025-02-20 05:51:07",
        first_observation_date: "1932-03-12 00:00:00",
        last_observation_date: "2025-02-19 00:00:00",
        semi_major_axis: 1.919760465125785,
        inclination: 11.86862228590597,
        orbit_class_type: {
            _id: "ae46690e-0e16-4efe-b8f1-766bb5fbbe7d",
            abbreviation: "AMO",
            name: "Amor-class Asteroid",
            description: "These asteroids have orbits that fall strictly outside the Earth's orbit.",
            colour: "#4287F5"
        }
    }
    ];

    const handlesearch = (event: FormEvent) => {
        try {
            event.preventDefault();
            console.log("SEARCH");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Error handling asteroid search: ${error.message}`);
                throw error;
            }
        }
    }

    useEffect(() => {
        console.log(searchInput);
    }, [searchInput]);

    return (
        <>
            <Header />
            <div className={"bg-gradient text-white min-100vh"}>
                <div className={"main-padding"}>
                    <p className={"heading-1 text-uppercase text-center"}>{BrowseConfig.en.title}</p>
                    <br />
                    <div className={"grid-vertical-gap-10px"}>
                        {BrowseConfig.en.description.map((paragraph: string, index: number) => {
                            return (
                                <p key={`browse-description-paragraph-${index + 1}`}
                                    className={"text-justify"}>
                                    {paragraph}
                                </p>
                            );
                        })}

                        {/* Search Form */}
                        <form id={"form-search"} method={"POST"} onSubmit={(event) => handlesearch(event)}>
                            <div id={"form-search-content"}>
                                <input id={"form-search-input"} className={"input-text"} type={"text"} placeholder={BrowseConfig.en.search.placeholder}
                                onChange={(event) => setSearchInput(event.target.value ? event.target.value.trim(): "")} />
                                <button id={"form-search-submit"} type={"submit"}>{BrowseConfig.en.search.button}</button>
                            </div>
                        </form>

                        {/* List asteroids */}
                        {asteroids.map((asteroid: AsteroidExtendedType, index: number) => {
                            return (
                                <Asteroid key={`asteroid-${asteroid._id}`}
                                    asteroid={asteroid} />
                            );
                        })}

                    </div>

                </div>
            </div>

        </>
    );
}