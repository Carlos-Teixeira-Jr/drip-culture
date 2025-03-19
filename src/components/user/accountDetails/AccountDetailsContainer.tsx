import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

export function AccountDetailsContainer() {
  const { user } = useUser();

  const inputs = [
    {
      id: 1,
      title: "Full Name",
      value: user?.fullName as string,
      key: "name",
    },
    {
      id: 2,
      title: "Email",
      value: user?.emailAddresses[0].emailAddress,
      key: "email",
    },
  ];

  return (
    <main className="md:pl-12 px-5 flex flex-col gap-8 md:max-w-80 w-full">
      <h3 className="text-neutral">Account Details</h3>
      <div className="bg-offWhite rounded-full p-3.5 shrink-0 md:w-12 md:h-12 w-20 h-20 flex justify-center items-center">
        <h5 className="text-blue-400 text-4xl">{`${
          (user?.firstName as string)[0].toUpperCase() +
          (user?.lastName as string)[0].toUpperCase()
        }`}</h5>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {inputs.map((input) => (
          <div key={input.id} className="flex flex-col  gap-2 text-slateBlack">
            <h5 className="text-neutral">{input.title}</h5>
            <input
              value={input.value}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
