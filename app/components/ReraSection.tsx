"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CirclePlus } from "lucide-react";

interface ReraSectionProps {
  isReraRegistered: boolean;
  setIsReraRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  reraNumbers: string[];
  setReraNumbers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReraSection = ({
  isReraRegistered,
  setIsReraRegistered,
  reraNumbers,
  setReraNumbers,
}: ReraSectionProps) => {
  const addReraNumber = () => {
    setReraNumbers([...reraNumbers, ""]);
  };

  const updateReraNumber = (index: number, value: string) => {
    setReraNumbers(reraNumbers.map((num, i) => (i === index ? value : num)));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between border rounded-sm p-4 mb-4">
        <p className="font-semibold mb-2">Is the project RERA registered?</p>
        <RadioGroup
          value={isReraRegistered ? "yes" : "no"}
          onValueChange={(value: string) =>
            setIsReraRegistered(value === "yes")
          }
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="rera-yes"
              className="text-red-500 "
            />
            <Label htmlFor="rera-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="rera-no" />
            <Label htmlFor="rera-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      {isReraRegistered && (
        <div className="mb-4">
          <p className="font-semibold mb-2">RERA Number(s)</p>
          {reraNumbers.map((number, index) => (
            <div key={index} className="mb-3">
              <Input
                type="text"
                value={number}
                onChange={(e) => updateReraNumber(index, e.target.value)}
                placeholder="Enter RERA number"
                className="mb-2"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex items-center text-black border"
            onClick={addReraNumber}
          >
            <CirclePlus size={16} className="mr-1" /> Add another RERA number
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReraSection;
