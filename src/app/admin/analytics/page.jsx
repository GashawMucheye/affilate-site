// src/app/admin/analytics/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function AnalyticsPage() {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const fetchClicks = async () => {
      const querySnapshot = await getDocs(collection(db, 'clicks'));
      const clicksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClicks(clicksData);
    };
    fetchClicks();
  }, []);

  return (
    <div>
      <h1>Affiliate Link Clicks</h1>
      <ul>
        {clicks.map((click) => (
          <li key={click.id}>
            Product ID: {click.productId}, User: {click.userId}, Time:{' '}
            {click.timestamp.toDate().toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
