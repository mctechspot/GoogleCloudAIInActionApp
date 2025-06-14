import PDFDocument from 'pdfkit'
import fs from 'fs'
import { reportConstants } from "@/app/utils/report-constants";
import { AsteroidExtendedType } from '@/app/types/asteroid';
import { prettifyDate } from "@/app/utils/formatter";

// Generate a PDF report for asteroid 
export const generatePDF = (asteroid: AsteroidExtendedType, reportContent: string): void => {

    // Declare font paths
    const robotoSerifRegular: string = "fonts/RobotoMono/RobotoSerifRegular.ttf";
    const robotoSerifBold: string = "fonts/RobotoMono/RobotoSerifBold.ttf";
    const robotoSerifLight: string = "fonts/RobotoMono/RobotoSerifLight.ttf";
    const robotoSerifItalic: string = "fonts/RobotoMono/RobotoSerifItalic.ttf";
    
    // Delcare copyright text
    const currentYear: number = new Date().getFullYear();
    const copyrightText: string = `© ${currentYear > reportConstants.startYear ? `${reportConstants.startYear} - ${currentYear}` : `${currentYear}`} ${reportConstants.brandName}`;

    // Create a document
    const doc = new PDFDocument();
    doc.font(robotoSerifRegular);

    // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream('example.pdf'));

    // Set page background
    // Add brand name to cover page
    doc
        .font(robotoSerifBold)
        .fontSize(16)
        .text(reportConstants.brandName, {
            align: 'center'
        })
        .moveDown();

    // Add tag line to cover page
    doc
        .font(robotoSerifRegular)
        .fontSize(14)
        .text(reportConstants.tagLine, {
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
    const imagePath = 'asteroids.png';
    const pageWidth = doc.page.width;
    const imageWidth = pageWidth * 0.66;
    const imageHeight = imageWidth / 1.77777777778;
    const centerX = (pageWidth - imageWidth) / 2;
    const fixedY = doc.y;

    doc.image(imagePath, centerX, fixedY, {
        width: imageWidth,
        height: imageHeight
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
        .row(['Name', asteroid.name])
        .row(["Absolute magnitude", asteroid.absolute_magnitude_h])
        .row(["Estimated minimum diameter", asteroid.estimated_diameter_min])
        .row(["Estimated maximum diameter", asteroid.estimated_diameter_max])
        .row(["Estimated maximum diameter", asteroid.estimated_diameter_max])
        .row(["Potentially Hazardous?", asteroid.is_potentially_hazardous])
        .row(["Orbit ID", asteroid.orbit_id])
        .row(["Orbit Determination Date", prettifyDate(asteroid.orbit_determination_date, true)])
        .row(["First Observation Date", prettifyDate(asteroid.first_observation_date, false)])
        .row(["Last Observation Date", prettifyDate(asteroid.last_observation_date, false)])
        .row(["Semi Major Axis", asteroid.semi_major_axis])
        .row(["Inclination", asteroid.inclination]);

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
}