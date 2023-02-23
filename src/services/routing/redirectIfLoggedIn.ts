import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function RedirectIfLoggedIn() {
  const router = useRouter();
  const loginStatus = useSelector((state: any) => state.auth.loginData);

  if (typeof window !== "undefined") {
    if (loginStatus) {
      return router.push("/");
    }
  }
  return false;
}
