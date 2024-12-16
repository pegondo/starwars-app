import MuiTableHead from "@mui/material/TableHead";
import { visuallyHidden } from "@mui/utils";
import { SortCriteria, stringToSortField } from "../../../models/parameters";
import { Resource } from "../../../models/Resource";
import { Header } from "../Table";
import { Box, TableCell, TableRow, TableSortLabel } from "@mui/material";

/** An interface that represents the properties of the TableHead component. */
export interface Props<T extends Resource> {
  /** The list of headers to render. */
  headers: Header<T>[];
  /** Callback called when a header that supports sorting is clicked. */
  onRequestSort: (property: keyof Resource) => void;
  /** The current sort criteria. */
  sortCriteria?: SortCriteria;
}

/** A simple auxiliar component to render its children. */
const TableNoSortLabel = ({ children }: { children: JSX.Element }) => (
  <>{children}</>
);

/** A component to render the table head. */
const TableHead = <T extends Resource>(props: Props<T>) => {
  const { sortCriteria, onRequestSort, headers } = props;
  const createSortHandler =
    (property: keyof Resource, supportsSort: boolean) => () => {
      if (supportsSort) onRequestSort(property);
    };

  return (
    <MuiTableHead data-testid="table-head">
      <TableRow>
        {headers.map((header, index) => {
          const supportsSort = !!stringToSortField(header.field);
          const TableLabel = supportsSort
            ? TableSortLabel
            : (TableNoSortLabel as typeof TableSortLabel);
          return (
            <TableCell
              key={`header-${index}`}
              align="left"
              padding="normal"
              sortDirection={sortCriteria?.order}
              data-testid="table-head-cell"
            >
              <TableLabel
                active={sortCriteria?.field === header.field}
                direction={
                  sortCriteria?.field === header.field
                    ? sortCriteria?.order
                    : "asc"
                }
                onClick={createSortHandler(
                  header.field as keyof Resource,
                  supportsSort
                )}
                data-testid="table-head-header"
              >
                <strong data-testid="table-head-label">{header.label}</strong>
                {sortCriteria?.field === header.field ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortCriteria?.order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
