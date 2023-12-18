import Link from "next/link";

const Logo = () => {
  return (
    <Link href={'/'} className="flex text-2xl px-4 left-0 font-bold">
      E<span className="text-blue-600">com</span>
    </Link>
  )
}

export default Logo;