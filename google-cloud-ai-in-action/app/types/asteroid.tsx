export type OrbitClassType = {
    _id: string;
    abbreviation: string;
    name: string;
    description: string;
    colour: string;
}

export type AsteroidType = {
    _id: string;
    name: string;
    absolute_magnitude_h: number;
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
    absolute_magnitude_h: number;
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
}