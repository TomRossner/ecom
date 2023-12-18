import React from 'react';
import Spinner from './Spinner';

const ShopSkeleton = () => {
  return (
    <div id='shopSkeleton' className='min-h-screen w-screen bg-white flex gap-5 flex-wrap py-20 justify-center'>
        {[...Array(10)].map((_, idx: number) => {
            return <div key={idx} className='flex flex-col px-5 py-4 bg-slate-300 rounded w-72 gap-2 min-h-96 relative'>
                <div className="h-60 w-full flex justify-center items-center bg-white rounded">
                    <Spinner/>
                </div>
                <div className='w-full h-6 bg-slate-400 rounded' />
                <div className='w-full h-4 bg-slate-200 rounded' />
                <div className='grow h-16' />
                <div className='w-full h-3 bg-slate-400 rounded' />
                <div className='w-full h-9 bg-lime-400 rounded' />
            </div>
        })}
    </div>
  )
}

export default ShopSkeleton;