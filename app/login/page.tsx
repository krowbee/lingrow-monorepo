import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full h-screen items-center justify-center md:p-10">
      <div className="w-full h-full md:h-min md:max-w-[390px]">
        <LoginForm />
      </div>
    </div>
  );
}
