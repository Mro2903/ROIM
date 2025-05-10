import RegisterForm from '@/components/auth/forms/register-form'
import React, {Suspense} from 'react'
import FormSkeleton from "@/components/auth/forms/form-skeleton";

const RegisterPage = () => {
    return (
        <Suspense fallback={<FormSkeleton />}>
            <RegisterForm />
        </Suspense>
    )
}

export default RegisterPage