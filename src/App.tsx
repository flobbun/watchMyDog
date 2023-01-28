import { useEffect, useState } from "react";
import { Footer, Header, Stream, Watch } from "./components";
import Layout from "./components/common/Layout/Layout";
import Login from "./components/pages/Login/Login";
import Menu from "./components/pages/Menu/Menu";
import { Mode } from "./interfaces/types";

function App() {
  const [mode, setMode] = useState<Mode>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <Layout>
      <Header />
      {token !== null ? (
        mode === "watch" ? (
          <Watch />
        ) : mode === "stream" ? (
          <Stream />
        ) : (
          <Menu onSelect={(m) => setMode(m)} />
        )
      ) : (
        <Login
          onLogin={(token) => {
            setToken(token);
          }}
        />
      )}
      <Footer />
    </Layout>
  );
}

export default App;
