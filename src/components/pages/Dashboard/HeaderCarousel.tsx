import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useBreakpoint from 'src/hooks/useBreakpoint';

export const useStyles = makeStyles((theme) => ({
  navButtons: {
    opacity: 0.05,
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    height: '35px',
  },
}));

const HeaderCarousel = () => {
  const classes = useStyles();
  const isUpSm = useBreakpoint('sm');
  const items = [
    // {
    //   name: 'Care for the Living',
    //   description: 'If you truly loved yourself, you could never hurt another.',
    // },
    {
      name: 'Find help on Twitter',
      description: `Here's a tool that would make your search more efficient with the right keywords!`,
      button: {
        text: 'Check it out!',
        link: 'https://covid19-twitter.in',
      },
    },
  ];

  const renderItem = (item: typeof items[0], key) => {
    return (
      <Container key={key} className={classes.carouselItem} maxWidth="md">
        <Typography
          component="h2"
          variant={isUpSm ? 'h3' : 'h6'}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {item.name} <br></br>
        </Typography>
        <Typography
          variant={isUpSm ? 'h6' : 'subtitle1'}
          align="center"
          color="textSecondary"
          paragraph
        >
          &#34;{item.description}&#34;
          <br />
          {/* - Buddha */}
        </Typography>

        {item.button ?
          <a target="blank" href={item.button.link}
            className={classes.link}>
            <Button variant="outlined">
              {item.button.text}
            </Button>
          </a> : <a className={classes.link} />}
      </Container>
    );
  };
  return (
    <Container maxWidth="lg">
      <Carousel
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
