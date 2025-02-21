import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className={"flex items-center flex-col"}>
      <h1 className="mx-auto text-3xl font-bold">Welcome to Byte Query</h1>
      <div><LoginLink>Login</LoginLink></div>
      <div><RegisterLink>Register</RegisterLink></div>
    </div>


  );
}
