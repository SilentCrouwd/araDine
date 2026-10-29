import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function Root() {
  return (
    <div className=" bg-background text-foreground lg:max-w-250 lg:mx-auto">
      <h1
        className="text-4xl font-bold text-center my-12 underline decoration-foreground decoration-3
    "
      >
        AraDine
      </h1>
      <aside
        aria-labelledby="test-data-disclaimer-title"
        className="mx-6 mb-8 rounded-md border border-amber-500 bg-amber-500/10 px-4 py-3 text-center"
      >
        <h2 id="test-data-disclaimer-title" className="font-semibold">
          Hinweis zum Übungsprojekt
        </h2>
        <p>
          Bitte gib keine echten personenbezogenen Daten ein. Verwende auch bei
          E-Mail-Adressen ausschließlich erfundene Testdaten.
        </p>
      </aside>
      <div className=" flex flex-col items-center gap-4 px-10">
        <Link
          to="/araDine/order"
          className="inline-block w-70 text-center text-xl bg-accent-foreground text-accent px-4 py-2 rounded-md transition-transform hover:scale-98 hover:bg-accent-foreground/70"
        >
          <p className="flex items-center justify-center gap-2">
            Bestellung Aufgeben <ArrowRight className="w-9 h-9 " />
          </p>
        </Link>
        <Link
          to="/araDine/dashboard"
          className="inline-block w-70 text-center text-xl bg-accent-foreground text-accent px-4 py-2 rounded-md transition-transform hover:scale-98 hover:bg-accent-foreground/70"
        >
          <p className="flex items-center justify-center gap-2">
            Mitarbeiter Login <ArrowRight className="w-9 h-9 " />
          </p>
        </Link>
        <Link
          to="/araDine/billingDashboard"
          className="inline-block w-70 text-center text-xl bg-accent-foreground text-accent px-4 py-2 rounded-md transition-transform hover:scale-98 hover:bg-accent-foreground/70"
        >
          <p className="flex items-center justify-center gap-2">
            Betriebsleiter Login <ArrowRight className="w-9 h-9 " />
          </p>
        </Link>
      </div>
    </div>
  );
}
export default Root;
