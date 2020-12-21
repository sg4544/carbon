import { Form, Button } from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Brand from "./Brand";
import NewUser from "./NewUser";
import TermsFooter from "./TermsFooter";
import { HTTP_METHOD } from "../Types/httpMethod";
import { useRequest } from "../hooks/useRequest";
import ErrorMessage from "../ErrorMessage";

const Div = styled.div`
  max-width: 350px;
  margin: auto;
`;

export const FormCard = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid #d8d7d7;
  border-radius: 3px;
`;
export const FormBody = styled.div`
  padding: 15px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

interface IFormValues {
  email: string;
  password: string;
}

const initialValues: IFormValues = {
  email: "",
  password: "",
};

function Signin() {
  const router = useRouter();

  const onSubmit = async () => {
    await doRequest();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  const { doRequest, apiErrors } = useRequest({
    url: "/api/users/signin",
    method: HTTP_METHOD.POST,
    body: {
      email: values.email,
      password: values.password,
    },
    onSuccess: () => router.push("/dashboard"),
  });

  return (
    <Div>
      <Brand />
      <FormCard>
        <FormBody>
          <Title>Sign in</Title>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              name="email"
              label="Email"
              placeholder="Email"
              error={!!touched.email && !!errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <ErrorMessage message={errors.email} />
            )}
            <Form.Input
              fluid
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              error={!!touched.password && !!errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <ErrorMessage message={errors.password} />
            )}
            <Button
              type="submit"
              color="grey"
              style={{ marginTop: "15px", width: "100%" }}
            >
              Submit
            </Button>
            {apiErrors}
          </Form>
        </FormBody>
      </FormCard>
      <NewUser />
      <TermsFooter />
    </Div>
  );
}

export default Signin;
