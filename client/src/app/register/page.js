'use client'
import React from 'react'
import Link from 'next/link';
import {Button, Input} from "@nextui-org/react";
import CustumNavbar from '@/component/navbar/page';

const Register = () => {
  return (
    <div>
        <CustumNavbar/>
         <div className='flex justify-center items-center  '>
         <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
     <div className='text-blue-600 text-center text-5xl'>
      <h1>Sign Up</h1>
    <br/></div>
    <Input type="firstName" variant="bordered" label="First Name"  />
    <Input type="lastName" variant="bordered" label="Last Name"  />
    <Input type="email" variant="bordered" label="Email"  />
    <Input type="address" variant="bordered" label="Address"  />
    <Input type="password" label="Password"  variant="bordered"/>
    <Input type="Number" variant="bordered" label="Phone Number"  />
    <br/>
     <div className='text-blue-600 text-center '>
      <Button radius="full" className="bg-blue-600 text-white shadow-lg">
      Sign Up
    </Button>
    <br/><br/>
    <div className='font-bold'>
   <Link href='/login'> Already Have an Account?</Link> 
</div></div>



   </div></div></div>
  )
}

export default Register;