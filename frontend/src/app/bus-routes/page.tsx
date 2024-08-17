"use client";

import { useEffect, useState } from 'react';
import { fetchRoutes } from '../api/busRoutes';
import Link from 'next/link';

const BusRoutes = () => {
  
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = async () => {
    setLoading(true);
    const routes = await fetchRoutes();
  
    setLoading(false);
    if (!routes.data) {
      setError(routes);
     
    }

    setRoutes(routes.data.getAllBusRoutes);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Bus Routes</h1>
      <ul className="mt-4">
        {routes.map((route) => (
          <li key={route.id} className="border p-4 mb-4 rounded">
            <p><strong>Origin:</strong> {route.origin}</p>
            <p><strong>Destination:</strong> {route.destination}</p>
            <p><strong>Price:</strong> ${route.price}</p>
            <Link href={`/details/${route.id}`}>
              <button className="text-blue-500 hover:underline">View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusRoutes;

