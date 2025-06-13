import { registerUserIfNeeded } from "@/actions/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const { getUser, getRoles } = getKindeServerSession();
  const roles = await getRoles();
  const admin = roles?.some((role) => role.key == "admin");

  if (admin) {
    redirect("/dashboard");
  }

  const user = await getUser();

  if (!user || !user.id) {
    return <p>Authentication failed.</p>;
  }

  await registerUserIfNeeded(user);

  redirect("/");
}
