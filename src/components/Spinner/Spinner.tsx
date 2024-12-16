import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Spinner.css";

/** A component with a simple spinner. */
const Spinner = () => (
  <Box className="root" data-testid="spinner">
    <CircularProgress />
  </Box>
);
export default Spinner;
