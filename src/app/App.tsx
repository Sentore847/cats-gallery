import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <>
      <div className="py-10">
        <h1 className="font-bold text-3xl text-center">Cats Gallery</h1>
      </div>
      <AppRouter />
    </>
  );
};

export default App;
