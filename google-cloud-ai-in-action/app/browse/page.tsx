"use client"
import BrowseConfig from "@/app/config/browse.json";
import Header from "@/app/components/navigation/Header";
import { FormEvent } from "react";

export default function Browse() {
    const asteroids: string[] = [
        "(433) Eros",
        "(433) Eros",
        "(433) Eros",
        "(433) Eros",
        "(433) Eros",
        "(433) Eros",
        "(433) Eros"
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

    return (
        <>
            <Header />
            <div className={"bg-navy text-white min-100vh"}>
                <div className={"main-padding"}>
                    <p className={"heading-1 text-center"}>{BrowseConfig.en.title}</p>
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

                        <form method={"POST"} onSubmit={(event) => handlesearch(event)}>
                            <input type={"text"} placeholder={"Search for asteroid by name or number."} />
                        </form>

                        {/* List asteroids */}
                        {asteroids.map((asteroid: string, index: number) => {
                            return (
                                <button key={`asteroid-${index + 1}`} className={"asteroid-button"}
                                    type={"button"} onClick={() => console.log("ASTEROID")}>{asteroid}</button>
                            );
                        })}

                    </div>

                </div>
            </div>

        </>
    );
}