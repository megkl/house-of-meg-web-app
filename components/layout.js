//wrapper for all layers
import { createTheme } from "@mui/material/styles";
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Link,
  Toolbar,
  Typography,
  Container,
  Box,
  Switch,
  Badge,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import "../utils/classes";
import classes from "../utils/classes";
import { useContext } from "react";
import { Store } from "@/utils/store";
import jsCookie from "js-cookie";


export default function Layout({ title, children }) {
  const { state, dispatch} = useContext(Store);
  const { darkMode, cart} = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    //change default color
    palette: {
      mode: darkMode? 'dark':'light',
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const darkModeChangeHandler=() =>{
    dispatch({type: darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'});
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode? 'ON':'OFF');
  }
  return (
    <>
      <Head>
        <title>{title ? `${title} - House Of meg` : "House Of Meg"}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box alignItems="center" display="flex">
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}>House Of Meg</Typography>
              </Link>
            </NextLink>
            </Box>
            <Box>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}>

              </Switch>
              <NextLink href="cart" passHref>
                <Typography component="span">
                  {cart.cartItems.length >0 ? (
                    <Badge color ="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>
                  ):('Cart')}
                </Typography>
              </NextLink>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>All rights reserved. House Of Meg.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}



