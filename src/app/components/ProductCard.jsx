// src/components/ProductCard.js
import Link from 'next/link';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function ProductCard({ product }) {
  const handleAffiliateClick = async () => {
    try {
      await addDoc(collection(db, 'clicks'), {
        productId: product.id,
        timestamp: new Date(),
        userId: 'guest', // Replace with actual user ID if logged in
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='border p-4 rounded-lg shadow-md'>
      <img
        src={product.imageUrl}
        alt={product.name}
        className='w-full h-48 object-cover'
      />
      <h2 className='text-xl font-semibold mt-2'>{product.name}</h2>
      <p className='text-gray-600'>{product.description}</p>
      <Link
        href={`/products/${product.id}`}
        className='text-blue-500 hover:underline'
      >
        View Details
      </Link>
      <a
        href={product.affiliateLink}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleAffiliateClick}
        className='bg-blue-500 text-white px-4 py-2 rounded block mt-2 text-center'
      >
        Buy Now
      </a>
    </div>
  );
}
