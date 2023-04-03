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
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import "../utils/classes";
import classes from "../utils/classes";


export default function layout({ title, children }) {
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
      mode: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  return (
    <>
      <Head>
        <title>{title ? `${title} - House Of meg` : "House Of Meg"}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}>House Of Meg</Typography>
              </Link>
            </NextLink>
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



