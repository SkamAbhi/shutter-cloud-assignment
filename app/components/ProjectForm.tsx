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
  const [areAllAmenitiesSelected, setAreAllAmenitiesSelected] = useState(false); 
  const [amenities, setAmenities] = useState<Amenity[]>(
    initialData?.amenities || [
      { id: "1", name: "School in vicinity", selected: false },
      { id: "2", name: "Near City Center", selected: false },
      { id: "3", name: "Breakthrough Price", selected: false },
      { id: "4", name: "High Rental Yield", selected: false },
      { id: "5", name: "Well Ventilated", selected: false },
      { id: "6", name: "Spacious", selected: false },
      { id: "7", name: "Gated Society", selected: false },
      { id: "8", name: "Luxury Lifestyle", selected: false },
      { id: "9", name: "Newly Built", selected: false },
      { id: "10", name: "Females Only", selected: false },
      { id: "11", name: "Adjoining Metro Station", selected: false },
      { id: "12", name: "Safe & Secure Locality", selected: false },
      { id: "13", name: "Quick Deal", selected: false },
      { id: "14", name: "Affordable", selected: false },
      { id: "15", name: "Fully Renovated", selected: false },
      { id: "16", name: "Ample Parking", selected: false },
      { id: "17", name: "Tasteful Interior", selected: false },
      { id: "18", name: "Well Maintained", selected: false },
      { id: "19", name: "Family", selected: false },
      { id: "20", name: "Peaceful vicinity", selected: false },
      { id: "21", name: "Desperate Sale", selected: false },
      { id: "22", name: "Investment Opportunity", selected: false },
      { id: "23", name: "Reputed Builder", selected: false },
      { id: "24", name: "Vastu Compliant", selected: false },
      { id: "25", name: "Free Hold", selected: false },
      { id: "26", name: "Prime Location", selected: false },
      { id: "27", name: "Plenty of Sunlight", selected: false },
      { id: "28", name: "Bachelors", selected: false },
    ]
  );
  const [images, setImages] = useState<ProjectImage[]>(
    initialData?.images || []
  );
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>(
    initialData?.youtubeUrls || []
  );
  const [isReraRegistered, setIsReraRegistered] = useState<boolean>(
    initialData?.isReraRegistered || false
  );
  const [reraNumbers, setReraNumbers] = useState<string[]>(
    initialData?.reraNumbers || []
  );
  const [landmarks, setLandmarks] = useState<Landmark[]>(
    initialData?.landmarks || [{ name: "", distance: "", description: "" }]
  );
  const [latitude, setLatitude] = useState<string>(initialData?.latitude || "");
  const [longitude, setLongitude] = useState<string>(
    initialData?.longitude || ""
  );

  useEffect(() => {
    let progress = 75; 
    
    const isAmenitiesComplete = amenities.some((amenity) => amenity.selected);
    const isImageUploadComplete = images.length > 0;
    const isYouTubeComplete = youtubeUrls.some((url) => url.trim() !== "");
    const isReraComplete =
      isReraRegistered ||
      reraNumbers.some((num) => num.trim() !== "") ||
      (initialData?.isReraRegistered !== undefined &&
        initialData.reraNumbers?.some((num: string) => num.trim() !== ""));
    const isLocationComplete =
      landmarks.some(
        (landmark) =>
          landmark.name.trim() !== "" ||
          landmark.distance.trim() !== "" ||
          landmark.description.trim() !== ""
      ) ||
      latitude.trim() !== "" ||
      longitude.trim() !== "";

    progress += isAmenitiesComplete ? 5 : 0;
    progress += isImageUploadComplete ? 5 : 0;
    progress += isYouTubeComplete ? 5 : 0;
    progress += isLocationComplete ? 10 : 0;

    setCompletionPercentage(Math.min(progress, 100));
  }, [
    amenities,
    images,
    youtubeUrls,
    isReraRegistered,
    reraNumbers,
    landmarks,
    latitude,
    longitude,
    initialData,
  ]);

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
        "max-w-[900px] mx-auto lg:pl-0"
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