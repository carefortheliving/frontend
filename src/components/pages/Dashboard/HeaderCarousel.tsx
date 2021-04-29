import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useBreakpoint from 'src/hooks/useBreakpoint';

export const useStyles = makeStyles((theme) => ({
  navButtons: {
    opacity: 0.05,
  },
  carouselItem: {
    padding: '40px',
  },
}));

const HeaderCarousel = () => {
  const classes = useStyles();
  const isUpSm = useBreakpoint('sm');
  const items = [
    {
      name: 'Care for the Living',
      description: 'If you truly loved yourself, you could never hurt another.',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];

  const renderItem = (item, key) => {
    return (
      <Paper key={item.key} className={classes.carouselItem}>
        <h2>{item.name}</h2>
        <p>{item.description}</p>

        <Button className="CheckButton">Check it out!</Button>
      </Paper>
    );
  };
  return (
    <Container maxWidth="lg">
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={isUpSm}
        navButtonsProps={{
          className: classes.navButtons,
          style: {},
        }}
      >
        {items.map((item, i) => renderItem(item, i))}
      </Carousel>
    </Container>
  );
};

export default HeaderCarousel;
