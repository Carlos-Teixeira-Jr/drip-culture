import { useNavigate } from "react-router-dom";
import { AuthFormData, LoginBox } from "../components/auth/loginBox/LoginBox";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail } from "../utils/validators/emailValidator/emailValidator";
import { Toast } from "../components/toasts/toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [authFormDataErrors, setAuthFormDataErrors] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (isSignedIn) {
      navigate("/products");
    }
  }, [isSignedIn, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setAuthFormDataErrors({ email: "", password: "" });
    setLoading(true);

    if (!validateEmail(authFormData.email).isValid) {
      setAuthFormDataErrors({
        ...authFormDataErrors,
        email: validateEmail(authFormData.email).errorMsg,
      });
    }
    if (!authFormData.password) {
      setAuthFormDataErrors({
        ...authFormDataErrors,
        password: "Password is required",
      });
    }

    let input = "";
    let message = "";

    if (Object.values(authFormDataErrors).every((error) => error === "")) {
      try {
        const signInResource = await signIn?.create({
          identifier: authFormData.email,
          password: authFormData.password,
        });

        await setActive?.({ session: signInResource?.createdSessionId });

        setLoading(false);
      } catch (error: any) {
        input = error.errors[0].meta.paramName;
        message = error.errors[0].longMessage;

        if (input === "identifier") {
          setAuthFormDataErrors({ ...authFormDataErrors, email: message });
        } else if (input === "password") {
          setAuthFormDataErrors({ ...authFormDataErrors, password: message });
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
    <>
      <BreadCrumb />
      <LoginBox
        onAuthFormDataChange={(authFormData: AuthFormData) =>
          setAuthFormData(authFormData)
        }
        onSubmit={handleSubmit}
        isLoading={loading}
      />

      {showToast.show && (
        <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
      )}
    </>
  );
}
