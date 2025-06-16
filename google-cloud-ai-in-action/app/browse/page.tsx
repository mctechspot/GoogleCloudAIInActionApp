"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BrowseConfig from "@/app/config/browse.json";
import Header from "@/app/components/navigation/Header";
import Footer from "@/app/components/navigation/Footer";
import { FormEvent } from "react";
import { AsteroidExtendedType, OrbitClassType } from "@/types/asteroid";
import ListedAsteroid from "@/app/components/asteroids/ListedAsteroid";
import { PaginationType } from "@/types/pagination";
import { ReportNotificationType } from "@/types/report";
import Pagination from "@/app/components/asteroids/Pagination";
import ReportNotification from "@/app/components/asteroids/ReportNotification";
import { SearchFormType } from "@/types/form";
import OrbitClassTypeDropdown from "@/app/components/dropdowns/OrbitClassTypeDropdown";

export default function Browse() {

    const [searchInput, setSearchInput]: [SearchFormType, Dispatch<SetStateAction<SearchFormType>>] = useState<SearchFormType>({ input: "" });
    const [asteroids, setAsteroids]: [AsteroidExtendedType[] | null, Dispatch<SetStateAction<AsteroidExtendedType[] | null>>] = useState<AsteroidExtendedType[] | null>(null);
    const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const defaultEntryCountPerPage: number = 10;
    const defaultCurrentPageIndex: number = 0;
    const [pagination, setPagination]: [PaginationType | null, Dispatch<SetStateAction<PaginationType | null>>] = useState<PaginationType | null>(null);
    const [reportNotification, setReportNotification]: [ReportNotificationType | null, Dispatch<SetStateAction<ReportNotificationType | null>>] = useState<ReportNotificationType | null>(null);
    const defaultOrbitClassTypes: OrbitClassType[] = [
        {
            _id: '5fded3d8-61e0-407a-8e0c-d834c5fac6b8',
            abbreviation: 'ATE',
            name: 'Aten-class Asteroid',
            description: "These asteroids have orbits that cross the Earth's orbit and have a semi-major axis less than 1 AU."
        },
        {
            _id: '3eecf3b1-3e6c-4da7-937d-8bde7c6dc8c3',
            abbreviation: 'APO',
            name: 'Appollo-class Asteroid',
            description: "These asteroids have orbits that cross the Earth's orbit and have a semi-major axis greater than 1 AU."
        },
        {
            _id: '1a71ed5c-1f31-45a1-8e3e-98c91fa640dd',
            abbreviation: 'IEO',
            name: 'Inner Earth Object (Atiras)',
            description: "These asteroids have orbits that fall strictly within the Earth's orbit."
        },
        {
            _id: '12b41059-abe0-4b94-b67b-24c34f6b2869',
            abbreviation: 'AMO',
            name: 'Amor-class Asteroid',
            description: "These asteroids have orbits that fall strictly outside the Earth's orbit."
        }
    ];

    const getAsteroids = async (): Promise<void> => {
        setError(false);
        setAsteroids(null);
        try {
            const apiUri: string = `/api/get-asteroids?filter=${searchInput.input}`;
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
                console.error(`Error getting asteroids from server: ${error.message}`);
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
            getAsteroids();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error handling asteroid search: ${error.message}`);
                throw error;
            }
        }
    }

    return (
        <>
            <div className={"main-layout"}>

                <Header />

                {/* Main Content */}
                <div className={"main-content bg-offwhite"}>

                    {/* Report Notification */}
                    {reportNotification ? (
                        <ReportNotification
                            reportNotification={reportNotification}
                            setReportNotification={setReportNotification}
                        />
                    ) : ("")}

                    <div className={""}>
                        <div className={"main-padding grid-vertical-gap-20px"}>
                            <p className={"heading-1 font-weight-900 text-center"}>{BrowseConfig.en.title}</p>
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
                                            onChange={(event) => setSearchInput({ input: event.target.value ? event.target.value.trim() : "" })} />
                                        <button id={"form-search-submit"} type={"submit"}>{BrowseConfig.en.search.button}</button>
                                    </div>
                                </form>

                                {/* Orbit Class Types Dropdown */}

                                <OrbitClassTypeDropdown
                                    orbitClassTypes={defaultOrbitClassTypes}
                                />

                                {asteroids && pagination ? (
                                    <>
                                        {/* List asteroids */}
                                        {asteroids.length > 0 ? (
                                            <>
                                                {/* Pagination */}
                                                <Pagination
                                                    pagination={pagination}
                                                    setPagination={setPagination}
                                                />
                                                {asteroids.slice(pagination.currentPageIndex * pagination.entryCountPerPage, pagination.currentPageIndex * pagination.entryCountPerPage + pagination.entryCountPerPage).map((asteroid: AsteroidExtendedType) => {
                                                    return (
                                                        <ListedAsteroid key={`asteroid-${asteroid._id}`}
                                                            asteroid={asteroid}
                                                            reportNotification={reportNotification}
                                                            setReportNotification={setReportNotification}
                                                        />
                                                    );
                                                })}
                                                {/* Pagination */}
                                                <Pagination
                                                    pagination={pagination}
                                                    setPagination={setPagination}
                                                />
                                            </>

                                        ) : (
                                            <p className={"text-center"}>
                                                No asteroids found based on your search filter. Adjust and try again.
                                            </p>
                                        )}

                                    </>
                                ) : (

                                    <>
                                        {/* Loader Here */}
                                        <div className={"loader-container"}>
                                            <div className={"loader"}></div>
                                        </div>

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