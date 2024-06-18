'use client'
import React, { use } from 'react'
import {Button,Input} from "@nextui-org/react";
import Link from "next/link";
import CustumNavbar from '@/component/navbar/page';
import { useFormik} from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const login = () => {
  const router = useRouter()
  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    onSubmit: values => {
      loginUser(values)
    },
  });

  const loginUser = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch('http://localhost:4000/login', requestOptions);
  const data = await response.json()

 
if(response.status == '200'){
  toast.success(data.msg)
  router.push('/publishride')
}else{
  toast.error(data.msg)
}
  }
  
  return (
   <div> 
   
    <CustumNavbar/>
    <br/><br/><br/>
   <div className='flex justify-center items-center  '>
    <div className='w-[45%]  p-8 bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7	'>
     <div className='text-blue-600 text-center text-5xl'>
      <h1>Login to Hamro Ride</h1>
      </div>
      <br/>
      <form onSubmit={formikLogin.handleSubmit}>
      <Input type="email" variant="bordered" label="Email" 
      id="email"
      name="email"
      onChange={formikLogin.handleChange}
      value={formikLogin.values.email}  />
      <Input type="password" label="Password"  variant="bordered"
      id="password"
      name="password"
      onChange={formikLogin.handleChange}
      value={formikLogin.values.password}/>
    <br/><br/>
     <div className='text-blue-600 text-center '>
      <Button type="submit" radius="full" className="bg-blue-600 text-white shadow-lg">
      Login
    </Button>
    <br/><br/>
    <div className='font-bold'>
   <Link href='/register'> Don't have an account?</Link>  
   </div>
    </div>
    </form>
    </div>   
     </div>
     </div>
  )
}

export default login;