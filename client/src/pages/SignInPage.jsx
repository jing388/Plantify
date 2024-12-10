import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sign In Page</h1>
      <form>
        {/* Example form inputs */}
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};

export default SignInPage;
