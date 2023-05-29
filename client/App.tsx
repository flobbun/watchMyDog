import { useEffect, useState } from "react";
import ProviderHub from "./components/common/ProviderHub/ProviderHub";
import Router from "./components/common/Router/Router";

export const useDocument = () => {
  const [myDocument, setMyDocument] = useState<Document | null>(null)

  useEffect(() => {
    setMyDocument(document)
  }, [])

  return myDocument
}

function App() {
  const doc = useDocument()

  return (
    <ProviderHub>
      {doc && <Router />}
    </ProviderHub>
  )
}

export default App;
