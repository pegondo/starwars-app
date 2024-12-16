/** The type for the fields that support sorting. */
export type SortField = "name" | "created";

/** The type for the supported sort orders. */
export type SortOrder = "asc" | "desc";

/** An interface that represents the sorting criteria. */
export interface SortCriteria {
  /** The sorting field. */
  field: SortField;
  /** The sorting order. If `undefined`, `"asc"` will be used. */
  order?: SortOrder;
}

// It would be ideal to generate this in runtime, but there's no way to interact
// with the TypeScript types `SortField` in runtime.
/** The list of fields that support sorting. */
export const SUPPORTED_SORT_FIELDS = ["name", "created"];

/**
 * Returns the given string as a `SortField` if it supports sorting and
 * `undefined` otherwise.
 * @param str - The given string.
 * @returns The given string as a `SortField` if it supports sorting and
 * `undefined` otherwise.
 */
export const stringToSortField = <T>(str: keyof T) => {
  if (!SUPPORTED_SORT_FIELDS.includes(str as string)) return undefined;
  return str as SortField;
};

/** An interface that represents the query parameters the service supports. */
export interface Params {
  page?: number;
  pageSize?: number;
  search?: string;
  sortCriteria?: SortCriteria;
}
