import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

export function AccountDetailsContainer() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const inputs = [
    {
      id: 1,
      title: "Full Name",
      value: formData.name,
      key: "name",
    },
    {
      id: 2,
      title: "Email",
      value: formData.email,
      key: "email",
    },
  ];

  return (
    <main className="pl-12 flex flex-col gap-8 max-w-80 w-full">
      <h3 className="text-neutral">Account Details</h3>
      <div className="bg-offWhite rounded-full p-3.5 shrink-0 w-12 h-12">
        <h5 className="text-blue-400">{`${
          (user?.firstName as string)[0].toUpperCase() +
          (user?.lastName as string)[0].toUpperCase()
        }`}</h5>
      </div>

      <div className="flex flex-col gap-4">
        {inputs.map((input) => (
          <div key={input.id} className="flex flex-col  gap-2 text-slateBlack">
            <h5 className="text-neutral">{input.title}</h5>
            <input
              value={input.value}
              onChange={(e) =>
                setFormData({ ...formData, [input.key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
    </main>
  );
}
