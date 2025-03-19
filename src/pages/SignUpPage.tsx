import { FormEvent, useState } from "react";
import {
  SignUpBox,
  SignUpFormData,
} from "../components/auth/signupBox/SignupBox";
import { validateEmail } from "../utils/validators/emailValidator/emailValidator";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { validateName } from "../utils/validators/nameValidator/nameValidator";
import { Toast } from "../components/toasts/toast";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, isLoaded, setActive } = useSignUp();

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    name: "",
  });

  const [signUpFormDataErrors, setSignUpFormDataErrors] =
    useState<SignUpFormData>({
      email: "",
      password: "",
      name: "",
    });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let newSignUpFormDataErrors = {
      name: "",
      email: "",
      password: "",
    };

    setLoading(true);

    if (!validateName(signUpFormData.name).isValid) {
      newSignUpFormDataErrors.name = validateName(signUpFormData.name).errorMsg;
    }
    if (!validateEmail(signUpFormData.email).isValid) {
      newSignUpFormDataErrors.email = validateEmail(
        signUpFormData.email
      ).errorMsg;
    }
    if (!signUpFormData.password) {
      newSignUpFormDataErrors.password = "Password is required";
    }

    setSignUpFormDataErrors(newSignUpFormDataErrors);

    if (Object.values(signUpFormDataErrors).every((error) => error === "")) {
      const { name, email, password } = signUpFormData;
      if (isLoaded) {
        try {
          setLoading(true);

          await signUp?.create({
            firstName: name.split(" ")[0] || "",
            lastName: name.split(" ")[1] || "",
            emailAddress: email,
            password,
          });

          setActive({ session: signUp?.createdSessionId });

          await signUp.prepareVerification({
            redirectUrl: "http://localhost:5173/verify",
            strategy: "email_link",
          });

          setShowToast({
            show: true,
            message: "Check your email to verify your account",
            type: "success",
          });

          setTimeout(() => {
            navigate("/verify");
          }, 3000);
        } catch (error: any) {
          setShowToast({
            show: true,
            message: "Error on signup!",
            type: "error",
          });
          setLoading(false);
        }
      }
    } else {
      setShowToast({
        show: true,
        message: "Error on signup!",
        type: "error",
      });
    }
  };

  return (
    <>
      <BreadCrumb />
      <SignUpBox
        onSignUpFormDataChange={(signUpFormData: SignUpFormData) =>
          setSignUpFormData(signUpFormData)
        }
        onSubmit={handleSubmit}
        isLoading={loading}
      />

      <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
    </>
  );
}
