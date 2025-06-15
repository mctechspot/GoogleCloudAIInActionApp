"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { AsteroidExtendedWrapperType } from "@/types/asteroid";
import ChevronDown from "@/app/components/icons/ChevronDown";
import ChevronUp from "@/app/components/icons/ChevronUp";
import AsteroidConfig from "@/app/config/asteroid.json";
import { prettifyDate } from "@/app/utils/formatter";
import PDFIcon from "@/app/components/icons/PDFIcon";

export default function ListedAsteroid({ asteroid, reportNotification, setReportNotification }: AsteroidExtendedWrapperType) {
    const [showDetails, setShowDetails]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const generatePDFReport = async (): Promise<void> => {
        try {
            setReportNotification({
                status: 202,
                message: `Generating report for asteroid ${asteroid.name}.`,
                asteroidName: asteroid.name
            });
            const apiUri: string = "/api/generate-asteroid-report";
            const pdfResponse: Response = await fetch(apiUri, {
                method: "POST",
                body: JSON.stringify(asteroid),
                headers: {
                    "Content-type": "application/json"
                },
            });
            if (pdfResponse.status === 200) {
                console.error(`Report generated for asteroid ${asteroid.name}`);
                // Download returned link
                const blob = await pdfResponse.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `asteroid_${asteroid.name.replace(" ", "_")}_report.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setReportNotification({
                    status: 200,
                    message: `Successfully generated report for asteroid ${asteroid.name}.`,
                    asteroidName: asteroid.name
                });
            } else if (pdfResponse.status === 503) {
                console.error(`Model to generate report is overloaded.`);
                setReportNotification({
                    status: 503,
                    message: `Model to generate report on asteroid ${asteroid.name} is overloaded. Try again later.`,
                    asteroidName: asteroid.name
                });
            }
            else {
                console.error(`Error generating report: ${pdfResponse.status}: ${pdfResponse.statusText}: ${pdfResponse.text}`);
                setReportNotification({
                    status: 500,
                    message: `Error generating report for asteroid ${asteroid.name}.`,
                    asteroidName: asteroid.name
                });
            }
        } catch (error: unknown) {
            let message: string = `Error generating PDF report on asteroid ${asteroid.name}`;
            if (error instanceof Error) {
                message += `: ${error.message}`;
            }
            console.error(message);
            throw error;
        }
    }

    return (
        <>
            <div className={"listed-asteroid-container"}>

                <div className={"grid-vertical-gap-10px"}>

                    {/* Name and Toggle Button Section */}
                    <div className={"listed-asteroid-name-section"}>

                        <span className={"text-uppercase font-weight-900"}>{asteroid.name}</span>

                        {/* Toggle Details Button */}
                        <button className={"listed-asteroid-button"}
                            type={"button"} onClick={() => setShowDetails(!showDetails)}>
                            {showDetails ? (
                                <ChevronUp
                                    height={20}
                                    width={20}
                                    colour={"#121F33"}
                                />
                            ) : (
                                <ChevronDown
                                    height={20}
                                    width={20}
                                    colour={"#121F33"}
                                />
                            )}

                        </button>
                    </div>

                    {showDetails ? (
                        <>

                            {/* Details */}
                            <div className={"listed-asteroid-details"}>

                                <div className={"listed-asteroid-details-separator"}></div>

                                <div className={"listed-asteroid-details-section"}>

                                    {/* Generate PDF button */}
                                    <button disabled={reportNotification && reportNotification.status === 202 ? true : false}
                                        type={"button"} className={`button-asteroid-pdf-generator ${reportNotification && reportNotification.status ? "cursor-default": ""}`}
                                        onClick={() => generatePDFReport()}>
                                        <PDFIcon
                                            height={30}
                                            width={30}
                                            colour={reportNotification && reportNotification.status === 202 ? "#8D9AAF" : "#121F33"}
                                        />
                                    </button>

                                    {/* Name */}
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.name}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.name}
                                    </div>
                                </div>

                                {/* Absolute Magnitude */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.absolute_magnitude_h}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.absolute_magnitude_h}
                                    </div>
                                </div>

                                {/* Estimated Minimum Diameter */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.estimated_diameter_min}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.estimated_diameter_min}
                                    </div>
                                </div>

                                {/* Estimated Maximum Diameter */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.estimated_diameter_max}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.estimated_diameter_max}
                                    </div>
                                </div>

                                {/* Is Potentially Hazardous */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.is_potentially_hazardous}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.is_potentially_hazardous}
                                    </div>
                                </div>

                                {/* Orbit Id */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.orbit_id}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.orbit_id}
                                    </div>
                                </div>

                                {/* Orbit Determination Date */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.orbit_determination_date}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {prettifyDate(asteroid.orbit_determination_date, true)}
                                    </div>
                                </div>

                                {/* First Observation Date */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.first_observation_date}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {prettifyDate(asteroid.first_observation_date, false)}
                                    </div>
                                </div>

                                {/* Last Observation Date */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.last_observation_date}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {prettifyDate(asteroid.last_observation_date, false)}
                                    </div>
                                </div>

                                {/* Semi Major Axis */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.semi_major_axis}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.semi_major_axis}
                                    </div>
                                </div>

                                {/* Inclination */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.inclination}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.inclination}
                                    </div>
                                </div>

                                {/* Orbit Class Type */}
                                <div className={"listed-asteroid-orbit-class-container grid-vertical-gap-10px"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.orbit_class_type.title}
                                    </div>
                                    <div className={"listed-asteroid-orbit-class-type"}>

                                        {/* Orbit Class Type Abbreviation */}
                                        <div className={"listed-asteroid-orbit-class-type-section"}>
                                            <span className={"font-weight-900"}>{AsteroidConfig.en.details.orbit_class_type.details.abbreviation}</span>
                                            <span>{asteroid.orbit_class_type.abbreviation}</span>
                                        </div>

                                        {/* Orbit Class Type Name */}
                                        <div className={"listed-asteroid-orbit-class-type-section"}>
                                            <span className={"font-weight-900"}>{AsteroidConfig.en.details.orbit_class_type.details.name}</span>
                                            <span>{asteroid.orbit_class_type.name}</span>
                                        </div>

                                        {/* Orbit Class Type Description */}
                                        <div className={"listed-asteroid-orbit-class-type-section"}>
                                            <span className={"font-weight-900"}>{AsteroidConfig.en.details.orbit_class_type.details.description}</span>
                                            <span>{asteroid.orbit_class_type.description}</span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </>
                    ) : ("")}


                </div>

            </div>

        </>
    );
}