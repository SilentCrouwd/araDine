import { Link } from "react-router";

function SignUp() {
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
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
          <div></div>
        </div>

        <button
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
          type="submit"
        >
          Registrieren
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Bereits registriert?{" "}
          <Link
            to="/araDine/order/login/kunde"
            className="text-primary hover:underline"
          >
            Jetzt anmelden
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
