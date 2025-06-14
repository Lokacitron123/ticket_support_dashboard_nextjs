import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getAuthStatus() {
  const { isAuthenticated, getUser, getRoles } = getKindeServerSession();

  const authed = await isAuthenticated();
  // Check if is authenticated
  if (!authed) return { isAuthed: false };

  // Get users regular information
  const user = await getUser();
  if (!user || !user.id) return { isAuthed: false };

  // Get admin status

  const roles = (await getRoles()) ?? [];
  const admin = roles.some((role) => role.key === "admin");

  // Return values necessary for rending, auth checks, displaying user info
  return {
    isAuthed: true,
    userId: user.id,
    email: user.email ?? null,
    admin: admin,
  };
}
