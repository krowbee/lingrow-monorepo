"use client";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "../../../../../components/ui/card";
import { logoutOnServer } from "@/lib/api/requests/auth.requests";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { COURSES_URL } from "@/urls/courses";

export function LogoutForm() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const onSubmit = async () => {
    const result = await logoutOnServer();
    if (result.ok) {
      logout();
      router.push("/");
      return;
    }
    return;
  };

  return (
    <div className="flex items-center w-full h-full justify-center">
      <Card className="rounded-xl max-w-[390px] h-min border-none bg-neutral-800 justify-center px-6">
        <CardTitle className="text-white font-heading">
          Вийти з облікового запису
        </CardTitle>
        <CardDescription>
          Ви впевнені що хочете вийти з цього облікового запису?
        </CardDescription>

        <div className="flex w-full justify-center gap-4">
          <Button
            className="bg-neutral-700 cursor-pointer"
            onClick={() => onSubmit()}
          >
            Так
          </Button>
          <Link href={COURSES_URL.courses_page}>
            <Button className="cursor-pointer">Ні</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
