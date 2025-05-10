import ResetForm from '@/components/auth/forms/reset-form'
import React, {Suspense} from "react";
import FormSkeleton from "@/components/auth/forms/form-skeleton";

const ResetPage = () => {
    return (
        <div>
            <Suspense fallback={<FormSkeleton />}>
                <ResetForm />
            </Suspense>
        </div>
    )
}

export default ResetPage