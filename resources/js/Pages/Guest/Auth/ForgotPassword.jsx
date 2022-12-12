import React, { useEffect } from 'react';
import Container from '../../../Components/Container';
import Guest from '../../../Layouts/Guest';
import Card from '../../../Components/Guest/Card';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import { useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    useEffect(() => {
        return () => {
            reset('email');
        };
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route('forgot_password'));
    };
    return (
        <>
            <Container className={'h-screen'}>
                <div className='flex justify-center w-full items-center px-4 py-4'>
                    <Card>
                        <Card.CardHeader classHeader={'px-4'}>
                            Masukkan email anda untuk mendapatkan email reset
                            password
                        </Card.CardHeader>
                        <div className='m-3 flex flex-col gap-y-3'>
                            <Input
                                value={data.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                                placeholder={'Email Address'}
                            />
                            {errors && (
                                <Input.Error
                                    classError={'text-white'}
                                    errors={errors.email}
                                />
                            )}
                            <Button
                                onClick={submitHandler}
                                className={'bg-blue-600  text-center'}
                            >
                                Send Reset Password Link
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>
        </>
    );
}
ForgotPassword.layout = (page) => <Guest children={page} />;
