import { NextResponse } from "next/server";
import { getAsteroids } from "@/app/mongodb/queries";
import { AsteroidExtendedType } from "@/types/asteroid";

export const GET = async(): Promise<NextResponse> => {
    try {
        // Get asteroids
        const asteroids: AsteroidExtendedType[] = await getAsteroids();
        return NextResponse.json(asteroids, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error getting asteroids: ${error.message}`);
        }
        return NextResponse.json({ "error": "Error getting asteroids" }, { status: 500 });
    }
}