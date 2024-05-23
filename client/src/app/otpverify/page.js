'use client'
import HamroRideLogo from '@/component/logo/page';
import React from 'react';
import {Button, Input} from "@nextui-org/react";

const OTPForm = () => {
 

  return (
    <div>
        <div className='p-4'><HamroRideLogo/></div>
    <div className='flex justify-center items-center'>
    <div className='text-5xl flex flex-col justify-center items-left bg-gray-100 rounded-3xl shadow-2xl p-20 m-5 space-y-7  '>
      Enter OTP
      <br/><br/>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
     <div className='w-[100%]'>
      <Input type="text" label="OTP" />
      </div></div>
      <div className='text-center'>
    <Button color="primary">submit</Button>
    </div>
    
    
    </div>
    </div>
    </div>
  );
};

export default OTPForm;