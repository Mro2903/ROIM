"use client";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardWrapper from "../card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import {FormSuccess} from "../form-success";
import {FormError} from "../form-error";
import {newReset} from "@/actions/new-reset";
import {useSearchParams} from "next/navigation";
/**
 * `ResetForm` is a React component that renders a password reset form.
 * 
 * This form allows users to set a new password using a token provided via URL search parameters.
 * It uses `react-hook-form` for form state management and validation, with a Zod schema for input validation.
 * 
 * Features:
 * - Accepts a reset token from the URL query string.
 * - Validates new password and confirmation fields.
 * - Displays success and error messages based on the reset operation result.
 * - Disables the submit button and shows a loading state during submission.
 * - Provides navigation back to the login page.
 * 
 * @component
 * @example
 * ```tsx
 * <ResetForm />
 * ```
 */
const ResetForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
        setLoading(true);

        if(!token) {
            setError("No token provided")
            return
        }

        newReset(token, data).then((res) => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
            }
            if (res.success) {
                setError("");
                setSuccess(res.success);
                setLoading(false);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Enter New Password"
            title="Reset Password"
            backButtonHref="/login"
            backButtonLabel="Back to Login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="******" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Reset"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ResetForm;
