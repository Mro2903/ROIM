import VerifyEmailForm from '@/components/auth/forms/verify-email-form'
import {Suspense} from "react";
import FormSkeleton from "@/components/auth/forms/form-skeleton";

const VerifyEmailPage = () => {
    return (
        <div>
            <Suspense fallback={<FormSkeleton />}>
                <VerifyEmailForm />
            </Suspense>
        </div>
    )
}

export default VerifyEmailPage