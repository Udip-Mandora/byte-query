import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <div className={"flex items-center flex-col space-y-4 m-12"}>
      <h1 className="mx-auto text-3xl font-bold">Welcome to Byte Query</h1>
      {isUserAuthenticated ? <><p className="m-2">Hello <strong>
        {user.given_name}</strong>, welcome to Byte Query !</p></> : <>
        <div><LoginLink>Login</LoginLink></div>
        <div><RegisterLink>Register</RegisterLink></div>
      </>}
    </div>


  );
}
