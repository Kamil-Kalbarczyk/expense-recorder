import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px;
`;

export const Wrapper = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};
