import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BusRoutesService } from './bus-routes.service';
import { BusRoute } from './entities/bus-route.entity';
import { CreateBusRouteInput } from './dto/create-bus-route.input';
import { UpdateBusRouteInput } from './dto/update-bus-route.input';

@Resolver(() => BusRoute)
export class BusRoutesResolver {
  constructor(private readonly busRoutesService: BusRoutesService) {}

  @Mutation(() => BusRoute)
  async createBusRoute(
    @Args('createBusRouteInput') createBusRouteInput: CreateBusRouteInput,
  ): Promise<BusRoute> {
    return this.busRoutesService.getRoute(createBusRouteInput);
  }

  @Query(() => [BusRoute])
  async getAllBusRoutes(): Promise<BusRoute[]> {
    return await this.busRoutesService.getAllBusRoutes();
  }

  @Query(() => BusRoute, { name: 'busRoute' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.busRoutesService.findOne(id);
  }

  @Mutation(() => BusRoute)
  updateBusRoute(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBusRouteInput') updateBusRouteInput: UpdateBusRouteInput,
  ) {
    return this.busRoutesService.update(id, updateBusRouteInput);
  }

  @Mutation(() => BusRoute)
  removeBusRoute(@Args('id', { type: () => Int }) id: number) {
    return this.busRoutesService.remove(id);
  }
}
