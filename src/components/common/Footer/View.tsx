import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footerStyle: {
    position: "static",
    bottom: "1%",
    left: 0,
    width: "100%",
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Typography
      className={classes.footerStyle}
      variant="body2"
      color="textSecondary"
    >
      {"copyright © "}
      {new Date().getFullYear()}
      <a
        href="https://github.com/carefortheliving"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>{" carefortheliving"}</strong>
      </a>
    </Typography>
  );
}
