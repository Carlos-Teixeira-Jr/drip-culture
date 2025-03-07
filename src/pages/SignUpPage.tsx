import { FormEvent, useState } from "react";
import {
  SignUpBox,
  SignUpFormData,
} from "../components/auth/signupBox/SignupBox";
import { validateEmail } from "../utils/validators/emailValidator/emailValidator";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { validateName } from "../utils/validators/nameValidator/nameValidator";

export function SignUpPage() {
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

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

    setSignUpFormDataErrors({
      email: "",
      password: "",
      name: "",
    });

    setLoading(true);

    if (!validateName(signUpFormData.name).isValid) {
      setSignUpFormDataErrors({
        ...signUpFormDataErrors,
        name: validateName(signUpFormData.name).errorMsg,
      });
    }
    if (!validateEmail(signUpFormData.email).isValid) {
      setSignUpFormDataErrors({
        ...signUpFormDataErrors,
        email: validateEmail(signUpFormData.email).errorMsg,
      });
    }
    if (!signUpFormData.password) {
      setSignUpFormDataErrors({
        ...signUpFormDataErrors,
        password: "Password is required",
      });
    }

    let input = "";
    let message = "";

    if (Object.values(signUpFormDataErrors).every((error) => error === "")) {
      try {
        const signInResource = await signIn?.create({
          identifier: signUpFormData.email,
          password: signUpFormData.password,
        });

        await setActive?.({ session: signInResource?.createdSessionId });

        setLoading(false);
      } catch (error: any) {
        input = error.errors[0].meta.paramName;
        message = error.errors[0].longMessage;

        if (input === "identifier") {
          setSignUpFormDataErrors({ ...signUpFormDataErrors, email: message });
        } else if (input === "password") {
          setSignUpFormDataErrors({ ...signUpFormDataErrors, password: message });
        }

        setLoading(false);

        setShowToast({
          show: true,
          message: message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setShowToast({
        show: true,
        message: "There's an empty field",
        type: "error",
      });
    }
  };

  return (
    <SignUpBox
      onSignUpFormDataChange={(signUpFormData: SignUpFormData) =>
        setSignUpFormData(signUpFormData)
      }
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  );
}
