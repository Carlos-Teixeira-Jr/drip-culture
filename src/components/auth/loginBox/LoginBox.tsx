import { FormEvent, useEffect, useState } from "react";
import googleImage from "../../../assets/socialMediaIcons/google-icon.png";
import { Link } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

export type AuthFormData = {
  email: string;
  password: string;
};

interface ILoginBox {
  onAuthFormDataChange: (authFormData: AuthFormData) => void;
  onSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

export function LoginBox({
  onAuthFormDataChange,
  onSubmit,
}: ILoginBox) {
  const { signIn, isLoaded } = useSignIn();

  
  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState("");

  const inputs = [
    {
      id: 1,
      name: "Email",
      key: "email",
      value: authFormData.email,
    },
    {
      id: 2,
      name: "Password",
      key: "password",
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

  const handleGoogleLogin = async () => {
    try {
      if (isLoaded) {
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: 'google-callback',
          redirectUrlComplete:'/'
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="md:py-32 py-12 px-5 md:px-[35rem] flex flex-col gap-8">
      <button type="button" className="border border-lightBtnBorder bg-white w-full text-vividBlack flex justify-center items-center gap-2" onClick={handleGoogleLogin}>
        <img src={googleImage} alt="google" className="w-5 h-5"/>
        Continue with Google
      </button>

      <div className="flex justify-center items-center gap-4">
        <hr className="w-full border border-borderColor" />
        <p className="">Or</p>
        <hr className="w-full border border-borderColor" />
      </div>

      <div className="flex flex-col gap-4">
        {inputs.map((input) => (
          <>
            <h5 className="">{input.name}</h5>
            <input
              key={input.key}
              name={input.name}
              value={input.key === "password" ? hiddenPassword : input.value}
              className=""
              onChange={(e) => {
                if (input.key === "password") {
                  handlePasswordChange(e);
                } else {
                  setAuthFormData({
                    ...authFormData,
                    [input.key]: e.target.value,
                  });
                }
              }}
            />
          </>
        ))}
      </div>
      <p className=" ml-auto cursor-pointer">Forgot Password?</p>
      <button className="w-full" type="submit">
        Login
      </button>
      <Link to={"/signup"} className="flex justify-center items-center">
        <h6 className="">
          Don't have an account? Sign up
        </h6>
      </Link>
    </form>
  );
}
