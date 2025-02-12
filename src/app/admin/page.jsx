// src/app/admin/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.data().role !== 'admin') {
          router.push('/');
        }
      } else {
        router.push('/login');
      }
    };
    checkAdmin();

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      alert('Product deleted!');
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <Link
        href='/admin/add-product'
        className='bg-green-500 text-white px-4 py-2 rounded'
      >
        Add Product
      </Link>
      <div className='mt-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='border p-4 rounded-lg shadow-md mb-4'
          >
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <Link
              href={`/admin/edit-product/${product.id}`}
              className='text-blue-500 hover:underline'
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              className='text-red-500 hover:underline ml-4'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
