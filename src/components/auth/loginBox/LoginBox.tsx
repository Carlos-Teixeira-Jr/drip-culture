import { FormEvent, useEffect, useState } from "react";
import googleImage from "../../../assets/socialMediaIcons/google-icon.png";

export type AuthFormData = {
  email: string;
  password: string;
}

interface ILoginBox {
  onAuthFormDataChange: (authFormData: AuthFormData) => void;
  onSubmit: (event: FormEvent) => void;
  isLoading: boolean
}

export function LoginBox({ onAuthFormDataChange, onSubmit, isLoading }: ILoginBox) {
  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: "",
  });

  const [authFormDataErrors, setAuthFormDataErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(isLoading);

  const [hiddenPassword, setHiddenPassword] = useState("");

  const inputs = [
    {
      id: 1,
      name: "Email",
      value: authFormData.email,
    },
    {
      id: 2,
      name: "Password",
      value: authFormData.password,
    },
  ];

  useEffect(() => {
    onAuthFormDataChange(authFormData);
  }, [authFormData]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const actualPassword =
      e.target.value.length > authFormData.password.length
        ? authFormData.password + e.target.value.slice(-1)
        : authFormData.password.slice(0, -1);

    setAuthFormData({ ...authFormData, password: actualPassword });
    setHiddenPassword("*".repeat(actualPassword.length));
  };

  return (
    <form onSubmit={onSubmit} className="py-32 px-[35rem] flex flex-col gap-8">
      <button className="border border-lightBtnBorder bg-white w-full text-vividBlack flex justify-center items-center gap-2">
        <img src={googleImage} alt="google" className="w-5 h-5" />
        Continue with Google
      </button>

      <div className="flex justify-center items-center gap-4">
        <hr className="w-full border border-borderColor" />
        <p className="text-neutral">Or</p>
        <hr className="w-full border border-borderColor" />
      </div>

      <div className="flex flex-col gap-4">
        {inputs.map((input) => (
          <>
            <h5 className="text-slateBlack">{input.name}</h5>
            <input
              key={input.id}
              name={input.name}
              value={input.name === "Password" ? hiddenPassword : input.value}
              onChange={(e) => {
                if (input.name === "Password") {
                  handlePasswordChange(e);
                } else {
                  setAuthFormData({
                    ...authFormData,
                    [input.name]: e.target.value,
                  });
                }
              }}
              onBlur={(e) => {
                setAuthFormDataErrors({
                  ...authFormDataErrors,
                  [input.name]:
                    e.target.value.length < 1
                      ? "Please enter a valid email"
                      : "",
                });
              }}
            />
          </>
        ))}
      </div>
      <p className="text-neutral ml-auto cursor-pointer">Forgot Password?</p>
      <button className="w-full" type="submit">Login</button>
    </form>
  );
}
