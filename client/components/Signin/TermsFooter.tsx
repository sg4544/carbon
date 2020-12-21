import styled from "styled-components";
import Link from "next/link";
import PageCard from "../PageCard";

const StyledSpan = styled.span`
  font-size: 14px;
  padding-right: 20px;
`;

const TermsFooter = () => {
  return (
    <PageCard isTextCentered>
      <StyledSpan>
        <Link href="#">
          <a>Term</a>
        </Link>
      </StyledSpan>
      <StyledSpan>
        <Link href="#">
          <a>Privacy</a>
        </Link>
      </StyledSpan>
      <StyledSpan>
        <Link href="#">
          <a>Security</a>
        </Link>
      </StyledSpan>
      <StyledSpan>
        <Link href="#">
          <a>Contact us</a>
        </Link>
      </StyledSpan>
    </PageCard>
  );
};

export default TermsFooter;
