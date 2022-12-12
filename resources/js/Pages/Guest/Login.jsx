import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import Button from '../../Components/Button';
import Container from '../../Components/Container';
import Input from '../../Components/Input';
import Guest from '../../Layouts/Guest';
export default function Login() {
    const submitHandler = (e) => {
        e.preventDefault();
        post('login');
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        );
    };
    return (
        <>
            <Container className={'h-screen'}>
                <div className='w-full flex justify-center'>
                    <div className='py-2.5 px-4 w-[95%] md:w-1/3 rounded-lg bg-white backdrop-blur-md shadow-md shadow-gray-400/50'>
                        <h3 className='text-2xl font-semibold text-blue-600 text-center my-3'>
                            Login
                        </h3>
                        <form action=''>
                            <div className='flex flex-col justify-start gap-y-1'>
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Email'
                                    type='email'
                                    id='email'
                                    name='email'
                                />
                                {errors && (
                                    <Input.Error errors={errors.email} />
                                )}
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Password'
                                    type='password'
                                    id='password'
                                    name='password'
                                />
                                {errors && (
                                    <Input.Error errors={errors.password} />
                                )}
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Password_confirmation'
                                    type='password'
                                    id='password_confirmation'
                                    name='password_confirmation'
                                />
                                {errors && (
                                    <Input.Error errors={errors.password} />
                                )}
                            </div>
                            {/* <div className='flex flex-1 items-center gap-x-1'>
                                <Input
                                    onChange={onHandleChange}
                                    type='checkbox'
                                    id='remember'
                                    name='remember'
                                />
                                <p className='text-sm italic text-blue-600'>
                                    Remember Me
                                </p>
                            </div> */}
                            <Button
                                onClick={submitHandler}
                                className={
                                    'bg-blue-600 hover:bg-blue-800 text-white text-center'
                                }
                            >
                                Login
                            </Button>
                            <div className='flex justify-between items-center w-full'>
                                <Link
                                    className='text-blue-600 underline hover:text-blue-900'
                                    href='register'
                                >
                                    Register a new account
                                </Link>
                                <Link
                                    className='text-blue-600 underline hover:text-blue-900'
                                    href={route('forgot_password')}
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}
Login.layout = (page) => <Guest children={page} />;
