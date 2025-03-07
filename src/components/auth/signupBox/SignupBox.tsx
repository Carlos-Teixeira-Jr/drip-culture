import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import googleImage from "../../../assets/socialMediaIcons/google-icon.png";

export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

interface ISignUpBox {
  onSignUpFormDataChange: (signUpFormData: SignUpFormData) => void;
  onSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

export function SignUpBox({
  onSignUpFormDataChange,
  onSubmit,
  isLoading,
}: ISignUpBox) {
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  console.log("🚀 ~ signUpFormData:", signUpFormData)

  const [signUpFormDataErrors, setSignUpFormDataErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState("");
  const [hiddenPasswordConfirmation, setHiddenPasswordConfirmation] =
    useState("");

  const inputs = [
    {
      id: 0,
      name: "Name",
      key: "name",
      value: signUpFormData.name,
    },
    {
      id: 1,
      name: "Email",
      key: "email",
      value: signUpFormData.email,
    },
    {
      id: 2,
      name: "Password",
      key: "password",
      value: signUpFormData.password,
    },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const actualPassword =
      e.target.value.length > signUpFormData.password.length
        ? signUpFormData.password + e.target.value.slice(-1)
        : signUpFormData.password.slice(0, -1);

    setSignUpFormData({ ...signUpFormData, password: actualPassword });
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
                  setSignUpFormData({
                    ...signUpFormData,
                    [input.key]: e.target.value,
                  });
                }
              }}
            />
          </>
        ))}
      </div>
      <p className="text-neutral ml-auto cursor-pointer">
        By creating an account you agree with our Terms of Service, Privacy
        Policy.
      </p>
      <button className="w-full" type="submit">
        Create account
      </button>
      <Link to={"/login"} className="flex justify-center items-center">
        <h6 className="text-vividBlack mx-auto">
          Already have an account? Log in
        </h6>
      </Link>
    </form>
  );
}
