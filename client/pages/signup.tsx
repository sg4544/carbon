import { NextPageContext, NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import buildClient from "./api/buildClient";
import { IUser } from "../components/Types/IUser";
import Signup from "../components/Signup";

interface ISignupPageProps {
  currentUser: IUser | null;
}

const SignupPage: NextPage<ISignupPageProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <Layout>
      <Signup />
    </Layout>
  );
};
SignupPage.getInitialProps = async (ctx: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(ctx);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  //it is annoying that first the signup page is fully loaded and then redirected to dashboard page in cases of page refresh, is it ok to do it David?
  if (currentUser && typeof window === "undefined") {
    ctx.res.writeHead(302, { location: "/dashboard" });
    ctx.res.end();
  }
  return data;
};

export default SignupPage;
