import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Leg {
  @Field()
  distance: string;

  @Field()
  duration: string;

  @Field()
  startAddress: string;

  @Field()
  endAddress: string;
}

@ObjectType()
export class BusRoute {
  @Field(() => Int)
  id: number;

  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  @IsOptional()
  departureTime: string;

  @Field()
  @IsOptional()
  arrivalTime: string;

  @Field(() => Int)
  busCapacity: number;

  @Field(() => Int)
  availableSeats: number;

  @Field()
  userId: string;

  @Field((type) => [Leg])
  legs: Leg[];

  @Field(() => Float)
  price: number;
}
