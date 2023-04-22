import { HomeContent } from "./homeContent";
import { Footer } from "./footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 72px);
`;

export const Home = () => {
  return (
    <Container>
      <HomeContent />
      <Footer />
    </Container>
  );
};
