import { clsx } from "clsx"
import { ClassNameValue, twMerge } from "tailwind-merge"

// export const PRIMARY_COLOR = "#FFC3CC"
export const PRIMARY_COLOR = "#FFA8CD"
export const SECONDARY_COLOR = "#D2DB76"
export const BACKGROUND_COLOR = "#FFFFFF"

export function cn(...inputs: ClassNameValue[]) {
    return twMerge(clsx(inputs))
}
