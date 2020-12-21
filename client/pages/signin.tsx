import { NextPageContext, NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Signin from "../components/Signin/Signin";
import buildClient from "./api/buildClient";
import { IUser } from "../components/Types/IUser";

interface ISigninPageProps {
  currentUser: IUser | null;
}

const SigninPage: NextPage<ISigninPageProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <Layout>
      <Signin />
    </Layout>
  );
};

SigninPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  if (currentUser && typeof window === "undefined") {
    context.res.writeHead(302, { location: "/dashboard" });
    context.res.end();
  }
  return data;
};

export default SigninPage;
