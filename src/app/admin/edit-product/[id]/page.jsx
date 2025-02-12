// src/app/admin/edit-product/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditProduct({ params }) {
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState({
    name: '',
    description: '',
    affiliateLink: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct(productSnap.data());
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, product);
      alert('Product updated!');
      router.push('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Product</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Product Name'
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className='w-full p-2 border rounded'
        />
        <textarea
          placeholder='Description'
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className='w-full p-2 border rounded'
        />
        <input
          type='url'
          placeholder='Affiliate Link'
          value={product.affiliateLink}
          onChange={(e) =>
            setProduct({ ...product, affiliateLink: e.target.value })
          }
          className='w-full p-2 border rounded'
        />
        <input
          type='url'
          placeholder='Image URL'
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          className='w-full p-2 border rounded'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
