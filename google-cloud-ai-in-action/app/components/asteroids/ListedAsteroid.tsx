"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { AsteroidExtendedWrapperType } from "@/app/types/asteroid";
import ChevronDown from "@/app/components/icons/ChevronDown";
import ChevronUp from "@/app/components/icons/ChevronUp";
import AsteroidConfig from "@/app/config/asteroid.json";

export default function ListedAsteroid({ asteroid }: AsteroidExtendedWrapperType) {
    const [showDetails, setShowDetails]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    return (
        <>
            <div className={"listed-asteroid-container"}>

                <div className={"grid-vertical-gap-10px"}>

                    {/* Name and Toggle Button Section */}
                    <div className={"listed-asteroid-name-section"}>
                        <span>{asteroid.name}</span>

                        {/* Toggle Details Button */}
                        <button className={"listed-asteroid-button"}
                            type={"button"} onClick={() => setShowDetails(!showDetails)}>
                            {showDetails ? (
                                <ChevronUp
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            ) : (
                                <ChevronDown
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            )}

                        </button>
                    </div>

                    {showDetails ? (
                        <>
                            {/* Details */}
                            <div className={"listed-asteroid-details"}>

                                <div className={"listed-asteroid-details-separator"}></div>

                                {/* Name */}
                                <div className={"listed-asteroid-details-section"}>
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
                                        {asteroid.orbit_determination_date}
                                    </div>
                                </div>

                                {/* First Observation Date */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.first_observation_date}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.first_observation_date}
                                    </div>
                                </div>

                                {/* Last Observation Date */}
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.last_observation_date}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.last_observation_date}
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
                                <div className={"listed-asteroid-details-section"}>
                                    <div className={"listed-asteroid-title font-weight-900"}>
                                        {AsteroidConfig.en.details.orbit_class_type}
                                    </div>
                                    <div className={"listed-asteroid-value"}>
                                        {asteroid.orbit_class_type.name}
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