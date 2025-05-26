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
import { ResetPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import {FormSuccess} from "../form-success";
import {FormError} from "../form-error";
import {reset} from "@/actions/reset";

/**
 * ForgotForm is a React functional component that renders a password reset form.
 * 
 * This form allows users to request a password reset by entering their email address.
 * It uses React Hook Form with Zod validation for form state management and validation.
 * 
 * Features:
 * - Email input field with validation.
 * - Displays loading state while processing the reset request.
 * - Shows success or error messages based on the reset operation result.
 * - Includes navigation back to the login page.
 * - Optionally displays social login options.
 * 
 * @component
 * @returns {JSX.Element} The rendered password reset form component.
 */
const ForgotForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
        setLoading(true);
        reset(data).then((res) => {
            if (res.error) {
                setError(res.error);
            }
            if (res.success) {
                setSuccess(res.success);
            }
        })
    };

    return (
        <CardWrapper
            headerLabel="Reset Password"
            title="Reset"
            backButtonHref="/login"
            backButtonLabel="Wait, I remember my password"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="email"
                                            type="email"
                                        />
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

export default ForgotForm;
