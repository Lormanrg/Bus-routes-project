-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusRoute" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "busCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "BusRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leg" (
    "id" SERIAL NOT NULL,
    "startAddress" TEXT NOT NULL,
    "endAddress" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "busRouteId" INTEGER NOT NULL,

    CONSTRAINT "Leg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leg" ADD CONSTRAINT "Leg_busRouteId_fkey" FOREIGN KEY ("busRouteId") REFERENCES "BusRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
