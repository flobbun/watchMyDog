import { useEffect, useState } from "react";
import ProviderHub from "./components/common/ProviderHub/ProviderHub";
import Router from "./components/common/Router/Router";
import Error404 from "./components/pages/Error404/Error404";

function App() {
  if (typeof document === 'undefined') {
    return <Error404/>;
  }

  return (
    <ProviderHub>
      <Router/>
    </ProviderHub>
  )
}

export default App;
