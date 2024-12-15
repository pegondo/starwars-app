import { Box, Collapse, Divider, TextField, Typography } from "@mui/material";
import "./Filters.css";

/** An interface that represents the properties of the Filters component. */
export interface Props {
  /**
   * Whether or not to render the component. The component will play an animation when this value changes.
   */
  show: boolean;
  /** Callback for when there is a change in the search text filter. */
  onSearchChange: (search: string) => void;
}

/** A component that renders a list of filters. */
const Filters = ({ show, onSearchChange }: Props) => (
  <Collapse in={show} data-testid="filters">
    <Divider variant="fullWidth" />
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "30ch",
        },
        marginLeft: 3,
        paddingBottom: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        className="header"
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Filters
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={({ target: { value } }) => onSearchChange(value)}
        slotProps={{
          htmlInput: { "data-testid": "filters-input" },
        }}
      />
    </Box>
    <Divider variant="fullWidth" />
  </Collapse>
);

export default Filters;
