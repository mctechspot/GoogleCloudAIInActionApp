import { NextResponse } from "next/server";
import { generatePDF } from "@/app/utils/pdf-generator";
import { asteroid, reportContentTemp } from "@/app/utils/report-constants";

export const GET = async (): Promise<NextResponse> => {
    try {
        generatePDF(asteroid, reportContentTemp);
        return NextResponse.json({ report: reportContentTemp }, { status: 200 });

    } catch (error: unknown) {
        const statusCode: number = 500;
        let message: string = "Error generating asteroid PDF.";
        if (error instanceof Error) {
            message = `Error generating asteroid PDF: ${error.message}`;
        }
        return NextResponse.json({ "error": message }, { status: statusCode });
    }
}