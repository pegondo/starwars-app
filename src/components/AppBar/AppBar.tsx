import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./AppBar.css";

/** The properties for the AppBar component. */
export type Props = {
  /** The header to render in the bar. */
  header: string;
};

/**
 * A component to render a simple application bar with a the header.
 */
const AppBar = ({ header }: Props) => (
  <Box className="root" data-testid="app-bar">
    <MuiAppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          className="text"
          data-testid="app-bar-header"
        >
          {header}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  </Box>
);

export default AppBar;
