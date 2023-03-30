import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { Wrapper } from "./common/wrapper";
import { Content } from "./content";

function App() {
  return (
    <AuthContextProvider>
      <Wrapper>
        <Content />
      </Wrapper>
    </AuthContextProvider>
  );
}

export default App;
