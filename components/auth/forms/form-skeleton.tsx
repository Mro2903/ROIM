import {Skeleton} from "@/components/ui/skeleton";

const FormSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4 p-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
        </div>
    )
}

export default FormSkeleton;