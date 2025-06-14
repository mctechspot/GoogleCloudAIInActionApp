"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PaginationType, PaginationWrapperType } from "@/app/types/pagination";

export default function Pagination({ pagination, setPagination }: PaginationWrapperType) {

    const [currentPageIndex, setCurrentPageIndex]: [number, Dispatch<SetStateAction<number>>] = useState<number>(pagination.currentPageIndex);
    //const pageCount: number = pagination.entryCount / pagination.entryCountPerPage;
    const pageCount: number = 5;

    console.log("PAGE COUNT: ", pageCount);

    return (
        <>
            <div className={"pagination-container text-center grid-vertical-gap-10px"}>
                {pageCount <= 5 ? (
                    <>
                        <div className={`pagination-buttons-container`}>
                            {[...Array(pageCount).keys()].map((pageNumber: number, index: number) => {
                                return (
                                    <button key={`page-button-${index + 1}`}
                                        className={`pagination-button ${pagination.currentPageIndex == index ? "pagination-button-current" : ""}`}
                                        onClick={() => setPagination({ ...pagination, currentPageIndex: index })}>
                                        {index + 1}
                                    </button>
                                );
                            })}

                        </div>
                    </>
                ) : ("")}
                <p className={"text-center"}>Page {pagination.currentPageIndex + 1} / {pageCount}</p>
                                <p className={"text-center"}>Listing results {pagination.currentPageIndex * pagination.entryCountPerPage  + 1} - {pagination.currentPageIndex * pagination.entryCountPerPage  + pagination.entryCountPerPage} of {pagination.entryCount}</p>

            </div>
        </>
    );
}