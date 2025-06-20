import React, {useState} from 'react'
import authService from '../Appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/Auth/authSlice'
import {Button, Logo, Input} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, seterror] = useState("")
    const  {register, handleSubmit } = useForm()

    const signup = async (data) => {
        seterror("")
        try {
            const userData = await authService.createAccount(data);
            if(userData){
                const LoggedinData = await authService.getCurrentUser();
                if (LoggedinData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
      
    }
    
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                {" "}
                Sign Up to create your Account
            </h2>
            <p className="m-2 text-center text-base text-black/60">
                Already have any an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary trasition-all duration-200 hover:underline"
                >
                Sign In
                </Link>
            </p>
            {error && <p className='text-center text-red-600 mt-8'>{error}</p>}

            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    <Input 
                        label="Full Name: "
                        type='text'
                        placeholder='Enter your Full Name'
                        {...register("fullname",{
                            required : true
                        })}
                
                    />
                    <Input
                        label="Email: "
                        placeholder="Enter your Email: "
                        type="email"
                        {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) =>
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || 
                            "Email address must be a valid address!"
                        },
                        })}
                    />
                    <Input 
                        type='password'
                        placeholder='Enter your Password'
                        label="Password :"
                        {
                            ...register("password",{
                                required : true,
                                minLength : 6
                            })
                        }
                        
                    />
                    <Button
                        type='submit'
                        children="Sign Up"
                        className='w-full'
                    />
                </div>
                
            </form>
        </div>
      
    </div>
  )
}

export default Signup
