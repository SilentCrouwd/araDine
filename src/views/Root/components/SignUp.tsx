import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "@/components/ui/toast";

async function signUpNewUser(userMail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signUp({
    email: userMail,
    password: userPassword,
    options: {
      emailRedirectTo: "http://localhost:5173/araDine/order",
    },
  });
  if (error) {
    console.error(error);
  }
  console.log("Willkomen" + userMail);

  return data;
}

async function validatePassword(
  password: string,
  confirmPassword: string,
  userMail: string,
  navigate: (path: string) => void,
) {
  if (password !== confirmPassword) {
    toast.add({
      type: "error",
      description: "Passwort stimmt nicht überein",
    });
    return;
  }
  if (password.length < 8) {
    toast.add({
      type: "error",
      description: "Passwort muss mindestens 8 Zeichen lang sein",
    });
    return;
  }
  await signUpNewUser(userMail, password);
  toast.add({
    type: "success",
    description: "Konto erfolgreich erstellt",
  });
  navigate("/araDine/");
}
function SignUp() {
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");

  return (
    <div className="p-6">
      <form
        className="mx-auto mt-5 flex w-full max-w-md flex-col gap-6 rounded-lg border border-border bg-card/20 p-6"
        action="#"
        method="post"
      >
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Konto erstellen
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Erstelle dein Konto, um fortzufahren.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="signup-email"
            >
              E-Mail-Adresse
            </label>
            <input
              className="rounded-md border border-input px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              id="signup-email"
              name="email"
              type="email"
              value={userMail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserMail(e.currentTarget.value)
              }
              autoComplete="email"
              placeholder="name@beispiel.de"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="signup-password"
            >
              Passwort
            </label>
            <input
              className="rounded-md border border-input px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              id="signup-password"
              name="password"
              type="password"
              value={userPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPassword(e.currentTarget.value)
              }
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="signup-password-confirmation"
            >
              Passwort bestätigen
            </label>
            <input
              className="rounded-md border border-input px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              id="signup-password-confirmation"
              name="password_confirmation"
              type="password"
              value={userPasswordConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPasswordConfirm(e.currentTarget.value)
              }
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
          <div></div>
        </div>

        <button
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
          type="button"
          onClick={async () =>
            validatePassword(
              userPassword,
              userPasswordConfirm,
              userMail,
              navigate,
            )
          }
        >
          Registrieren
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Bereits registriert?{" "}
          <Link
            to="/araDine/order/login/"
            className="inline-block text-primary transition-transform hover:scale-98 hover:underline"
          >
            Jetzt anmelden
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
