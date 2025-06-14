"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { PaginationWrapperType } from "@/types/pagination";
import ChevronDoubleLeft from "@/app/components/icons/ChevronDoubleLeft";
import ChevronLeft from "@/app/components/icons/ChevronLeft";
import ChevronDoubleRight from "@/app/components/icons/ChevronDoubleRight";
import ChevronRight from "@/app/components/icons/ChevronRight";

export default function Pagination({ pagination, setPagination }: PaginationWrapperType) {

    const getEntryIndicesFromCurrentPageIndex = (currentPageIndex: number, entryCountPerPage: number) => {
        const index1 = (currentPageIndex) * entryCountPerPage;
        const index2 = (currentPageIndex) * entryCountPerPage + entryCountPerPage;
        return [index1, index2];
    }

    const getPageIndicesFromCurrentPageIndex = (currentPageIndex: number, pageCount: number, pageButtonCount: number): [number, number] => {
        const followingIndices: number = Math.floor(pageButtonCount / 2);

        if (currentPageIndex <= followingIndices) {
            return [0, pageButtonCount - 1];
        }

        if (currentPageIndex >= pageCount - followingIndices) {
            return [pageCount - pageButtonCount, pageCount - 1];
        }

        const index1: number = currentPageIndex - followingIndices;
        const index2: number = currentPageIndex + followingIndices;

        return [index1, index2];
    }

    const getPageCount = (entryCount: number, entryCountPerPage: number): number => {
        return entryCount % entryCountPerPage == 0 ? entryCount / entryCountPerPage : Math.floor(entryCount / entryCountPerPage) + 1;
    }

    const [pageCount, _setPageCount]: [number, Dispatch<SetStateAction<number>>] = useState<number>(getPageCount(pagination.entryCount, pagination.entryCountPerPage));
    const [numPaginationButtons, _setNumPaginationButtons]: [number, Dispatch<SetStateAction<number>>] = useState<number>(5);

    return (
        <>
            <div className={"pagination-container text-center grid-vertical-gap-10px"}>
                {/* Buttons in the case of maximum 5 pages */}
                {pageCount <= numPaginationButtons ? (
                    <>
                        <div className={`pagination-buttons-container`}>
                            {/* Page Number Buttons  */}
                            {Array.from({ length: getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[1] - getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[0] + 1 }, (_, i) => getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[0] + i).map((pageNumber: number, index: number) => {
                                return (
                                    <button key={`page-button-${index + 1}`}
                                        className={`pagination-button ${pagination.currentPageIndex == index ? "pagination-button-current" : ""}`}
                                        onClick={() => setPagination({ ...pagination, currentPageIndex: index })}>
                                        {pageNumber + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                ) : ("")}

                {/* Buttons in the case of more than 5 pages */}
                {pageCount > numPaginationButtons ? (
                    <>
                        <div className={`pagination-buttons-container`}>

                            {/* Skip to First Button*/}
                            <button
                                className={`pagination-button pagination-button-left ${pagination.currentPageIndex === 0 ? "pagination-button-disabled" : ""}`}
                                disabled={pagination.currentPageIndex === 0 ? true : false}
                                onClick={() => setPagination({ ...pagination, currentPageIndex: 0 })}>
                                <ChevronDoubleLeft
                                    height={15}
                                    width={15}
                                    colour={pagination.currentPageIndex === 0 ? "#8D9AAF" : "#121F33"}
                                />
                            </button>

                            {/* Back Button*/}
                            <button
                                className={`pagination-button pagination-button-left ${pagination.currentPageIndex === 0 ? "pagination-button-disabled" : ""}`}
                                disabled={pagination.currentPageIndex === 0 ? true : false}
                                onClick={() => setPagination({ ...pagination, currentPageIndex: pagination.currentPageIndex - 1 })}>
                                <ChevronLeft
                                    height={15}
                                    width={15}
                                    colour={pagination.currentPageIndex === 0 ? "#8D9AAF" : "#121F33"}
                                />
                            </button>

                            {/* Page Number Buttons  */}
                            {Array.from({ length: getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[1] - getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[0] + 1 }, (_, i) => getPageIndicesFromCurrentPageIndex(pagination.currentPageIndex, pageCount, numPaginationButtons)[0] + i).map((pageNumber: number, index: number) => {
                                return (
                                    <button key={`page-button-${index + 1}`}
                                        className={`pagination-button ${pagination.currentPageIndex == pageNumber ? "pagination-button-current" : ""}`}
                                        onClick={() => setPagination({ ...pagination, currentPageIndex: pageNumber })}>
                                        {pageNumber + 1}
                                    </button>
                                );
                            })}

                            {/* Next Button*/}
                            <button
                                className={`pagination-button pagination-button-next ${pagination.currentPageIndex === pageCount - 1 ? "pagination-button-disabled" : ""}`}
                                disabled={pagination.currentPageIndex === pageCount - 1 ? true : false}
                                onClick={() => setPagination({ ...pagination, currentPageIndex: pagination.currentPageIndex + 1 })}>
                                <ChevronRight
                                    height={15}
                                    width={15}
                                    colour={pagination.currentPageIndex === pageCount - 1 ? "#8D9AAF" : "#121F33"}
                                />
                            </button>

                            {/* Skip to Last Button*/}
                            <button
                                className={`pagination-button pagination-button-next ${pagination.currentPageIndex === pageCount - 1 ? "pagination-button-disabled" : ""}`}
                                disabled={pagination.currentPageIndex === pageCount - 1 ? true : false}
                                onClick={() => setPagination({ ...pagination, currentPageIndex: pageCount - 1 })}>
                                <ChevronDoubleRight
                                    height={15}
                                    width={15}
                                    colour={pagination.currentPageIndex === pageCount - 1 ? "#8D9AAF" : "#121F33"}
                                />
                            </button>

                        </div>
                    </>
                ) : ("")}
                <p className={"text-center"}>Page {pagination.currentPageIndex + 1} / {pageCount}</p>
                <p className={"text-center"}>Listing results {getEntryIndicesFromCurrentPageIndex(pagination.currentPageIndex, pagination.entryCountPerPage)[0] + 1} - {getEntryIndicesFromCurrentPageIndex(pagination.currentPageIndex, pagination.entryCountPerPage)[1]} of {pagination.entryCount}</p>

            </div>
        </>
    );
}