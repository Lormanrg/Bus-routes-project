import Link from "next/link";
import React from "react";

const Welcome = () => {
  return (
    <div className="container min-h-screen gap-4  mx-auto my-auto flex flex-col text-center justify-center bg-slate-500 rounded-3xl text-white ">
      <h1 className="text-3xl font-bold">Bienvenidos a Ruta de Buses APP!</h1>
      <p className="mt-4">
        <Link rel="stylesheet" href="/bus-routes">
          <button href="" className="focus:ring-2 text-blue-500">
            Ver Rutas de Buses
          </button>
        </Link>
      </p>
    </div>
  );
};

export default Welcome;
