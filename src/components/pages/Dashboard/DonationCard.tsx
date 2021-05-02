import {
  Tooltip,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PanToolIcon from '@material-ui/icons/PanTool';
import React from 'react';
import { parseTime } from 'src/utils/commonUtils';
import { ExistingDonationType } from '../../../types';
import { useStyles } from './styles';

interface DonationCardProps {
  data: ExistingDonationType;
  onClick: (id: string) => void;
}

const DonationCard = (props: DonationCardProps) => {
  const { data: card, onClick } = props;

  const classes = useStyles();

  return (
    <Card
      className={`${card.donationStatus?.value === 'open' ?
        classes.openCard :
        classes.closedCard
      }`}
      onClick={() => onClick && onClick(card.id)}
    >
      {/* <CardMedia
          className={classes.cardMedia}
          image={card.image}
          title="Image title"
        /> */}
      <CardContent className={classes.cardContent}>
        <Typography noWrap gutterBottom variant="h5" component="h2">
          {card.donationTitle}
        </Typography>
        <hr />
        <Tooltip
          style={{ width: '250px' }}
          enterDelay={500}
          title={
            <>
              <Typography color="inherit">
                {card.donationDescription}
              </Typography>
            </>
          }
          placement="top"
        >
          <Typography noWrap>{card.donationDescription}</Typography>
        </Tooltip>
        <br />
        <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
          <Typography style={{ marginRight: '10px' }}>
            <i>{card.donationStatus?.value === 'open' ? 'Donation registered' : 'Donated'} By:</i>
          </Typography>
          <Typography>{card.donorName}</Typography>
        </Box>
        <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
          <Typography style={{ marginRight: '10px' }}>
            <i>Address:</i>
          </Typography>
          <Typography>
            {card.donorDistrict?.label}, {card.donorState?.label}
          </Typography>
        </Box>
        {/* {card.donationStatus?.value === "closed" ? (
            <Typography style={{ display: "flex", alignItems: "center" }}>
              Donor: {card.donorName}
              <FavoriteIcon
                color="secondary"
                fontSize="small"
                style={{ marginLeft: "5px" }}
              />
            </Typography>
          ) : null} */}
        <br />
        <Chip
          label={card.donorBloodGroup?.label}
          variant="outlined"
        />{' '}
        <Chip label={card.donationCategory?.label} variant="outlined" />{' '}
        <Chip label={parseTime(card.updatedAt)} variant="outlined" /> <br />
        <br />
        {card.donationStatus?.value === 'open' ?
          <Button
            variant="outlined"
            size="small"
            endIcon={<PanToolIcon />}
            onClick={() => onClick && onClick(card.id)}
          >
            I need help
          </Button> :
          null}
      </CardContent>
    </Card>
  );
};

export default DonationCard;
