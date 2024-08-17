"use client";

import { useEffect, useState } from 'react';
import { fetchRouteDetail } from '../../api/routeDetail';
import { useParams } from 'next/navigation';

const convertTimestampToDate = (timestamp: string): string => {
  const numericTimestamp = Number(timestamp);

  if (isNaN(numericTimestamp) || numericTimestamp <= 0) {
    console.error('Invalid timestamp:', timestamp);
    return 'Invalid Date';
  }

  const date = new Date(numericTimestamp);

  if (isNaN(date.getTime())) {
    console.error('Invalid Date:', date);
    return 'Invalid Date';
  }

  return date.toLocaleString();
};

const RouteDetail = () => {
  const { id } = useParams();
  const [route, setRoute] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (typeof id === 'string') {
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          setLoading(true);
          try {
            const result = await fetchRouteDetail(numericId);

            if (result) {
              console.log('Fetched route:', result);
              setRoute(result);
            } else {
              setError('Failed to fetch route details');
            }
          } catch (err) {
            console.error(err);
            setError('An error occurred');
          } finally {
            setLoading(false);
          }
        } else {
          setError('Invalid ID format');
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Route Details</h1>
      <div className="mt-4 border p-4 rounded">
        <p><strong>Origin:</strong> {route?.origin}</p>
        <p><strong>Destination:</strong> {route?.destination}</p>
        <p><strong>Departure Time:</strong> {route?.departureTime ? convertTimestampToDate(route.departureTime) : 'N/A'}</p>
        <p><strong>Arrival Time:</strong> {route?.arrivalTime ? convertTimestampToDate(route.arrivalTime) : 'N/A'}</p>
        <p><strong>Bus Capacity:</strong> {route?.busCapacity}</p>
        <p><strong>Available Seats:</strong> {route?.availableSeats}</p>
      </div>
    </div>
  );
};

export default RouteDetail;
