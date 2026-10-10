import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, DeleteIcon, PencilIcon } from "lucide-react";
import React, { useState } from "react";

type OrderParticipantsProps = Readonly<{
  // Die Liste wird von der übergeordneten Komponente gehalten und hier angezeigt.
  participants: { name: string; abteilung: string }[];
  // Änderungen werden an die Komponente zurückgemeldet, die den Listenstatus besitzt.
  onParticipantsChange: (
    participants: {
      name: string;
      abteilung: string;
    }[],
  ) => void;
}>;

function OrderParticipantsField({
  participants,
  onParticipantsChange,
}: OrderParticipantsProps) {
  // Temporärer Eingabewert, der erst mit der Bestätigung in die Teilnehmerliste übernommen wird.
  const [valueName, setValueName] = useState<{
    name: string;
    abteilung: string;
  }>();

  function handleParticipantChange() {
    if (!valueName?.name.trim() || !valueName?.abteilung.trim()) return;
    // Fügt den aktuellen Entwurf zur Liste hinzu und leert danach das Eingabefeld.
    onParticipantsChange([
      ...participants,
      { name: valueName.name, abteilung: valueName.abteilung },
    ]);

    setValueName(undefined);
  }
  function handleParticipantDelete(indexToDelete: number) {
    onParticipantsChange(
      participants.filter((_, index) => index !== indexToDelete),
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 py-0.5 px-2">
      <label htmlFor="teilnehmerName" className="w-1/2">
        Teilnehmer:
      </label>
      <label htmlFor="abteilung" className="w-1/2">
        Abteilung:
      </label>

      <div className="col-span-2">
        {participants.map((participant, index) => {
          return (
            <div className="grid grid-cols-2 items-center gap-2" key={index}>
              <p>{participant.name}</p>
              <div className="flex">
                <p>{participant.abteilung}</p>
                <div className="flex justify-end w-full gap-2">
                  <PencilIcon
                    className="h-4 w-4 ml-5 text-green-600 cursor-pointer"
                    onClick={() => {
                      // Lädt den Namen zum Bearbeiten zurück ins Eingabefeld und nimmt ihn aus der Liste.
                      setValueName(participant);
                      handleParticipantDelete(index);
                    }}
                  />
                  <DeleteIcon
                    className="h-4 w-4 text-red-600 cursor-pointer"
                    onClick={() => handleParticipantDelete(index)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Input
        className="full"
        type="text"
        id="teilnehmerName"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValueName((current) => ({
            name: e.target.value,
            abteilung: current?.abteilung ?? "",
          }))
        }
        value={valueName?.name ?? ""}
      />
      <div className="flex items-center">
        <Input
          type="text"
          className="w-full"
          id="abteilung"
          onChange={(e) =>
            setValueName((current) => ({
              name: current?.name ?? "",
              abteilung: e.target.value,
            }))
          }
          value={valueName?.abteilung ?? ""}
        />
        <Button
          onClick={() => {
            handleParticipantChange();
          }}
          variant="outline"
          className="ml-2"
        >
          <CheckIcon />
        </Button>
      </div>
    </div>
  );
}

export default OrderParticipantsField;
