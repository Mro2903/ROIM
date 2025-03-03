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
