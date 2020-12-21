import ErrorPage from "next/error";
import Layout from "../components/Layout/Layout";

const CustomErrorPage = () => {
  return (
    <Layout>
      <ErrorPage statusCode={404} />
    </Layout>
  );
};

export default CustomErrorPage;
