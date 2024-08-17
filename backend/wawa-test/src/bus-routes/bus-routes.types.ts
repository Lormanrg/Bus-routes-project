export interface Leg {
  distance: string;
  duration: string;
  start_address: string;
  end_address: string;
}

export interface BusRoute {
  id: number;
  origin: string;
  destination: string;
  legs: Leg[];
}
