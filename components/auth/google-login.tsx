'use client';

import { googleAuthenticate } from '@/actions/google-login';
import React from 'react'
import { useFormState } from 'react-dom'
import { BsGoogle } from 'react-icons/bs';
import { Button } from '../ui/button';

const GoogleLogin = () => {
    const [errorMsgGoogle, dispatchGoogle] = useFormState(googleAuthenticate, "");
  return (
    <form className="flex mt-4" action={dispatchGoogle}>
    <Button className='flex flex-row items-center gap-3 w-full border border-gray-300' type="submit">
        <BsGoogle />Google Sign In
    </Button>
    <p>{errorMsgGoogle}</p>
</form>
  )
}

export default GoogleLogin;
