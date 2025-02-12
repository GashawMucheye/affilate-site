// src/app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>
        Welcome to the Fitness Affiliate Site
      </h1>
      <Link href='/products'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
          View Products
        </button>
      </Link>
    </div>
  );
}
