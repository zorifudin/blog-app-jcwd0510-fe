import LoginPage from "@/features/login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const login = async () => {
  const session = await auth();

  if (session) return redirect("/");
  return <LoginPage />;
};

export default login;
