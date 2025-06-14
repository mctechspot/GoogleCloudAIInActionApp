import  { Dispatch, SetStateAction } from "react";

export type PaginationType = {
    entryCount: number;
    entryCountPerPage: number;
    currentPageIndex: number;
}

export type PaginationWrapperType = {
    pagination: PaginationType;
    setPagination: Dispatch<SetStateAction<PaginationType | null>>;
}