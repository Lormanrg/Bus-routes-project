import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Leg } from '../entities/bus-route.entity';

@InputType()
export class CreateBusRouteInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  origin: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  departureTime?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  arrivalTime?: string;

  @Field(() => Int)
  @IsInt()
  busCapacity: number;

  @Field(() => Int)
  @IsInt()
  availableSeats: number;

  @Field(() => Float)
  price: number;
}
@InputType()
export class CreateLegInput {
  @Field()
  startAddress: string;

  @Field()
  endAddress: string;

  @Field()
  distance: string;

  @Field()
  duration: string;
}
