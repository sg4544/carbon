import Layout from "../../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import buildClient from "../api/buildClient";
import FootprintCharts from "../../components/Footprints/FootprintCharts";
import { IFootprint } from "../../components/Types/IFootprint";
import { IUser } from "../../components/Types/IUser";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface IFootprintPageProps {
  currentUser: IUser | null;
  footprint: IFootprint;
}

const FootprintPage: NextPage<IFootprintPageProps> = ({
  footprint,
  currentUser,
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
        <FootprintCharts footprint={footprint} />
      </Layout>
    </div>
  );
};
FootprintPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  const { currentUser } = data;
  //server side redirection
  if (currentUser === null && typeof window === "undefined") {
    context.res.writeHead(302, { location: "/signin" });
    context.res.end();
  }
  const footprintId = context.query.footprintId;
  try {
    const response = await axiosClient.get(
      `/api/footprints/myfootprints/${footprintId}`
    );
    const footprint = response.data;
    return { footprint: footprint, currentUser: currentUser };
  } catch {
    context.res.writeHead(302, { location: "/error" });
    context.res.end();
  }
};

export default FootprintPage;
