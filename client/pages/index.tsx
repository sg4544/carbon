import LandingPage from "../components/Landing";
import Layout from "../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import buildClient from "./api/buildClient";
import { IUser } from "../components/Types/IUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IHomePageProps {
  currentUser: IUser | null;
}

const HomePage: NextPage<IHomePageProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard"); //client side redirection
    }
  }, []);
  return (
    <div>
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  );
};
HomePage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  if (currentUser && typeof window === "undefined") {
    //server side redirection
    context.res.writeHead(302, { location: "/dashboard" });
    context.res.end();
  }
  return data;
};

export default HomePage;
