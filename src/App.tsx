import { useEffect, useState } from "react";
import { Footer, Header, Stream, Watch } from "./components";
import Layout from "./components/common/Layout/Layout";
import Login from "./components/Login/Login";

type Mode = "watch" | "stream" | null;

const Menu = ({ onSelect }: { onSelect: (mode: Mode) => void }) => {
  return (
    <div className="flex justify-center items-center gap-x-4">
      <button
        className="bg-slate-400 rounded p-2 cursor-pointer"
        onClick={() => onSelect("watch")}
      >
        Watch
      </button>
      <button
        className="bg-slate-400 rounded p-2 cursor-pointer"
        onClick={() => onSelect("stream")}
      >
        Stream
      </button>
    </div>
  );
};

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
