// src/app/products/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
// import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
