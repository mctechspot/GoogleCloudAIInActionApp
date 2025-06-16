"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrbitClassType, OrbitClassTypeWrapperType, OrbitClassTypeDropdownType } from "@/types/asteroid"
import ChevronDownIcon from "@/app/components/icons/ChevronDownIcon";
import ChevronUpIcon from "@/app/components/icons/ChevronUpIcon";

export default function OrbitClassTypeDropdown({ orbitClassTypes }: OrbitClassTypeDropdownType) {

    const defaultHeaderText: string = "All Orbit Class Types";
    const [showOptions, setShowOptions]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    return (
        <>
            <div className={"orbit-class-type-dropdown-container"}>

                {/* Header */}
                <div className={"orbit-class-type-dropdown-header"}>
                    <div className={"orbit-class-type-dropdown-header-content"}>
                        <span>{defaultHeaderText}</span>
                        <button type={"button"}
                            className={"orbit-class-type-dropdown-toggle-button"}
                            onClick={() => setShowOptions(!showOptions)}>
                            {showOptions ? (
                                <ChevronUpIcon
                                    height={20}
                                    width={20}
                                    colour={"#121F33"}
                                />
                            ) : (
                                <ChevronDownIcon
                                    height={20}
                                    width={20}
                                    colour={"#121F33"}
                                />
                            )}
                        </button>

                    </div>
                </div>

                {/* Options */}
                {showOptions ? (
                    <div className={"orbit-class-type-dropdown-options"}>
                        {orbitClassTypes.map((orbitClassType: OrbitClassType, index: number) => {
                            return (
                                <button key={orbitClassType._id} className={`orbit-class-type-dropdown-option
                                    ${index === 0 ? "orbit-class-type-dropdown-option-first" : index === orbitClassTypes.length - 1 ? "orbit-class-type-dropdown-option-last" : "orbit-class-type-dropdown-option-middle"}`}>
                                    {orbitClassType.name}
                                </button>
                            );
                        })}
                    </div>
                ) : ("")}

            </div>

        </>
    );
}