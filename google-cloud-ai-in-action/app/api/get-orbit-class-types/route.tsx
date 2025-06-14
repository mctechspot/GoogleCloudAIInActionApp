import { NextResponse } from "next/server";
import { getOrbitClassTypes } from "@/app/mongodb/queries";
import { OrbitClassType } from "@/types/asteroid";

export const GET = async(): Promise<NextResponse> => {
    try {
        // Get orbit class types
        const orbitClassTypes: OrbitClassType[] = await getOrbitClassTypes();
        return NextResponse.json(orbitClassTypes, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error getting orbit class types: ${error.message}`);
        }
        return NextResponse.json({ "error": "Error getting orbit class types" }, { status: 500 });
    }
}