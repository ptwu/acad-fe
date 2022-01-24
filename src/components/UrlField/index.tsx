import { Alert, NoSsr, Snackbar, styled, TextField } from '@mui/material';
import { ReactElement, useState } from 'react';
import './index.module.css';

type Props = {
  readonly url: string;
  readonly className?: string;
};

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    .MuiOutlinedInput-input:hover {
      cursor: pointer;
    }
    .MuiOutlinedInput-input:focus {
      cursor: auto;
    }
  }
`;

export default function CopyableUrlField({
  url,
  className,
}: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const handleLinkCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(url);
  };

  return (
    <NoSsr>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Link copied!
        </Alert>
      </Snackbar>
      <StyledTextField
        id="personalized-url"
        label="Click me to copy to clipboard"
        defaultValue={url}
        InputProps={{
          readOnly: true,
        }}
        className={className}
        onClick={handleLinkCopy}
        fullWidth
      />
    </NoSsr>
  );
}
