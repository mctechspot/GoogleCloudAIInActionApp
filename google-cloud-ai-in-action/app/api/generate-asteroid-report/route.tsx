import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import { generatePDF } from "@/app/utils/pdf-generator";
import { AsteroidExtendedType } from "@/types/asteroid";
import fs from "fs/promises";
import path from "path";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const modelName: string = process.env.GEMINI_MODEL ? process.env.GEMINI_MODEL : "gemini-2.0-flash";
    try {
        // Generate report for asteroid
        const asteroid: AsteroidExtendedType | null = await req.json();
        if (!asteroid) {
            return NextResponse.json({ error: "Incorrect POST payload for generating report." }, { status: 422 });
        } else {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            let report = "";
            const response = await ai.models.generateContent({
                model: modelName,
                contents: `Generate a strictly-text based report about the scientific facts about this asteroid. Include not just data provided but supplementary scientific, astronomic and fun facts about it. Text should be essay-styled with rich data and explanation of concepts, at least 5 paragraphs. Follow standard format of introduction to the concept of asteroids, then introduction of the specific asteroid being discussed, then detailed paragraphs about the asteroid and a fascinating conclusion. Make the tone academic but intriguing. Do not cut off content. The essay should be complete. No ** or ## common in formatting systems. Style should be prose like in an essay. Asteroid: ${JSON.stringify(asteroid)}`,
            });

            if (response && response.text) {
                report = response.text;
                const filePath: string = await generatePDF(asteroid, report);
                const fileBuffer = await fs.readFile(filePath);
                const fileName = path.basename(filePath);

                // Prepare final successful response
                const finalResponse: NextResponse = new NextResponse(fileBuffer, {
                    status: 200,
                    headers: {
                        'Content-type': 'application/pdf',
                        'Content-disposition': `attachment; filename="${fileName}"`,
                    },
                });

                // Remove file from /tmp to free up space
                finalResponse.headers.set('X-Cleanup-Path', filePath);
                fs.unlink(filePath)
                    .catch(err => console.error(`Failed to delete generated report in /tmp: ${filePath}`, err));
                return finalResponse;
            }
        }

        return NextResponse.json({ error: "Report could not be generated." }, { status: 500 });

    } catch (error: unknown) {

        // More detailed error handling
        // Default to 500 error but handle 503 error when model is overloaded
        let statusCode: number = 500;
        let message: string = "Error generating asteroid report.";
        if (error instanceof Error) {
            statusCode = error.message.includes(`"error":{"code":503`) ? 503 : statusCode;
            message = error.message.includes(`"error":{"code":503`) ? `Error generating asteroid report. Model ${modelName} is overloaded. Please try again later.` : `Error generating asteroid report: ${error.message}`;
            console.error(`Error generating asteroid report: ${error.message}`);
        }
        return NextResponse.json({ "error": message }, { status: statusCode });
    }
}