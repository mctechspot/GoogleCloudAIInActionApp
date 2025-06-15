import { Dispatch, SetStateAction } from "react";

export type ReportNotificationType = {
    status: number; // 202 - PENDING, 200 - SUCCESS 500 - ERROR, 503 - MODEL OVERLOADED
    message: string; // Status message
    asteroidName: string; // Asteroid name for report
}

export type ReportNotificationWrapperType = {
    reportNotification: ReportNotificationType | null;
    setReportNotification: Dispatch<SetStateAction<ReportNotificationType | null>>;
}