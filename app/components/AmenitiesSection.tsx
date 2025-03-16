"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, CirclePlus, CircleMinus } from "lucide-react";
import { Amenity } from "./types";

interface AmenitiesSectionProps {
  amenities: Amenity[];
  setAmenities: React.Dispatch<React.SetStateAction<Amenity[]>>;
  areAllAmenitiesSelected: boolean;
  setAreAllAmenitiesSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const AmenitiesSection = ({
  amenities,
  setAmenities,
  areAllAmenitiesSelected,
  setAreAllAmenitiesSelected,
}: AmenitiesSectionProps) => {
  const columnSize = Math.ceil(amenities.length / 3);
  const amenitiesColumn1 = amenities.slice(0, columnSize);
  const amenitiesColumn2 = amenities.slice(columnSize, columnSize * 2);
  const amenitiesColumn3 = amenities.slice(columnSize * 2);

  const toggleAmenity = (id: string) => {
    setAmenities(
      amenities.map((amenity) =>
        amenity.id === id
          ? { ...amenity, selected: !amenity.selected }
          : amenity
      )
    );
  };

  const handleToggleAllAmenities = () => {
    setAmenities(
      amenities.map((amenity) => ({
        ...amenity,
        selected: !areAllAmenitiesSelected,
      }))
    );
    setAreAllAmenitiesSelected(!areAllAmenitiesSelected);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b pb-6 ">
        <h2 className="text-xl font-semibold">Amenities</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={handleToggleAllAmenities}
        >
          {areAllAmenitiesSelected ? (
            <>
              <CircleMinus className="inline-block mr-1" /> Unselect All
            </>
          ) : (
            <>
              <CirclePlus className="inline-block mr-1" /> Select All
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          {amenitiesColumn1.map((amenity) => (
            <div key={amenity.id} className="mb-3 flex items-center">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer",
                  amenity.selected
                    ? "bg-red-500 border-red-500"
                    : "border-gray-300"
                )}
                onClick={() => toggleAmenity(amenity.id)}
              >
                {amenity.selected && <Check size={14} className="text-white" />}
              </div>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
        <div>
          {amenitiesColumn2.map((amenity) => (
            <div key={amenity.id} className="mb-3 flex items-center">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer",
                  amenity.selected
                    ? "bg-red-500 border-red-500"
                    : "border-gray-300"
                )}
                onClick={() => toggleAmenity(amenity.id)}
              >
                {amenity.selected && <Check size={14} className="text-white" />}
              </div>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
        <div>
          {amenitiesColumn3.map((amenity) => (
            <div key={amenity.id} className="mb-3 flex items-center">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-2 cursor-pointer",
                  amenity.selected
                    ? "bg-red-500 border-red-500"
                    : "border-gray-300"
                )}
                onClick={() => toggleAmenity(amenity.id)}
              >
                {amenity.selected && <Check size={14} className="text-white" />}
              </div>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSection;
