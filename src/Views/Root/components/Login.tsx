import { Link } from "react-router";

function Login() {
  return (
    <div className="p-6">
      <form
        className="card  mx-auto mt-5 bg-card/20 flex w-full max-w-md flex-col gap-6 rounded-lg border border-border p-6"
        action="#"
        method="post"
      >
        <div>
          <h1 className="text-2xl font-semibold text-text">Anmelden</h1>
          <p className="mt-1 text-sm text-muted">
            Melde dich an, um fortzufahren.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text" htmlFor="email">
              E-Mail-Adresse
            </label>
            <input
              className="rounded-md border border-input px-3 py-2 text-text outline-none focus:ring-2 focus:ring-ring"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@beispiel.de"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <label
                className="text-sm font-medium text-text"
                htmlFor="password"
              >
                Passwort
              </label>
              <a
                className="text-sm text-primary hover:underline"
                href="#forgot-password"
              >
                Passwort vergessen?
              </a>
            </div>
            <input
              className="rounded-md border border-input px-3 py-2 text-text outline-none focus:ring-2 focus:ring-ring"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
          type="submit"
        >
          Anmelden
        </button>
        <p className="text-center text-sm text-muted">
          Noch kein Konto?{" "}
          <Link
            to="/araDine/order/signup/frank"
            className="text-primary hover:underline"
          >
            Jetzt registrieren
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
