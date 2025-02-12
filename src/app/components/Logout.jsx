// src/components/Logout.js
'use client';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className='text-white hover:text-gray-300'>
      Logout
    </button>
  );
}
