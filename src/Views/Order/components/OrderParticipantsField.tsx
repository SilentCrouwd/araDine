import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, DeleteIcon, PencilIcon } from "lucide-react";
import { useState } from "react";

function OrderParticipantsField() {
  const [participantName, setParticipantName] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  function handleParticipantChange() {
    if (!value) return;
    setParticipantName([...participantName, value]);
    setValue("");
  }
  function handleParticipantDelete(participantToDelete: string) {
    setParticipantName(
      participantName.filter(
        (participant) => participant !== participantToDelete,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-2 py-0.5 px-2">
      <label htmlFor="teilnehmerName" className="w-1/2">
        Teilnehmer:
      </label>
      <div>
        {participantName.map((participant) => {
          return (
            <p className="flex items-center gap-2" key={participant}>
              {participant}
              <PencilIcon
                className="h-4 w-4 ml-5 text-black cursor-pointer"
                onClick={() => {
                  setValue(participant);
                  handleParticipantDelete(participant);
                }}
              />
              <DeleteIcon
                className="h-4 w-4 text-red-600 cursor-pointer"
                onClick={() => handleParticipantDelete(participant)}
              />
            </p>
          );
        })}
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
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
