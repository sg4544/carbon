import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { FormCard, Title, FormBody } from "./Signin/Signin";
import ErrorMessage from "../components/ErrorMessage";
import { useRequest } from "../components/hooks/useRequest";
import { HTTP_METHOD } from "../components/Types/httpMethod";

const Div = styled.div`
  max-width: 350px;
  margin: auto;
`;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string().email().required("Email is a required field"),
  password: Yup.string().min(5).required("Password is a required field"),
});

interface IFormValues {
  name: string;
  email: string;
  password: string;
}
const initialValues: IFormValues = {
  name: "",
  email: "",
  password: "",
};

interface Istatus {
  isSubmitting: boolean;
}

const initialStatus: Istatus = {
  isSubmitting: false,
};

const Signup = () => {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState(initialStatus);
  const onSubmit = async (values: IFormValues) => {
    await doRequest();
    setFormStatus({ ...formStatus, isSubmitting: false });
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });
  const { doRequest, apiErrors } = useRequest({
    url: "/api/users/signup",
    method: HTTP_METHOD.POST,
    body: {
      name: values.name,
      password: values.password,
      email: values.email,
    },
    onSuccess: () => router.push("/dashboard"),
  });
  return (
    <Div>
      <FormCard style={{ marginTop: "25vh" }}>
        <FormBody>
          <Title>Create an Account</Title>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              type="text"
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.name && !!errors.name}
            />
            {touched.name && errors.name && (
              <ErrorMessage message={errors.name} />
            )}
            <Form.Input
              fluid
              type="email"
              name="email"
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
            <Form.Field></Form.Field>
            <Button
              color="grey"
              disabled={formStatus.isSubmitting}
              type="submit"
              style={{ marginTop: "15px", width: "100%" }}
            >
              {!formStatus.isSubmitting ? "Sign up" : "Submitting..."}
            </Button>
            {apiErrors}
          </Form>
        </FormBody>
      </FormCard>
    </Div>
  );
};

export default Signup;
