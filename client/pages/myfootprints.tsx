import Layout from "../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import buildClient from "./api/buildClient";
import { IUser } from "../components/Types/IUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MyFootprints from "../components/Footprints/MyFootprints";
import { IFootprint } from "../components/Types/IFootprint";

interface IMyFootprintPageProps {
  currentUser: IUser | null;
  footprintList: IFootprint[];
}

const MyFootprintPage: NextPage<IMyFootprintPageProps> = ({
  currentUser,
  footprintList,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/signin"); //client side redirection
    }
  }, []);
  return (
    <div>
      <Layout>
        <MyFootprints footprintList={footprintList} />
      </Layout>
    </div>
  );
};
MyFootprintPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  if (currentUser === null && typeof window === "undefined") {
    //server side redirection
    context.res.writeHead(302, { location: "/signin" });
    context.res.end();
  }
  const response = await axiosClient.get("/api/footprints/myfootprints");
  const footprintList = response.data;
  return { footprintList: footprintList, currentUser: currentUser };
};

export default MyFootprintPage;
