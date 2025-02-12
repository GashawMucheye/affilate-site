// src/components/Login.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Redirect based on user role (admin or guest)
      if (user) {
        router.push('/admin'); // Redirect to admin dashboard
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
