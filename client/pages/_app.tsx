//import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../components/context/AuthContext";
import buildClient from "./api/buildClient";
import { appWithTranslation } from "../i18n";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider currentUser={pageProps.currentUser}>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(ctx);

  // fetch current user
  const { data } = await axiosClient.get("/api/users/currentUser");

  // defining getInitialProps on a custom app component will mean that the getInitialProps of our pages does not run automatically
  // check if the page currently being rendered (the Component) has a getInitialProps function and if so, run it as well
  let pageProps: any = { currentUser: data.currentUser };

  if (Component.getInitialProps) {
    pageProps = { ...pageProps, ...(await Component?.getInitialProps(ctx)) };
  }

  // pass down query string
  pageProps.query = ctx.query;
  return { pageProps };
};

export default appWithTranslation(MyApp);
