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
    {
      name: 'Register for COVID Vaccine',
      description: `Tip: Can also be done through "Arogya Setu" app.`,
      button: {
        text: 'Register!',
        link: 'https://selfregistration.cowin.gov.in/',
      },
    },
    {
      name: 'We need your help',
      description: `Follow the the link below to register as a Plasma donor.`,
      button: {
        text: 'Register!',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSegE2m5H8l6Ey_KDJx0KWVRvlofTd4tW21v6WO4-5xeJfSwUg/viewform',
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
          {item.description}
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
        autoPlay
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
