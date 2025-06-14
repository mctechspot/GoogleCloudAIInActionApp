import { NextResponse } from "next/server";
import { generatePDF } from "@/app/utils/pdf-generator";
import { asteroid, reportContentTemp } from "@/app/utils/report-constants";
import fs from "fs/promises";
import path from "path";

export const POST = async (): Promise<NextResponse> => {
    try {

        const filePath: string = await generatePDF(asteroid, reportContentTemp);
        const fileBuffer = await fs.readFile(filePath);
        const fileName = path.basename(filePath);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-type': 'application/pdf',
                'Content-disposition': `attachment; filename="${fileName}"`,
            },
        });

    } catch (error: unknown) {
        const statusCode: number = 500;
        let message: string = "Error generating asteroid PDF.";
        if (error instanceof Error) {
            message = `Error generating asteroid PDF: ${error.message}`;
        }
        return NextResponse.json({ "error": message }, { status: statusCode });
    }
}