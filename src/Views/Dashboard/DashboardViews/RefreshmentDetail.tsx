import { useParams } from "react-router";

function RefreshmentDetail() {
  const { roomId } = useParams<{
    roomId: string;
    refreshmentId: string;
  }>();

  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-350 lg:mx-auto py-4 px-6">
      <h1 className="text-2xl font-semibold text-center py-5">
        Refreshment Detail View
      </h1>
      <div>
        <header className="grid grid-cols-2 text-base gap-2 border border-border rounded-4xl px-2 py-4">
          <p className="col-span-2 font-semibold text-lg underline underline-offset-4">
            Name: <span>John Doe</span>
          </p>
          <p className="col-span-1">
            Abteilung: <span>Marketing</span>
          </p>
          <p className="col-span-1">
            Raum: <span>{roomId}</span>
          </p>
          <p className="col-span-2">
            E-Mail: <span>john.doe@example.com</span>
          </p>
          <p className="col-span-2">
            Telefon: <span>+49 123 456 789</span>
          </p>

          <p className="col-span-2">
            Buchungskreis: <span>354898465</span>
          </p>
          <p className="col-span-2">
            Datum: <span>2024-06-15</span>
          </p>
          <p className="col-span-1">
            Startzeit: <span>10:00</span>
          </p>
          <p className="col-span-1">
            Endzeit: <span>12:00</span>
          </p>
          <p className="col-span-2">
            Nachbewirtung: <span>12:30</span>
          </p>
        </header>
        <main></main>
        <footer></footer>
      </div>
    </div>
  );
}

export default RefreshmentDetail;
