import styled from "styled-components";
import woman from "./img/woman.jpg";
import money from "./img/money.jpg";
import { Wrapper } from "../../../common/wrapper";
import { Typography } from "@mui/material";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  margin: 0;
  margin-left: 25px;
  padding: 0;
  list-style-type: counter;
`;

const ContainerElement = styled.div``;

// const MainWrapper = styled(Wrapper)`
//   margin-left: 20px;
// `;

const Picture = styled.img`
  max-width: 300px;
`;

export const Home = () => {
  return (
    <Wrapper>
      <Typography align="center" variant="h5">
        Welcome in <b>Expense Recorder</b> App.
      </Typography>
      <Typography align="center" variant="h6">
        The place where you can see where your money is going.
      </Typography>
      <Container>
        <ContainerElement>
          <Picture src={money} />
        </ContainerElement>
        <ContainerElement>
          <Typography variant="body1">
            If this is your first steps in this application, follow the steps
            below:
          </Typography>
          <List>
            <li>Click on 'Create new recorder' in menu</li>
            <li>
              Consider what are the most common categories of your expenses
              (e.g. food, car).
            </li>
            <li>Create categories (each category name must be unique).</li>
            <li>
              Provide name of recorder (e.g. January 2023) and click 'Create'.
            </li>
            <li>Now you can start to enter your expenses.</li>
          </List>
        </ContainerElement>
      </Container>
      <Container>
        <ContainerElement>
          <Typography variant="body1">Here are our tips:</Typography>
          <List>
            <li>Try to make no more then 8 categries.</li>
            <li>
              Create recorders names according to the period they refer to.
            </li>
            <li>
              Try to keep recorders for 2 weeks to 2 months and next create a
              new one.
            </li>
          </List>
        </ContainerElement>
        <ContainerElement>
          <Picture src={woman} />
        </ContainerElement>
      </Container>
    </Wrapper>
  );
};
