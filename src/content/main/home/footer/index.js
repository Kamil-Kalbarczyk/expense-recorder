import styled from "styled-components";
import { Typography } from "@mui/material";

const FooterContainer = styled.footer`
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  //   padding: 0 20px;
  width: 100%;
  border-top: 1px solid grey;
`;

const Anchor = styled.a`
  color: #1976d2;
  text-decoration: none;
  padding: 0 5px;
`;

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <Typography variant="body">
        © {currentYear} made with love by
        <Anchor
          target="_blank"
          href="https://www.linkedin.com/in/kamil-kalbarczyk/"
        >
          Kamil Kalbarczyk
        </Anchor>
      </Typography>
      <Typography variant="body">
        Source code repository:
        <Anchor
          target="_blank"
          href="https://github.com/Kamil-Kalbarczyk/expense-recorder"
        >
          GitHub
        </Anchor>
      </Typography>
    </FooterContainer>
  );
};
