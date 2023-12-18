import React from 'react';

// Interface representing Header props.
interface IHeaderProps {
  text: string;
}

const Header = ({text}: IHeaderProps) => {
  return (
    <h1 className="text-4xl py-10 text-center bg-slate-200 text-black font-bold uppercase w-full">
      {text}
    </h1>
  )
}

export default Header;