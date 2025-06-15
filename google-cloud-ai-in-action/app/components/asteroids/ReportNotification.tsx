"use client"
import { ReportNotificationWrapperType } from "@/types/report";
import ErrorIcon from "@/app/components/icons/ErrorIcon";
import SuccessIcon from "@/app/components/icons/SuccessIcon";
import WarningIcon from "@/app/components/icons/WarningIcon";
import CloseIcon from "@/app/components/icons/CloseIcon";

export default function ReportNotification({ reportNotification, setReportNotification }: ReportNotificationWrapperType) {
    return (
        <>
            {reportNotification ? (
                <>
                    <div className={`report-notification-container 
                ${reportNotification.status === 200 ? "bg-green-medium text-white" : ""}
                ${reportNotification.status === 202 ? "bg-white" : ""}
                ${reportNotification.status === 500 ? "bg-red-medium text-white" : ""}
                ${reportNotification.status === 503 ? "bg-yellow-medium text-white" : ""}`}>
                        <div className={"report-notification-content"}>
                            <div className={"report-notification-icon-container"}>

                                {/* Generating Icon */}
                                {reportNotification.status === 202 ? (
                                    <div className={"loader report-notification-loader"}></div>
                                ) : ("")}

                                {/* Success Icon */}
                                {reportNotification.status === 200 ? (
                                    <div className={"report-notification-icon-container"}>
                                        <SuccessIcon
                                            height={50}
                                            width={50}
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

                            {/* Report Notification Message */}
                            <p className={"report-notification-message"}>
                                <span>{reportNotification.message}</span>
                            </p>

                            {/* Close Button */}
                            {reportNotification.status !== 202 ? (
                                <button type={"button"} className={"report-notification-close-button"}
                                    onClick={() => setReportNotification(null)}>
                                    <CloseIcon
                                        height={20}
                                        width={20}
                                        colour={"#FFFFFF"}
                                    />
                                </button>
                            ) : ("")}

                        </div>

                    </div>
                </>
            ) : ("")}

        </>
    );
}