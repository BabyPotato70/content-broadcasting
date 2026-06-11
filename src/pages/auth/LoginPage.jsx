import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validators";
import { useAuth } from "../../hooks/useAuth";
import { Button, Input } from "../../components/ui";

export const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  const demoCredentials = [
    { role: "Teacher", email: "teacher@school.com", password: "password123" },
    { role: "Principal", email: "principal@school.com", password: "password123" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-600">CBS Platform</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Demo Credentials
          </p>
          <div className="space-y-3">
            {demoCredentials.map(({ role, email, password }) => (
              <div key={role} className="text-sm">
                <span className="inline-block w-20 font-semibold text-gray-700">
                  {role}:
                </span>
                <span className="text-gray-600">{email}</span>
                <span className="mx-2 text-gray-400">·</span>
                <span className="font-mono text-gray-600">{password}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            id="email"
            type="email"
            error={errors.email?.message}
            registration={register("email")}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            error={errors.password?.message}
            registration={register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};
