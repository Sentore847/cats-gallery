import { Navbar } from "../widgets/Navbar";
import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
