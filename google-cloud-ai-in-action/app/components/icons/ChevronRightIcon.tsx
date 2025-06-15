import { IconType } from "@/types/icon";

export default function ChevronRightIcon({ height, width, colour }: IconType) {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Right">
                    <path id="Vector" d="M8 5L15 12L8 19" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </>
    );
}