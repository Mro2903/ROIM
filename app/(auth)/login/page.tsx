import LoginForm from '@/components/auth/forms/login-form'
import React, {Suspense} from 'react'
import FormSkeleton from "@/components/auth/forms/form-skeleton";

const RegisterPage = () => {
    return (
    <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
    </Suspense>
    )
}

export default RegisterPage