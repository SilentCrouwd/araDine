function BewCard() {
  return (
    <div className="bewCard grid grid-cols-2  h-fit gap-2 border border-border rounded-2xl py-2 px-2 ">
      <p className="font-bold col-span-2">Bewirtung 1</p>
      <p className="text-base col-span-1">Datum: 01.01.2024</p>
      <p className="text-base col-span-1">Personen: 5</p>

      <p className="text-base col-span-1">Start: 12:00</p>
      <p className="text-base col-span-1">Ende: 12:00</p>
      <p className="text-base col-span-2">Nachbewirtung: 12:00</p>
    </div>
  );
}
export default BewCard;
