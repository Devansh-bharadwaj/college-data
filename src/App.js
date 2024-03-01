import { Suspense, lazy } from "react";
import "./App.scss";
import Loader from "./components/Loader";

const Table = lazy(() => import("./components/Table"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
