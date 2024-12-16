/**
 * An interface that represents a Person of the Star Wars universe according to
 * the service.
 */
export interface Person {
  name: string;
  birth_year: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height: string;
  mass: string;
  skin_color: string;
  url: string;
  created: Date;
  edited: Date;
}
