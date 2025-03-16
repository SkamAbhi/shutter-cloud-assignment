"use client";
import { cn } from "@/lib/utils";
import { HousePlus, X } from "lucide-react";
import { ProjectImage } from "./types";
import { Input } from "@/components/ui/input";

interface ImageUploadSectionProps {
  images: ProjectImage[];
  setImages: React.Dispatch<React.SetStateAction<ProjectImage[]>>;
}

const ImageUploadSection = ({ images, setImages }: ImageUploadSectionProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [
            ...prev,
            {
              url: e.target!.result as string,
              description: "",
              isPrimary: prev.length === 0,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const setImageDescription = (index: number, description: string) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, description } : img))
    );
  };

  const setImagePrimary = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, isPrimary: !img.isPrimary } : img
      )
    );
  };

  return (
    <div>
      <h2 className="text-lg text-red-500 font-semibold mb-4"> Images</h2>
      <div className="border-2 border-dashed rounded-lg p-6 text-center mb-6">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
            <HousePlus className="text-gray-600" />
          </div>
          <p className="text-gray-600">Click or drag images here to upload</p>
        </label>
      </div>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden flex flex-col relative"
            >
              <div className="relative">
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 border border-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-3 flex flex-col space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-sm mb-1 font-semibold block">
                      Description
                    </label>
                    <Input
                      type="text"
                      value={image.description}
                      onChange={(e) =>
                        setImageDescription(index, e.target.value)
                      }
                      placeholder="Add Label"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <label className="text-sm font-semibold">Set Primary</label>
                    <button
                      type="button"
                      className={cn(
                        "w-12 h-6 rounded-full relative transition-colors focus:outline-none",
                        image.isPrimary ? "bg-red-500" : "bg-gray-200"
                      )}
                      onClick={() => setImagePrimary(index)}
                      aria-label={
                        image.isPrimary ? "Unset as primary" : "Set as primary"
                      }
                    >
                      <div
                        className={cn(
                          "absolute w-5 h-5 rounded-full bg-white transition-transform top-0.5",
                          image.isPrimary
                            ? "transform translate-x-6"
                            : "translate-x-0.5"
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-start text-red-500 mb-6">Add at least one media</p>
      )}
    </div>
  );
};

export default ImageUploadSection;
