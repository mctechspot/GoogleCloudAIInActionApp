"use client"
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { OrbitClassType, OrbitClassTypeDropdownType } from "@/types/asteroid"
import ChevronDownIcon from "@/app/components/icons/ChevronDownIcon";
import ChevronUpIcon from "@/app/components/icons/ChevronUpIcon";

export default function OrbitClassTypeDropdown({ orbitClassTypes, searchFilters, setSearchFilters }: OrbitClassTypeDropdownType) {

    const defaultHeaderText: string = "All Orbit Class Types";
    const [headerText, setHeaderText]: [string, Dispatch<SetStateAction<string>>] = useState<string>(defaultHeaderText);
    const [showOptions, setShowOptions]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const dropdownRef: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownRef]);

    // Toggle dropdown with outside click
    const handleOutsideClick = (event: MouseEvent): void => {
        const dropdownElement: HTMLDivElement | null = dropdownRef.current;
        const path = event.composedPath();
        if (dropdownElement && !path.includes(dropdownElement)) {
            setShowOptions(false);
        }
    };

    return (
        <>
            <div className={"orbit-class-type-dropdown-container"} ref={dropdownRef}>

                {/* Header */}
                <div className={"orbit-class-type-dropdown-header"}>
                    <div className={"orbit-class-type-dropdown-header-content"}>
                        <span>{headerText}</span>
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
                        <button
                            type={"button"} className={`orbit-class-type-dropdown-option orbit-class-type-dropdown-option-first`}
                            onClick={() => { setSearchFilters({ ...searchFilters, orbitClassType: "" }); setHeaderText(defaultHeaderText); setShowOptions(false); }}>
                            {defaultHeaderText}
                        </button>
                        {orbitClassTypes.map((orbitClassType: OrbitClassType, index: number) => {
                            return (
                                <button key={orbitClassType._id}
                                    type={"button"} className={`orbit-class-type-dropdown-option
                                    ${index === orbitClassTypes.length - 1 ? "orbit-class-type-dropdown-option-last" : "orbit-class-type-dropdown-option-middle"}`}
                                    onClick={() => { setSearchFilters({ ...searchFilters, orbitClassType: orbitClassType._id }); setHeaderText(orbitClassType.name); setShowOptions(false); }}>
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