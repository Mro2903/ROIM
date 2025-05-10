import ForgotForm from '@/components/auth/forms/forgot-form'
import {Suspense} from "react";
import FormSkeleton from "@/components/auth/forms/form-skeleton";

const ForgotPage = () => {
    return (
    <div>
        <Suspense fallback={<FormSkeleton />}>
            <ForgotForm />
        </Suspense>
    </div>
    )
}

export default ForgotPage