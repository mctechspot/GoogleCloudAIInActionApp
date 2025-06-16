import PDFDocument from 'pdfkit'
import fs from 'fs'
import { AsteroidExtendedType } from '@/types/asteroid';
import { prettifyDate } from "@/app/utils/formatter";
import ReportConfig from "@/app/config/report.json";
import { v4 as uuidv4 } from 'uuid';

// Generate a PDF report for asteroid 
export const generatePDF = async (asteroid: AsteroidExtendedType, reportContent: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {

            // Declare font paths
            const robotoSerifRegular: string = "fonts/RobotoMono/RobotoSerifRegular.ttf";
            const robotoSerifBold: string = "fonts/RobotoMono/RobotoSerifBold.ttf";

            // Delcare copyright text
            const currentYear: number = new Date().getFullYear();
            const copyrightText: string = `© ${currentYear > ReportConfig.en.start_year ? `${ReportConfig.en.start_year} - ${currentYear}` : `${currentYear}`} ${ReportConfig.en.brand_name}`;

            // Create a document
            const doc = new PDFDocument();
            doc.font(robotoSerifRegular);

            // Saving the pdf file in root directory.
            const id: string = uuidv4();
            const fileName: string = `${asteroid.name.replace(" ", "_")}`
            const filePath: string = `/tmp/asteroid_${fileName}_report_${id}.pdf`;

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Set page background
            // Add brand name to cover page
            doc
                .font(robotoSerifBold)
                .fontSize(16)
                .text(ReportConfig.en.brand_name, {
                    align: 'center'
                })
                .moveDown();

            // Add tag line to cover page
            doc
                .font(robotoSerifRegular)
                .fontSize(14)
                .text(ReportConfig.en.tag_line, {
                    align: 'center'
                }).
                lineGap(20)
                .moveDown();

            // Report asteroid name
            doc
                .font(robotoSerifRegular)
                .fontSize(12)
                .text(`Report on Asteroid ${asteroid.name}`, {
                    align: 'center'
                })

            // Image
            const imagePath = 'asteroid.png';
            const pageWidth = doc.page.width;
            const imageWidth = pageWidth * 0.30;
            const imageHeight = imageWidth;
            const centerX = (pageWidth - imageWidth) / 2;
            const fixedY = doc.y;

            doc.image(imagePath, centerX, fixedY, {
                width: imageWidth,
                height: imageWidth
            })
                .moveDown();

            doc.y = fixedY + imageHeight + 10;

            doc
                .font(robotoSerifRegular)
                .fontSize(10)
                .text(copyrightText, {
                    align: 'center'
                });

            // Add page with asteroid details
            doc
                .addPage()
                .font(robotoSerifBold)
                .fontSize(16)
                .text(`Asteroid ${asteroid.name} Details`, {
                    align: 'center'
                })

            doc
                .font(robotoSerifRegular)
                .fontSize(12)
                .table()
                .row([ReportConfig.en.asteroid.name, asteroid.name])
                .row([ReportConfig.en.asteroid.absolute_magnitude.title, `${asteroid.absolute_magnitude} ${ReportConfig.en.asteroid.absolute_magnitude.unit}`])
                .row([ReportConfig.en.asteroid.estimated_diameter_min.title, `${asteroid.estimated_diameter_min} ${ReportConfig.en.asteroid.estimated_diameter_min.unit}`])
                .row([ReportConfig.en.asteroid.estimated_diameter_max.title, `${asteroid.estimated_diameter_max} ${ReportConfig.en.asteroid.estimated_diameter_max.unit}`])
                .row([ReportConfig.en.asteroid.is_potentially_hazardous, asteroid.is_potentially_hazardous.toString()])
                .row([ReportConfig.en.asteroid.orbit_id, asteroid.orbit_id])
                .row([ReportConfig.en.asteroid.orbit_determination_date, prettifyDate(asteroid.orbit_determination_date, true)])
                .row([ReportConfig.en.asteroid.first_observation_date, prettifyDate(asteroid.first_observation_date, false)])
                .row([ReportConfig.en.asteroid.last_observation_date, prettifyDate(asteroid.last_observation_date, false)])
                .row([ReportConfig.en.asteroid.semi_major_axis.title, `${asteroid.semi_major_axis} ${ReportConfig.en.asteroid.semi_major_axis.unit}`])
                .row([ReportConfig.en.asteroid.inclination.title, `${asteroid.inclination} ${ReportConfig.en.asteroid.inclination.unit}`])
                .row([`${ReportConfig.en.asteroid.orbit_class_type.title} ${ReportConfig.en.asteroid.orbit_class_type.details.abbreviation}`, asteroid.orbit_class_type.abbreviation])
                .row([`${ReportConfig.en.asteroid.orbit_class_type.title} ${ReportConfig.en.asteroid.orbit_class_type.details.name}`, asteroid.orbit_class_type.name])
                .row([`${ReportConfig.en.asteroid.orbit_class_type.title} ${ReportConfig.en.asteroid.orbit_class_type.details.description}`, asteroid.orbit_class_type.description]);

            // New page with report content
            // Add page with asteroid details

            doc
                .addPage()
                .font(robotoSerifBold)
                .fontSize(16)
                .text(`Report on Asteroid ${asteroid.name}`, {
                    align: 'center'
                });

            // Split content into paragraphs
            reportContent.split("\n").map((paragraph: string) => {
                return doc
                    .font(robotoSerifRegular)
                    .fontSize(12)
                    .text(paragraph, {
                        indent: 50,
                        columns: 1,
                        columnGap: 20,
                        align: 'justify'
                    });
            })

            // Finalize PDF file
            doc.end();

            stream.on("finish", () => resolve(filePath));
            stream.on("error", reject);

            return filePath;

        } catch (error: unknown) {
            let message: string = `Error generating PDF`;
            if (error instanceof Error) {
                message += `: ${error.message}`;
                console.error(message);
            }
            reject(error);
        }
    });

}