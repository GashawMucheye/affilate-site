// src/components/Register.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user to Firestore with a default role of 'guest'
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'guest', // Default role
      });

      router.push('/'); // Redirect to home page after registration
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Register</h1>
        <form onSubmit={handleRegister} className='space-y-4'>
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
            Register
          </button>
        </form>
        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-500 hover:underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
