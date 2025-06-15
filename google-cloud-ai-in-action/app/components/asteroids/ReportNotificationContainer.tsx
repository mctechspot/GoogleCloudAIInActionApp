"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReportNotificationType, ReportNotificationWrapperType } from "@/types/report";

export default function ReportNotificationContainer({ reportNotifications }: [ReportNotificationWrapperType]) {
    return (
        <>
            <div className={"report-notification-container"}>
                {/*<div className={"report-notification-content"}>
                    <div className={"report-notification-icon-container"}>

                    </div>
                    <p className={"report-notification-message"}>
                        {reportNotification.message}
                    </p>
                </div>*/}
            </div>
        </>
    );
}