import { Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import * as React from 'react';

interface SnackbarContextValues {
  show: (severity: AlertProps['severity'], message: string) => Promise<void>;
}
const SnackbarContext = React.createContext({} as any);
export const useSnackbar = () => {
	return React.useContext(SnackbarContext) as SnackbarContextValues;
};
interface SnackbarProviderProps {}
const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
	const [open, setOpen] = React.useState(false);
	const [content, setContent] = React.useState({
		severity: 'success',
		message: '',
	} as {
    severity: AlertProps['severity'];
    message: string;
  });

	const handleClose = async () => {
		setOpen(false);
	};

	const show: SnackbarContextValues['show'] = async (severity, message) => {
		setContent({
			severity,
			message,
		});
		setOpen(true);
	};

	const values: SnackbarContextValues = {
		show,
	};

	const renderSnackbar = () => {
		return (
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={content.severity}>
					{content.message}
				</Alert>
			</Snackbar>
		);
	};

	return (
		<SnackbarContext.Provider value={values}>
			{children}
			{renderSnackbar()}
		</SnackbarContext.Provider>
	);
};

export default React.memo(SnackbarProvider);
