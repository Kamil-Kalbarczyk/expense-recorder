import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { Wrapper } from "./common/wrapper";
import { Navigation } from "./navigation";
import { Content } from "./content";

function App() {
  return (
    <AuthContextProvider>
      <Wrapper>
        <Navigation />
        <Content />
      </Wrapper>
    </AuthContextProvider>
  );
}

export default App;
