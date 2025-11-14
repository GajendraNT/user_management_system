import Button from "../components/Button";
import { useLogin } from "../hooks/useLogin";

import IMAGE from "../assets/Login.jpg";
import Container from "../components/Container";
import InputField from "../components/Input";

export default function LoginPage() {
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();

  return (
    <Container>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Login
        </h1>

        <div className="flex gap-5">
          <img
            className="w-auto max-w-md hidden lg:block rounded-lg"
            src={IMAGE}
            alt=""
          />
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 flex flex-col justify-center items-center"
          >
            <InputField
              label="Email"
              type="email"
              value={email}
              placeholder="eg. gajendra@mail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              placeholder="************"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
