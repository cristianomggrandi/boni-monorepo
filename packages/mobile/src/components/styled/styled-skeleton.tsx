import { Skeleton } from "moti/skeleton"

export default function StyledSkeleton({
    colors,
    ...props
}: React.ComponentProps<typeof Skeleton>) {
    return <Skeleton {...props} colors={colors ?? ["#ddd", "#fff"]} />
}
