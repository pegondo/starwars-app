/**
 * An interface that represents a planet of the Star Wars universe according to
 * the service.
 */
export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  url: string;
  created: Date;
  edited: Date;
}
