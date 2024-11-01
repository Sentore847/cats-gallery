import { useNavigate } from "react-router";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="font-bold text-xl">Not Found Page</h1>
      <button className="font-medium" onClick={() => navigate(-1)}>
        Go back &rarr;
      </button>
    </div>
  );
};

export default NotFoundPage;
