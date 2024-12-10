import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form>
        {/* Example form inputs */}
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default SignUpPage;
