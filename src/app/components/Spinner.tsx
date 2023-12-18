import React from 'react';
import Loader from "../assets/spinner.png";
import Image from 'next/image';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center animate-spin opacity-50'>
        <Image src={Loader} alt="Loading" width={50}/>
    </div>
  )
}

export default Spinner;