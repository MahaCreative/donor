import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'

export default function Create({onClose}) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        name: '',
    });
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
    
    const onHandleChange = (event) => {
        setData({...data, [event.target.name]:event.target.value} );
            
    };
    const submitHandler = (e) => {
        
        post(route('register'));
    };
  return (
      <div>
          <p className='text-white'>{ data.name}</p>
          <form action=''>
                            <div className='flex flex-col justify-start gap-y-1'>
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Name'
                                    type='name'
                                    id='name'
                                    name='name'
                                />
                                {errors.name && (
                                    <Input.Error errors={errors.name} />
                                )}
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Email'
                                    type='email'
                                    id='email'
                                    name='email'
                                />
                                {errors.email && (
                                    <Input.Error errors={errors.email} />
                                )}
                                <Input
                                    onChange={onHandleChange}
                                    placeholder='Password'
                                    type='password'
                                    id='password'
                                    name='password'
                                />
                                {errors.password&& (
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

                            <Button
                                onClick={submitHandler}
                                className={
                                    'bg-blue-600 hover:bg-blue-800 text-white text-center'
                                }
                            >
                                Register
                            </Button>
                        </form>
    </div>
  )
}
