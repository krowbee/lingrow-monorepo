"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { COURSES_URL } from "@/urls/courses";
import { useLogout } from "@/hooks/auth/useLogout";

export function LogoutForm() {
  const { isPending, mutateAsync: logout } = useLogout();
  const router = useRouter();
  const onSubmit = async () => {
    try {
      await logout();
      router.push("/");
      return;
    } catch {
      return;
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="h-min max-w-[390px] justify-center rounded-xl border-white/5 px-6">
        <CardTitle className="font-heading text-white">
          Вийти з облікового запису
        </CardTitle>
        <CardDescription>
          Ви впевнені що хочете вийти з цього облікового запису?
        </CardDescription>

        <div className="flex w-full justify-center gap-4">
          <Button
            className="cursor-pointer bg-neutral-700"
            onClick={() => onSubmit()}
            disabled={isPending}
          >
            {isPending ? "Вихід..." : "Так"}
          </Button>
          <Link href={COURSES_URL.courses_page}>
            <Button className="cursor-pointer" disabled={isPending}>
              Ні
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
