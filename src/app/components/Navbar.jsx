// src/components/Navbar.js
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logout from './Logout';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-white text-lg font-bold'>
          Fitness Affiliate
        </Link>
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className='text-white md:hidden'>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-4'>
          <Link href='/' className='text-white hover:text-gray-300'>
            Home
          </Link>
          <Link href='/products' className='text-white hover:text-gray-300'>
            Products
          </Link>
          <Link href='/admin' className='text-white hover:text-gray-300'>
            Admin
          </Link>
          <Link href='/login' className='text-white hover:text-gray-300'>
            Login
          </Link>
          <Link href='/register' className='text-white hover:text-gray-300'>
            Register
          </Link>
          <Logout />
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden mt-4'>
          <Link href='/' className='block text-white hover:text-gray-300 py-2'>
            Home
          </Link>
          <Link
            href='/products'
            className='block text-white hover:text-gray-300 py-2'
          >
            Products
          </Link>
          <Link
            href='/admin'
            className='block text-white hover:text-gray-300 py-2'
          >
            Admin
          </Link>
          <Link
            href='/login'
            className='block text-white hover:text-gray-300 py-2'
          >
            Login
          </Link>
          <Link
            href='/register'
            className='block text-white hover:text-gray-300 py-2'
          >
            Register
          </Link>
          <Logout />
        </div>
      )}
    </nav>
  );
}
