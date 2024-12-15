import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/** The properties for the ErroDialog component. */
export interface Props {
  /** The title of the dialog. If falsy, the dialog won't render. */
  title: string;
  /** The message for the body of the dialog. */
  message: string;
  /** The text for the accept button. If falsy, the text will be `"OK"`. */
  buttonText?: string;
  /** Callback for when the close button is pressed. */
  onClose: () => void;
}

/** A component that renders an error dialog with the given properties. */
const ErrorDialog = ({ title, message, buttonText, onClose }: Props) => {
  const [open, setOpen] = React.useState(title !== undefined);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!title) return null;

  return (
    <Dialog open={open} onClose={handleClose} data-testid="error-dialog">
      <DialogTitle data-testid="error-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="error-dialog-message">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="error-dialog-button" onClick={handleClose}>
          {buttonText || "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
