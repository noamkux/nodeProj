import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  let navigate = useNavigate();

  return (
      <div className="text-center mt-5 header"
      style={{paddingBottom : "200px"}}>
        <h1>Page not Found...</h1>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
  );
};

export default PageNotFound;
