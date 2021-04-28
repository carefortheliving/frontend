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
import { ExistingRequestType } from '../../../types';
import { useStyles } from './styles';

interface RequestCardProps {
  data: ExistingRequestType;
  onClick: (id: string) => void;
}

const RequestCard = (props: RequestCardProps) => {
  const { data: card, onClick } = props;

  const classes = useStyles();

  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card
        className={`${card.requestStatus?.value === 'open' ?
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
          <Typography gutterBottom variant="h5" component="h2">
            {card.requestTitle}
          </Typography>
          <hr />
          <Tooltip
            style={{ width: '250px' }}
            enterDelay={500}
            title={
              <>
                <Typography color="inherit">
                  {card.requestDescription}
                </Typography>
              </>
            }
            placement="top"
          >
            <Typography noWrap>{card.requestDescription}</Typography>
          </Tooltip>
          <br />
          <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
            <Typography style={{ marginRight: '10px' }}>
              <i>Requested By:</i>
            </Typography>
            <Typography>{card.requesterName}</Typography>
          </Box>
          <Box style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.54)' }}>
            <Typography style={{ marginRight: '10px' }}>
              <i>Address:</i>
            </Typography>
            <Typography>
              {card.patientDistrict?.label}, {card.patientState?.label}
            </Typography>
          </Box>
          {/* {card.requestStatus?.value === "closed" ? (
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
            label={card.patientBloodGroup?.label}
            variant="outlined"
          />{' '}
          <Chip label={card.requestCategory?.label} variant="outlined" />{' '}
          <Chip label={parseTime(card.updatedAt)} variant="outlined" /> <br />
          <br />
          {card.requestStatus?.value === 'open' ?
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<PanToolIcon />}
              onClick={() => onClick && onClick(card.id)}
            >
              I want to help
            </Button> :
            null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RequestCard;
