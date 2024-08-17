import { ObjectType, Field, Int, InputType, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Leg {
  @Field()
  startAddress: string;

  @Field()
  endAddress: string;

  @Field()
  distance: string;

  @Field()
  duration: string;
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
  departureTime: Date;

  @Field()
  arrivalTime: Date;

  @Field(() => Int)
  busCapacity: number;

  @Field(() => Int)
  availableSeats: number;

  @Field(() => Float)
  price: number;

  @Field(() => [Leg])
  legs: Leg[];
}

@InputType()
export class CreateBusRouteInput {
  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  @IsOptional()
  departureTime: Date;

  @Field()
  @IsOptional()
  arrivalTime: Date;

  @Field(() => Int)
  busCapacity: number;

  @Field(() => Int)
  availableSeats: number;

  @Field()
  userId: string;

  @Field(() => Float)
  price: number;
}
