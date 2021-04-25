import {
	makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
	getCreateRequestRoute,
} from 'src/components/common/RouterOutlet/routerUtils';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing(10),
		right: theme.spacing(3),
	},
}));

interface FabIconProps {}

const FabIcon: React.FC<FabIconProps> = () => {
	const classes = useStyles();
	const history = useHistory();
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const actions = [
		{
			icon: (
				<LocalHospitalIcon
					color="secondary"
					onClick={() => history.push(getCreateRequestRoute())}
				/>
			),
			name: 'Create Request',
		},
	];

	return (
		<SpeedDial
			color="secondary"
			ariaLabel="FAB"
			className={classes.fab}
			icon={<AddIcon />}
			onClose={handleClose}
			onOpen={handleOpen}
			open={isOpen}
			direction={'up'}
		>
			{actions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					tooltipOpen
					onClick={handleClose}
				/>
			))}
		</SpeedDial>
	);
};

export default FabIcon;
