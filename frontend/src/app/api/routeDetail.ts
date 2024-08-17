export const fetchRouteDetail = async (id: number) => {
    try {
     
  
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetBusRoute($id: Int!) {
              busRoute(id: $id) {
                id
                origin
                destination
                departureTime
                arrivalTime
                busCapacity
                availableSeats
              }
            }
          `,
          variables: {
            id, // Pasa el ID como variable
          },
        }),
      });

      console.log('Response status:', response.status); // Añadido para depuración
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
   
  console.log(result)
      if (result.errors) {
        throw new Error(`GraphQL error: ${result.errors.map((err: any) => err.message).join(', ')}`);
      }
  
      return result.data.busRoute; // Ajusta esto según el nombre del campo en la respuesta
  
    } catch (error) {
      console.error('Error fetching route detail:', error);
      throw error; // Propaga el error para que el componente pueda manejarlo
    }
  };
  