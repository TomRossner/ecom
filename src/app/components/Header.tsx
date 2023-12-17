import React from 'react';

type HeaderProps = {text: string}

const Header = ({text}: HeaderProps) => {
  return (
    <h1 className="text-4xl py-10 text-center bg-slate-200 text-black font-bold uppercase w-full">{text}</h1>
  )
}

export default Header;