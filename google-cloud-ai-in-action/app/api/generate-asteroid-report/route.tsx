import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';

export const GET = async (): Promise<NextResponse> => {
    const modelName: string = process.env.GEMINI_MODEL ? process.env.GEMINI_MODEL : "gemini-2.0-flash";
    try {
        // Generate report for asteroid
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const asteroid: string = `asteroid {"_id":"2144861","name":"144861 (2004 LA12)","absolute_magnitude_h":"15.41","estimated_diameter_min":"2.2006702711","estimated_diameter_max":"4.9208483223","is_potentially_hazardous":"False","orbit_id":"159","orbit_determination_date":"2025-03-01 05:16:48","first_observation_date":"2002-03-12 00:00:00","last_observation_date":"2025-03-01 00:00:00","semi_major_axis":"2.509284983950943","inclination":"39.40474883826569","orbit_class_type":"bfcec887-7e5b-4ad0-8000-25ed81ce4b02"} and its orbit_type_class: {"_id":"bfcec887-7e5b-4ad0-8000-25ed81ce4b02","abbreviation":"APO","name":"Appollo-class Asteroid","description":"These asteroids have orbits that cross the Earth's orbit and have a semi-major axis greater than 1 AU.","colour":"#F54242"}`;
        let report = "";
        const response = await ai.models.generateContent({
            model: modelName,
            contents: `Generate a strictly-text based report about the scientific facts about this asteroid. Include not just data provided but supplementary scientific, astronomic and fun facts about it. Asteroid: ${asteroid}`,
        });

        if (response && response.text) {
            report = response.text;
        }

        return NextResponse.json({ report: report }, { status: 200 });

    } catch (error: unknown) {

        // More detailed error handling
        // Default to 500 error but handle 503 error when model is overloaded

        let statusCode: number = 500;
        let message: string = "Error generating asteroid report.";
        if (error instanceof Error) {
            console.log(`Error generating asteroid report: ${error.message}`);
            statusCode = error.message.includes(`"error":{"code":503`) ? 503 : statusCode;
            message = error.message.includes(`"error":{"code":503`) ? `Error generating asteroid report. Model ${modelName} is overloaded. Please try again later.` : message;
        }
        return NextResponse.json({ "error": message }, { status: statusCode });
    }
}