import React, { useState } from "react";
import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Params,
  SortCriteria,
  SortField,
  stringToSortField,
} from "../../models/parameters";
import { Resource } from "../../models/Resource";
import Filters from "./Filters/Filters";
import TableToolbar from "./TableToolbar/TableToolbar";
import TableHead from "./TableHead/TableHead";

/** The default sorting order. */
const DEFAULT_SORT_ORDER = "asc";
/** The default page size. */
const DEFAULT_NUM_ROWS_PER_PAGE = 15;

/** Represents the supported header formats. */
type HeaderFormat = "string" | "date";

/** Represents a table header. */
export interface Header<T extends Resource> {
  field: keyof T;
  label: string;
  format: HeaderFormat;
}

/**
 * Formats the given field with the given format, returning the field as a
 * string. If the format is not possible, it returns `undefined`.
 * @param field - The field to format.
 * @param format - The format to use.
 * @returns The field formated or `undefined` if the formatting isn't possible.
 */
const formatField = <T extends Resource>(
  field: T[keyof T],
  format: HeaderFormat
) => {
  if (field === undefined) return undefined;
  switch (format) {
    case "date":
      // The cast is safe here because we know it's a string with date format.
      return new Date(field as string).toDateString();
    case "string":
      return field as string;
    default:
      return undefined;
  }
};

/**
 * Returns the new sort criteria for the given field based on the current sort
 * criteria.
 * @param currentSortCriteria - Is the current sort criteria.
 * @param field - The field.
 * @returns The new sort criteria.
 */
const getSortCriteria = (
  currentSortCriteria: SortCriteria | undefined,
  field: SortField
): SortCriteria => {
  const isDifferentField =
    !currentSortCriteria || currentSortCriteria.field !== field;
  if (isDifferentField) {
    return {
      field,
      order: DEFAULT_SORT_ORDER,
    };
  }
  return {
    ...currentSortCriteria,
    order: currentSortCriteria?.order === "asc" ? "desc" : "asc",
  };
};

/** An interface that represents the properties of the table. */
interface Props<T extends Resource> {
  /** The title of the table. */
  title: string;
  /**
   * The total number of elements in the collection. `count` doesn't represent
   * the length of the rows but the total number of elements in the collection,
   * excluding the pagination.
   */
  count: number;
  /** The list of resources to render. */
  rows: T[];
  /** The headers for the elements to use in the table. */
  headers: Header<T>[];
  /**
   * Callback for when there is a change in the table parameters. This includes
   * sorting, searching and changes in the pagination settings.
   */
  onParamsChange: React.Dispatch<React.SetStateAction<Params | undefined>>;
}

/** A component that renders a table to visualize and manage a list of Resources. */
const Table = <T extends Resource>({
  title,
  count,
  rows,
  headers,
  onParamsChange,
}: Props<T>) => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_NUM_ROWS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);

  const handleRequestSort = (property: keyof Resource) => {
    const propertySortField = stringToSortField(property);
    // If the API doesn't support sorting by the given property, return.
    if (!propertySortField) return;

    setSortCriteria((prev) => {
      const newSortCriteria = getSortCriteria(prev, propertySortField);
      onParamsChange((prev) => ({ ...prev, sortCriteria: newSortCriteria }));
      return newSortCriteria;
    });
  };

  const handleClick = (resUrl: string) => {
    window.open(resUrl, "_blank");
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    onParamsChange((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleShowFilterChange = () => {
    setShowFilters((prev) => !prev);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setRowsPerPage(newPageSize);
    setPage(0);
    onParamsChange((prev) => ({ ...prev, page: 1, pageSize: newPageSize }));
  };

  const handleSearchChange = (search: string) => {
    onParamsChange((prev) => ({ ...prev, search }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar title={title} onShowFilters={handleShowFilterChange} />
        <Filters show={showFilters} onSearchChange={handleSearchChange} />
        <TableContainer>
          <MuiTable>
            <TableHead
              headers={headers}
              sortCriteria={sortCriteria}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`row-${rowIndex}`}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(row.url)}
                  title="Click to navigate to the resource in SWAPI"
                >
                  {headers.map((header, headerIndex) => (
                    <TableCell align="left" key={`cell-${headerIndex}`}>
                      {formatField(row[header.field], header.format)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Table;
