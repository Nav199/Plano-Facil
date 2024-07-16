import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="container mx-auto flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-white" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-700 text-white"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-500" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-white" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-700 text-white"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-red-500" />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="text-white"
                            />
                            <span className="ml-2 text-sm text-gray-400">Remember me</span>
                        </div>

                        <div className="flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-400 hover:text-gray-200"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton className="ml-4 bg-indigo-600 hover:bg-indigo-700" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-white">
                        <Link to="/register" className="underline hover:text-gray-200">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
