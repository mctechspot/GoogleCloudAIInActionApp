import { IconType } from "@/types/icon";

export default function ChevronUpIcon({ height, width, colour }: IconType) {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Up">
                    <path id="Vector" d="M5 16L12 9L19 16" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </>
    );
}