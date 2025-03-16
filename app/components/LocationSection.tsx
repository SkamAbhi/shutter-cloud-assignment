"use client";

import { useState } from "react";
import { CirclePlus, MapPin } from "lucide-react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Landmark } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LocationMarker from "./LocationMarker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LocationSectionProps {
  landmarks: Landmark[];
  setLandmarks: React.Dispatch<React.SetStateAction<Landmark[]>>;
  latitude: string;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  longitude: string;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSection = ({
  landmarks,
  setLandmarks,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}: LocationSectionProps) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [tempLatitude, setTempLatitude] = useState(latitude);
  const [tempLongitude, setTempLongitude] = useState(longitude);

  const updateLandmark = (
    index: number,
    field: keyof Landmark,
    value: string
  ) => {
    setLandmarks(
      landmarks.map((landmark, i) =>
        i === index ? { ...landmark, [field]: value } : landmark
      )
    );
  };

  const handleSaveLocation = () => {
    if (!tempLatitude || !tempLongitude) {
      alert("Please select a location on the map");
      return;
    }
    setLatitude(tempLatitude);
    setLongitude(tempLongitude);
    setIsMapModalOpen(false);
  };

  return (
    <div className="mb-8 border-b pb-6 ">
      <div className="border rounded-lg p-6 mb-6">
        <div className="mb-6">
          {landmarks.map((landmark, index) => (
            <div key={index} className=" pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Landmark
                  </label>
                  <Select
                    value={landmark.name}
                    onValueChange={(value: string) =>
                      updateLandmark(index, "name", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select landmark" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Park">Park</SelectItem>
                      <SelectItem value="School">School</SelectItem>
                      <SelectItem value="Hospital">Hospital</SelectItem>
                      <SelectItem value="Shopping Mall">
                        Shopping Mall
                      </SelectItem>
                      <SelectItem value="Metro Station">
                        Metro Station
                      </SelectItem>
                      <SelectItem value="Airport">Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Distance
                  </label>
                  <Input
                    type="text"
                    value={landmark.distance}
                    onChange={(e) =>
                      updateLandmark(index, "distance", e.target.value)
                    }
                    placeholder="Distance in km"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <Textarea
                  value={landmark.description}
                  onChange={(e) =>
                    updateLandmark(index, "description", e.target.value)
                  }
                  placeholder="Enter description"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Latitude</label>
            <Input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
            />
          </div>
          <div className="flex ">
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">
                Longitude
              </label>
              <Input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
              />
            </div>
            <div className="self-end ml-3  ">
              <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center text-gray-600 border mt-6 h-9 w-fit"
                  >
                    <MapPin size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Pick Location</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 mt-4">
                    <MapContainer
                      center={[
                        tempLatitude ? parseFloat(tempLatitude) : 51.505,
                        tempLongitude ? parseFloat(tempLongitude) : -0.09,
                      ]}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationMarker
                        setLatitude={setTempLatitude}
                        setLongitude={setTempLongitude}
                      />
                    </MapContainer>
                  </div>
                  <div className="flex w-full mt-4">
                    <Button
                      className="bg-red-500 w-full"
                      onClick={handleSaveLocation}
                    >
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="flex items-center text-black border"
        onClick={() => {
          alert("button clicked");
        }}
      >
        <CirclePlus size={16} className="mr-1" /> Add connectivity item
      </Button>
    </div>
  );
};

export default LocationSection;
