const SERVICE_URL =
  import.meta.env.VITE_SERVICE_URL || "http://localhost:8080/api";

/** The endpoint to request the service for people. */
export const PEOPLE_ENDPOINT = `${SERVICE_URL}/people`;

/** The endpoint to request the service for planets. */
export const PLANETS_ENDPOINT = `${SERVICE_URL}/planets`;
