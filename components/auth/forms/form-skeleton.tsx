/**
 * Renders a skeleton placeholder for a form, typically used while loading form content.
 * Displays two skeleton lines to mimic form fields.
 *
 * @returns {JSX.Element} The skeleton UI for a form.
 */
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