import { LoginForm } from "@/app/(protected)/(features)/auth/[form]/components/login-form";
import { LogoutForm } from "@/app/(protected)/(features)/auth/[form]/components/logout-form";
import { SignupForm } from "@/app/(protected)/(features)/auth/[form]/components/signup-form";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Lingrow",
};

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
    <div className="relative flex h-screen min-h-svh w-full justify-center">
      <div className="w-full items-center md:m-auto md:max-w-[390px]">
        {content}
      </div>
      <div className="absolute top-10 left-10 rounded-full bg-purple-500/5 blur-3xl md:h-75 md:w-75 lg:h-80 lg:w-80"></div>
      <div className="absolute right-10 bottom-10 rounded-full bg-purple-500/5 blur-3xl md:h-75 md:w-75 lg:h-80 lg:w-80"></div>
    </div>
  );
}
