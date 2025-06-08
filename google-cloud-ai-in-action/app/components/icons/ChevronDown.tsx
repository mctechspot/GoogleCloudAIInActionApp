import { IconType } from "@/app/types/icon";

export default function ChevronDown({ height, width, colour }: IconType) {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow / Chevron_Down">
                    <path id="Vector" d="M19 9L12 16L5 9" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        </>
    );
}