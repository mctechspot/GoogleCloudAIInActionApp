"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReportNotificationType, ReportNotificationWrapperType } from "@/types/report";
import ErrorIcon from "@/app/components/icons/ErrorIcon";
import SuccessIcon from "@/app/components/icons/SuccessIcon";
import WarningIcon from "@/app/components/icons/WarningIcon";

export default function ReportNotification({ reportNotification }: ReportNotificationWrapperType) {
    return (
        <>
            <div className={`report-individual-notification-container 
                ${reportNotification.status === 200 ? "bg-green-medium text-white" : ""}
                ${reportNotification.status === 202 ? "bg-white text-white" : ""}
                ${reportNotification.status === 500 ? "bg-red-medium text-white" : ""}
                ${reportNotification.status === 503 ? "bg-yellow-medium text-white" : ""}`}>
                <div className={"report-individual-notification-content"}>
                    <div className={"report-individual-notification-icon-container"}>

                        {/* Generating Icon */}
                        {reportNotification.status === 202 ? (
                            <div className={"loader report-individual-notification-loader"}></div>
                        ) : ("")}

                        {/* Success Icon */}
                        {reportNotification.status === 200 ? (
                            <div className={"report-notification-icon-container"}>
                                <SuccessIcon
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            </div>

                        ) : ("")}

                        {/* Error Icon */}
                        {reportNotification.status === 500 ? (
                            <div className={"report-notification-icon-container"}>
                                <ErrorIcon
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            </div>
                        ) : ("")}

                        {/* Warning Icon */}
                        {reportNotification.status === 503 ? (
                            <div className={"report-notification-icon-container"}>
                                <WarningIcon
                                    height={20}
                                    width={20}
                                    colour={"#FFFFFF"}
                                />
                            </div>
                        ) : ("")}

                    </div>
                    <p className={"report-individual-notification-message"}>
                        <span>{reportNotification.message}</span>&nbsp;<span>{reportNotification.asteroidName}</span>
                    </p>
                </div>

            </div>
        </>
    );
}