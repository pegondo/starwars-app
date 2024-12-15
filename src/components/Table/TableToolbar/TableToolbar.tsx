import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

/** An interface that represents the properties of the TableToolbar component. */
export interface Props {
  /** The title of the table toolbar. */
  title: string;
  /** A callback called when the option to show the filters is clicked. */
  onShowFilters: () => void;
}

/** A component that renders a toolbar for a table. */
const TableToolbar = ({ title, onShowFilters }: Props) => (
  <Toolbar
    sx={[
      {
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      },
    ]}
    data-testid="table-toolbar"
  >
    <Typography
      sx={{ flex: "1 1 100%" }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      <strong data-testid="table-toolbar-title">{title}</strong>
    </Typography>
    <Tooltip
      title="Filters"
      onClick={onShowFilters}
      data-testid="table-toolbar-tooltip"
    >
      <IconButton>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  </Toolbar>
);

export default TableToolbar;
