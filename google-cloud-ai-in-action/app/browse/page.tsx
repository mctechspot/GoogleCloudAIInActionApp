"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BrowseConfig from "@/app/config/browse.json";
import Header from "@/app/components/navigation/Header";
import Footer from "@/app/components/navigation/Footer";
import { FormEvent } from "react";
import { AsteroidExtendedType } from "@/app/types/asteroid";
import Asteroid from "@/app/components/asteroids/ListedAsteroid";

export default function Browse() {

    const [searchInput, setSearchInput]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [asteroids, setAsteroids]: [AsteroidExtendedType[] | null, Dispatch<SetStateAction<AsteroidExtendedType[] | null>>] = useState<AsteroidExtendedType[] | null>(null);

    const getAsteroids = async (): Promise<void> => {
        try {
            const apiUri: string = "/api/get-asteroids";
            const apiRes: Response = await fetch(apiUri, {
                "method": "GET"
            });
            if (apiRes.status === 200) {
                const asteroids: AsteroidExtendedType[] = await apiRes.json();
                setAsteroids(asteroids);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Error getting asteroids from server: ${error.message}`);
            }
            throw error;
        }
    }

    useEffect(() => {
        getAsteroids();
    }, []);

    const handlesearch = (event: FormEvent) => {
        try {
            event.preventDefault();
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
            <div className={"main-layout"}>

                <Header />

                {/* Main Content */}
                <div className={"main-content bg-offwhite"}>
                    <div className={""}>
                        <div className={"main-padding grid-vertical-gap-20px"}>
                            <p className={"heading-1 text-uppercase text-center"}>{BrowseConfig.en.title}</p>
                            <br />
                            <div className={"grid-vertical-gap-20px"}>
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
                                            onChange={(event) => setSearchInput(event.target.value ? event.target.value.trim() : "")} />
                                        <button id={"form-search-submit"} type={"submit"}>{BrowseConfig.en.search.button}</button>
                                    </div>
                                </form>

                                {asteroids ? (
                                    <>
                                        {/* List asteroids */}
                                        {asteroids.map((asteroid: AsteroidExtendedType) => {
                                            return (
                                                <Asteroid key={`asteroid-${asteroid._id}`}
                                                    asteroid={asteroid} />
                                            );
                                        })}
                                    </>
                                ) : ("")}

                            </div>

                        </div>
                    </div>
                </div>

                <Footer />

            </div>

        </>
    );
}