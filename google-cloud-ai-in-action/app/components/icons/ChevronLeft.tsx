import { IconType } from "@/types/icon";

export default function ChevronLeft({ height, width, colour }: IconType) {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Left">
                    <path id="Vector" d="M16 5L9 12L16 19" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </>
    );
}