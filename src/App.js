import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { Content } from "./content";

function App() {
  return (
    <AuthContextProvider>
      <Content />
    </AuthContextProvider>
  );
}

export default App;
