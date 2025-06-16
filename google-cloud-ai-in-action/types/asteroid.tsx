import { Dispatch, SetStateAction } from "react";
import { ReportNotificationType } from "@/types/report";

export type OrbitClassType = {
    _id: string;
    abbreviation: string;
    name: string;
    description: string;
}

export type OrbitClassTypeWrapperType = {
    orbitClassType: OrbitClassType;
}

export type OrbitClassTypeDropdownType = {
    orbitClassTypes: OrbitClassType[];
}


export type AsteroidType = {
    _id: string;
    name: string;
    absolute_magnitude: number;
    estimated_diameter_min: number;
    estimated_diameter_max: number;
    is_potentially_hazardous: boolean;
    orbit_id: string;
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    semi_major_axis: number;
    inclination: number;
    orbit_class_type: string;
}

export type AsteroidExtendedType = {
    _id: string;
    name: string;
    absolute_magnitude: number;
    estimated_diameter_min: number;
    estimated_diameter_max: number;
    is_potentially_hazardous: boolean;
    orbit_id: string;
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    semi_major_axis: number;
    inclination: number;
    orbit_class_type: OrbitClassType;
}

export type AsteroidExtendedWrapperType = {
    asteroid: AsteroidExtendedType;
    reportNotification: ReportNotificationType | null;
    setReportNotification: Dispatch<SetStateAction<ReportNotificationType | null>>;
}