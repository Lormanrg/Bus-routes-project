import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateBusRouteInput } from './create-bus-route.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBusRouteInput extends PartialType(CreateBusRouteInput) {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  origin?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  destination?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  departureTime?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  arrivalTime?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  busCapacity?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  availableSeats?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  price?: number;
}
