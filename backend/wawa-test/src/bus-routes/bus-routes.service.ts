import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusRouteInput } from './dto/create-bus-route.input';
import { UpdateBusRouteInput } from './dto/update-bus-route.input';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { Leg } from './bus-routes.types';

@Injectable()
export class BusRoutesService {
  constructor(private readonly prisma: PrismaService) {}

  // Función para convertir duración de texto a milisegundos
  private convertDurationToMs(duration: string): number {
    const parts = duration.split(' ');
    let totalMilliseconds = 0;

    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i]);
      const unit = parts[i + 1];

      if (unit.includes('hour')) {
        totalMilliseconds += value * 60 * 60 * 1000;
      } else if (unit.includes('min')) {
        totalMilliseconds += value * 60 * 1000;
      }
    }

    return totalMilliseconds;
  }

  async getRoute(createBusRouteInput: CreateBusRouteInput): Promise<any> {
    const { origin, destination, busCapacity, availableSeats, price } =
      createBusRouteInput;

    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin: encodeURIComponent(origin),
            destination: encodeURIComponent(destination),
            key: apiKey,
          },
        },
      );

      const legs = response.data.routes[0]?.legs;
      if (!legs) {
        throw new HttpException(
          `Failed to fetch route legs. API response: ${JSON.stringify(response.data)}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const formattedLegs = legs.map((leg: any) => ({
        startAddress: leg.start_address,
        endAddress: leg.end_address,
        distance: leg.distance.text,
        duration: leg.duration.text,
      }));

      // Generar una hora de salida aleatoria
      const departureTime =
        Date.now() + Math.floor(Math.random() * 60 * 60 * 1000 * 24); // Entre ahora y 24 horas adelante

      // Convertir la duración a milisegundos y calcular la hora de llegada
      const durationMs = this.convertDurationToMs(formattedLegs[0].duration);
      const arrivalTime = departureTime + durationMs;

      //Creando la ruta en la base de datos con Prisma
      const createBusRoute = await this.prisma.busRoute.create({
        data: {
          origin,
          destination,
          departureTime: new Date(departureTime).toISOString(),
          arrivalTime: new Date(arrivalTime).toISOString(),
          busCapacity,
          availableSeats,
          price,

          legs: {
            create: formattedLegs,
          },
        },
        include: {
          legs: true,
        },
      });
      return createBusRoute;
    } catch (error) {
      console.error('Error fetching route:', error.message); // Agrega esto para ver el mensaje de error
      throw new HttpException(
        'Failed to fetch route',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllBusRoutes(): Promise<any[]> {
    return this.prisma.busRoute.findMany();
  }

  async findOne(id: number) {
    const busRoute = await this.prisma.busRoute.findUnique({
      where: { id },
    });
    if (!busRoute) {
      throw new NotFoundException(`Bus route with ID ${id} not found`);
    }
    return busRoute;
  }

  async update(id: number, updateBusRouteInput: UpdateBusRouteInput) {
    const busRoute = await this.prisma.busRoute.findUnique({
      where: { id },
    });
    if (!busRoute) {
      throw new NotFoundException(`Bus route with ID ${id} not found`);
    }
    return this.prisma.busRoute.update({
      where: { id },
      data: updateBusRouteInput,
    });
  }

  async remove(id: number) {
    const busRoute = await this.prisma.busRoute.findUnique({
      where: { id },
    });

    if (!busRoute) {
      throw new NotFoundException(`Bus route with ID ${id} not found`);
    }

    //Eliminar primero las relaciones
    await this.prisma.leg.deleteMany({
      where: { busRouteId: id },
    });

    //Ahora elimino la ruta del autobús
    return this.prisma.busRoute.delete({
      where: { id },
    });
  }
}
