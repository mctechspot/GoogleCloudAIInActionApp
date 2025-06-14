"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import BrowseConfig from "@/app/config/browse.json";
import Header from "@/app/components/navigation/Header";
import Footer from "@/app/components/navigation/Footer";
import { FormEvent } from "react";
import { AsteroidExtendedType } from "@/app/types/asteroid";
import Asteroid from "@/app/components/asteroids/ListedAsteroid";
import AsteroidsLoader from "@/public/asteroids-loader.gif";
import { PaginationType, PaginationWrapperType } from "@/app/types/pagination";
import Pagination from "@/app/components/asteroids/Pagination";

export default function Browse() {

    const [searchInput, setSearchInput]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [asteroids, setAsteroids]: [AsteroidExtendedType[] | null, Dispatch<SetStateAction<AsteroidExtendedType[] | null>>] = useState<AsteroidExtendedType[] | null>(null);
    const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const defaultEntryCountPerPage: number = 10;
    const defaultCurrentPageIndex: number = 0;
    const [pagination, setPagination]: [PaginationType | null, Dispatch<SetStateAction<PaginationType | null>>] = useState<PaginationType | null>(null);

    const getAsteroids = async (): Promise<void> => {
        setError(false);
        setAsteroids(null);
        try {
            const apiUri: string = "/api/get-asteroids";
            const apiRes: Response = await fetch(apiUri, {
                "method": "GET"
            });
            if (apiRes.status === 200) {
                const asteroids: AsteroidExtendedType[] = await apiRes.json();
                setAsteroids(asteroids);
                setPagination({
                    entryCount: asteroids.length,
                    entryCountPerPage: defaultEntryCountPerPage,
                    currentPageIndex: defaultCurrentPageIndex
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Error getting asteroids from server: ${error.message}`);
            }
            setError(true);
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
                            <div className={"grid-vertical-gap-20px"}>
                                {BrowseConfig.en.description.map((paragraph: string, index: number) => {
                                    return (
                                        <p key={`browse-description-paragraph-${index + 1}`}
                                            className={"text-center"}>
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

                                {asteroids && pagination ? (
                                    <>

                                        {/* Pagination */}
                                        <Pagination
                                            pagination={pagination}
                                            setPagination={setPagination}
                                        />

                                        {/* List asteroids */}
                                        {asteroids.slice(pagination.currentPageIndex * pagination.entryCountPerPage, pagination.currentPageIndex * pagination.entryCountPerPage + pagination.entryCountPerPage).map((asteroid: AsteroidExtendedType) => {
                                            return (
                                                <Asteroid key={`asteroid-${asteroid._id}`}
                                                    asteroid={asteroid} />
                                            );
                                        })}

                                        {/* Pagination */}
                                        <Pagination
                                            pagination={pagination}
                                            setPagination={setPagination}
                                        />
                                    </>
                                ) : (

                                    <>
                                        {/* Loader Here */}
                                        <div className={"loader-container"}>
                                            <div className={"loader"}></div>
                                        </div>
                                        
                                        {/*<div className={"asteroids-loader-container"}>
                                            <Image
                                                className={"asteroids-loader"}
                                                src={AsteroidsLoader}
                                                alt={"Asteroids Loader"}
                                                height={100}
                                                width={100}
                                            />
                                        </div>*/}
                                    </>

                                )}

                                {error ? (
                                    <>
                                        <p className={"text-center"}>An error has occured. Try again later.</p>
                                    </>
                                ) : ("")}

                            </div>

                        </div>
                    </div>
                </div>

                <Footer />

            </div >

        </>
    );
}