// src/app/products/[id]/page.js
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default async function ProductDetail({ params }) {
  const productId = params.id;
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    return <div>Product not found</div>;
  }

  const product = productSnap.data();

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className='w-64 h-64 object-cover'
      />
      <p>{product.description}</p>
      <a
        href={product.affiliateLink}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Buy Now
      </a>
    </div>
  );
}
