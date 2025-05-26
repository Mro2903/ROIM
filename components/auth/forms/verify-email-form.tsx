"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import CardWrapper from "../card-wrapper"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"
import { newVerification } from "@/actions/new-verification"
/**
 * A React component that handles email verification in a Next.js application.
 * 
 * This component:
 * - Extracts the verification token from the URL search parameters.
 * - Calls the `newVerification` action to verify the email address using the token.
 * - Displays loading, success, or error messages based on the verification result.
 * - Uses a card layout with navigation back to the login page.
 * 
 * @component
 * @returns {JSX.Element} The rendered email verification form.
 */
const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) {
            return
        }

        if(!token) {
            setError("No token provided")
            return
        }

        newVerification(token).then((data) => {
            if (data.success) {
                setSuccess(data.success)
            }
            if (data.error) {
                setError(data.error)
            }
        }).catch((error) => {
            console.error(error)
            setError("An unexpected error occurred")
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your email address"
            title="Confirming now..."
            backButtonHref="/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <p>Loading</p>}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    )
}

export default VerifyEmailForm