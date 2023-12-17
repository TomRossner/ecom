import Link from 'next/link';

export default function Home() {
  return (
    <>
        <main className="flex flex-col items-center gap-10 p-16 z-0 overflow-x-hidden bg-white relative bottom-0 h-screen w-screen">
          <p className='text-6xl text-black font-bold my-24 text-center'>Welcome to Ecom!</p>
          <Link href={'/shop'} className='px-6 py-2 text-2xl bg-blue-400 rounded text-center hover:bg-blue-300 transition-all duration-75 drop-shadow-md'>Start shopping</Link>
        </main>
    </>
  )
}