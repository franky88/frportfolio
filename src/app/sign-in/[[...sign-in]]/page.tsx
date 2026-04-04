import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mb-8 text-center">
        <span
          className="font-display font-bold text-4xl tracking-tight"
          style={{ color: "#E8A020" }}
        >
          FR
        </span>
        <p
          className="text-sm font-body mt-2"
          style={{ color: "#F5F0E8", opacity: 0.5 }}
        >
          Admin access only
        </p>
      </div>
      <SignIn />
    </div>
  );
}
