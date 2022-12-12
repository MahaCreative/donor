import { usePage } from '@inertiajs/inertia-react';
import React from 'react';
import Container from '../../../Components/Container';
import Card from '../../../Components/Guest/Card';
import NavLink from '../../../Components/Guest/NavLink';
import Guest from '../../../Layouts/Guest';
export default function VerifyEmail() {
    const { auth } = usePage().props;
    return (
        <>
            <Container className={'h-screen justify-center'}>
                <div className='w-full flex justify-center items-center flex-col gap-y-3'>
                    <Card>
                        <Card.CardHeader>
                            <p>Silahkan verifikasi email anda</p>
                            <p>{auth.user.email}</p>
                        </Card.CardHeader>
                        <div className='py-2.5 px-4'>
                            <p className='my-3'>
                                Hy Calon Pendonor🖐🖐🖐, sebelum melakukan hal
                                lain silahkan lakukan registrasi terlebih dahulu
                                yah...
                            </p>
                            <NavLink href={route('resend')}>
                                Send email verification in here...
                            </NavLink>
                        </div>
                    </Card>
                </div>
            </Container>
        </>
    );
}
VerifyEmail.layout = (page) => <Guest children={page} />;
