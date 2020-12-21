import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Calculator from "../components/Calculator/Calculator";
import Layout from "../components/Layout/Layout";
import { IUser } from "../components/Types/IUser";
import buildClient from "./api/buildClient";

interface ICalculatorPageProps {
  currentUser: IUser | null;
}

const CalculatorPage: NextPage<ICalculatorPageProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
    }
  }, []);
  return (
    <Layout>
      <Calculator />
    </Layout>
  );
};
CalculatorPage.getInitialProps = async (context: NextPageContext) => {
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

export default CalculatorPage;
