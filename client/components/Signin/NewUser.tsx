import styled from "styled-components";
import Link from "next/link";

const Div = styled.div`
  margin-top: 20px;
  text-align: center;
  border: 1px solid #d8d7d7;
  border-radius: 3px;
  padding: 15px;
`;

const NewUser = () => {
  return (
    <Div>
      <p>
        New User?{" "}
        <Link href="/signup">
          <a>Create an account.</a>
        </Link>
      </p>
    </Div>
  );
};

export default NewUser;
