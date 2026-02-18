import React from 'react'
import { Link, useNavigate } from 'react-router';
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleChangeName = () => {
    localStorage.removeItem("username");
    navigate("/name");
  };

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
          Scribiq
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-base-content/60 text-sm hidden sm:block">
            Hi, <span className="text-primary font-semibold">{username}</span>
          </span>
          <button onClick={handleChangeName} className="btn btn-ghost btn-sm">
            Change Name
          </button>
          <Link to={"/create"} className="btn btn-primary flex items-center gap-2">
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar