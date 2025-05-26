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
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {login} from "@/actions/login";
import {FormSuccess} from "../form-success";
import {FormError} from "../form-error";
import GoogleLogin from "@/components/auth/google-login";
import Link from "next/link";
import {useSearchParams, useRouter} from "next/navigation";
/**
 * `LoginForm` is a React component that renders a login form for user authentication.
 * 
 * Features:
 * - Uses `react-hook-form` with Zod schema validation for form state management and validation.
 * - Handles login logic via an async `login` action, displaying success or error messages accordingly.
 * - Displays loading state while login is in progress.
 * - Supports social login via a `GoogleLogin` component.
 * - Provides navigation to registration and password recovery pages.
 * - Shows form validation errors and server-side errors.
 * 
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("error")) {
            setError(searchParams.get("error") as string);
        }
    }, [searchParams]);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        login(data).then((res) => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
            }
            if (res.success) {
                setError("");
                setSuccess(res.success);
                router.push("/");
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Login to your account"
            title="Login"
            backButtonHref="/register"
            backButtonLabel="Don't have an account"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
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
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>
                <Button className="font-normal w-full">
                    <Link href="/forgot">
                        Forgot password?
                    </Link>
                </Button>
            </Form>
            <GoogleLogin />
        </CardWrapper>
    );
};

export default LoginForm;
