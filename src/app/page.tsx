"use client";

import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data, error, isPending } = useSession();
  return (
    <div className={"flex items-center flex-col space-y-4 m-12"}>
      {data && data.user && data.user.name ? (
        <>
          <h1 className="mx-auto text-3xl font-bold">
            Hello {data?.user.name} !
          </h1>
          <h2 className="mx-auto text-xl font-bold">Welcome to Byte Query!</h2>
        </>
      ) : (
        <h1 className="mx-auto text-3xl font-bold">Welcome to Byte Query</h1>
      )}
    </div>
  );
}
