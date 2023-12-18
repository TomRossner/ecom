import Link from 'next/link';
import Image from 'next/image';
import Shopping from "./assets/women-doing-shopping-with-trolley-with-market.png";
import ShoppingGirl from "./assets/girl-doing-shopping.png";
import WelcomeHeader from './components/WelcomeHeader';

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 p-5 z-0 overflow-x-hidden bg-amber-100 relative bottom-0 h-screen w-screen">
      <WelcomeHeader/>

      <Image src={Shopping} alt='Shopping' width={500} className='absolute z-0 opacity-60 translate-x-20'/>

      <Image src={ShoppingGirl} alt='Shopping girl' width={500} className='rotate-12 top-50 z-0 -translate-x-20 sm:-translate-x-52'/>

      <Link href={'/shop'} className='px-6 py-2 text-2xl bg-blue-400 rounded text-center hover:bg-blue-300 transition-all duration-75 drop-shadow-md z-10'>Start shopping</Link>
    </main>
  )
}