export const fetchRoutes = async () => {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
              getAllBusRoutes {
                id
                origin
                destination
                price
              }
            }
          `,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    return "ocurrió un error";
  }
};
