import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout/Layout";
import { IUser } from "../components/Types/IUser";
import buildClient from "./api/buildClient";

interface IDashboardPageProps {
  currentUser: IUser | null;
}

const DashboardPage: NextPage<IDashboardPageProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
    }
  }, []);
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};
DashboardPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  if (currentUser === null && typeof window === "undefined") {
    context.res.writeHead(302, { location: "/signin" });
    context.res.end();
  }
  return data;
};

export default DashboardPage;
