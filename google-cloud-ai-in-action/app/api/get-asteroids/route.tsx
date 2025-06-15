import { NextRequest, NextResponse } from "next/server";
import { getAsteroids } from "@/app/mongodb/queries";
import { AsteroidExtendedType } from "@/types/asteroid";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Get asteroids
        const { searchParams } = new URL(req.url);
        const filter: string = searchParams.get("filter") ?? "";
        const asteroids: AsteroidExtendedType[] = await getAsteroids(filter);
        return NextResponse.json(asteroids, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error getting asteroids: ${error.message}`);
        }
        return NextResponse.json({ "error": "Error getting asteroids" }, { status: 500 });
    }
}