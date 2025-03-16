"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import AmenitiesSection from "./AmenitiesSection";
import ImageUploadSection from "./ImageUploadSection";
import ReraSection from "./ReraSection";
import LocationSection from "./LocationSection";
import FormFooter from "./FormFooter";
import { ProjectFormProps, Amenity, ProjectImage, Landmark } from "./types";
import { cn } from "@/lib/utils";
import YouTubeSection from "./YoutubeSection";

const ProjectForm = ({ projectId, initialData }: ProjectFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(75);
  const [areAllAmenitiesSelected, setAreAllAmenitiesSelected] = useState(true);
  const [amenities, setAmenities] = useState<Amenity[]>(
    initialData?.amenities || [
      { id: "1", name: "School in vicinity", selected: true },
      { id: "2", name: "Near City Center", selected: true },
      { id: "3", name: "Breakthrough Price", selected: true },
      { id: "4", name: "High Rental Yield", selected: true },
      { id: "5", name: "Well Ventilated", selected: true },
      { id: "6", name: "Spacious", selected: true },
      { id: "7", name: "Gated Society", selected: true },
      { id: "8", name: "Luxury Lifestyle", selected: true },
      { id: "9", name: "Newly Built", selected: true },
      { id: "10", name: "Females Only", selected: true },
      { id: "11", name: "Adjoining Metro Station", selected: true },
      { id: "12", name: "Safe & Secure Locality", selected: true },
      { id: "13", name: "Quick Deal", selected: true },
      { id: "14", name: "Affordable", selected: true },
      { id: "15", name: "Fully Renovated", selected: true },
      { id: "16", name: "Ample Parking", selected: true },
      { id: "17", name: "Tasteful Interior", selected: true },
      { id: "18", name: "Well Maintained", selected: true },
      { id: "19", name: "Family", selected: true },
      { id: "20", name: "Peaceful vicinity", selected: true },
      { id: "21", name: "Desperate Sale", selected: true },
      { id: "22", name: "Investment Opportunity", selected: true },
      { id: "23", name: "Reputed Builder", selected: true },
      { id: "24", name: "Vastu Compliant", selected: true },
      { id: "25", name: "Free Hold", selected: true },
      { id: "26", name: "Prime Location", selected: true },
      { id: "27", name: "Plenty of Sunlight", selected: true },
      { id: "28", name: "Bachelors", selected: true },
    ]
  );
  const [images, setImages] = useState<ProjectImage[]>(
    initialData?.images || []
  );
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>(
    initialData?.youtubeUrls || [""]
  );
  const [isReraRegistered, setIsReraRegistered] = useState<boolean>(
    initialData?.isReraRegistered || true
  );
  const [reraNumbers, setReraNumbers] = useState<string[]>(
    initialData?.reraNumbers || [""]
  );
  const [landmarks, setLandmarks] = useState<Landmark[]>(
    initialData?.landmarks || [{ name: "Park", distance: "", description: "" }]
  );
  const [latitude, setLatitude] = useState<string>(initialData?.latitude || "");
  const [longitude, setLongitude] = useState<string>(
    initialData?.longitude || ""
  );

  useEffect(() => {
    let progress = 75;
    if (amenities.some((amenity) => amenity.selected)) progress += 6;
    if (images.length > 0 || youtubeUrls.some((url) => url.trim() !== ""))
      progress += 10;
    if (
      landmarks.some(
        (landmark) => landmark.name || landmark.distance || landmark.description
      ) ||
      latitude ||
      longitude
    )
      progress += 9;
    setCompletionPercentage(Math.min(progress, 100));
  }, [amenities, images, youtubeUrls, landmarks, latitude, longitude]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log({
        projectId,
        amenities,
        images,
        youtubeUrls,
        isReraRegistered,
        reraNumbers,
        landmarks,
        latitude,
        longitude,
      });
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/dashboard/projects/${projectId}`);
      }, 1000);
    } catch (error) {
      console.error("Failed to update project:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "p-6 max-h-[100vh] overflow-y-auto",
        "lg:ml-72",
        "max-w-[900px] mx-auto  lg:pl-0"
      )}
    >
      <h1 className="text-2xl font-bold">Update Project</h1>
      <p className="text-gray-500 mt-1 mb-4">
        Fill out the details below about this project
      </p>
      <div className="mb-8">
        <Progress value={completionPercentage} className="h-2 mb-1" />
        <p className="text-sm">{completionPercentage}% Complete</p>
      </div>
      <div className="space-y-8">
        <AmenitiesSection
          amenities={amenities}
          setAmenities={setAmenities}
          areAllAmenitiesSelected={areAllAmenitiesSelected}
          setAreAllAmenitiesSelected={setAreAllAmenitiesSelected}
        />
        <ImageUploadSection images={images} setImages={setImages} />
        <YouTubeSection
          youtubeUrls={youtubeUrls}
          setYoutubeUrls={setYoutubeUrls}
        />
        <ReraSection
          isReraRegistered={isReraRegistered}
          setIsReraRegistered={setIsReraRegistered}
          reraNumbers={reraNumbers}
          setReraNumbers={setReraNumbers}
        />
        <LocationSection
          landmarks={landmarks}
          setLandmarks={setLandmarks}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
        />
      </div>
      <FormFooter
        isLoading={isLoading}
        onPrevious={() => router.back()}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProjectForm;
