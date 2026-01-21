import { LoginForm } from "@/app/(features)/auth/[form]/components/login-form";
import { LogoutForm } from "@/app/(features)/auth/[form]/components/logout-form";
import { SignupForm } from "@/app/(features)/auth/[form]/components/signup-form";
import { notFound } from "next/navigation";

export default async function AuthPage({
  params,
}: {
  params: { form: string };
}) {
  const { form } = await params;
  let content;
  switch (form) {
    case "login":
      content = <LoginForm />;
      break;
    case "signup":
      content = <SignupForm />;
      break;
    case "logout":
      content = <LogoutForm />;
      break;
    default:
      notFound();
  }

  return (
    <div className="flex min-h-svh w-full h-screen justify-center">
      <div className="w-full md:max-w-[390px] md:py-5">{content}</div>
    </div>
  );
}
