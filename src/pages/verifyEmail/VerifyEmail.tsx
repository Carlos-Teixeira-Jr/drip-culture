import { useSearchParams } from "react-router-dom";
import { VerifiedEmailPage } from "./VerifyEmailPage";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const __clerk_status = searchParams.get("__clerk_status");

  if (__clerk_status === "verified") {
    return (
      <VerifiedEmailPage />
    );
  }
  if (__clerk_status === "expired") {
    return <h2>The verification link has expired</h2>;
  }
  if (__clerk_status === "failed") {
    return <h2>There was an error verifying your email</h2>;
  }
  if (__clerk_status) {
    return <h2>There was an error verifying your email</h2>;
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-5">
      <h1 className="text-xl font-primary font-normal text-gray-500 px-5 md:px-0 md:w-1/3">
        An email verification link has been sent to your email. Please check
        your inbox and click on the verification button to access your account.
      </h1>

      <h2 className="font-primary text-primary text-2xl font-semibold">
        Aguardando
      </h2>
      <div className="flex gap-2">
        <div className="animate-bounce rounded-full h-5 w-5 border-2 border-emerald-900 bg-emerald-900"></div>
        <div className="animate-bounce rounded-full h-5 w-5 border-2 border-emerald-900 bg-emerald-900 motion-safe:[animation-delay:200ms]"></div>
        <div className="animate-bounce rounded-full h-5 w-5 border-2 border-emerald-900 bg-emerald-900 motion-safe:[animation-delay:400ms]"></div>
      </div>
    </main>
  );
}