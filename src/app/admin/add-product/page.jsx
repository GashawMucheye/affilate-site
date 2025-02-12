'use client';
import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    affiliateLink: '',
    imageUrl: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), product);
      alert('Product added!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Product Name'
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <textarea
        placeholder='Description'
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type='url'
        placeholder='Affiliate Link'
        onChange={(e) =>
          setProduct({ ...product, affiliateLink: e.target.value })
        }
      />
      <input
        type='url'
        placeholder='Image URL'
        onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
      />
      <button type='submit'>Add Product</button>
    </form>
  );
}
