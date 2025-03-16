"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

interface YouTubeSectionProps {
  youtubeUrls: string[];
  setYoutubeUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const YouTubeSection = ({
  youtubeUrls,
  setYoutubeUrls,
}: YouTubeSectionProps) => {
  const addYoutubeUrl = () => {
    setYoutubeUrls([...youtubeUrls, ""]);
  };

  const updateYoutubeUrl = (index: number, value: string) => {
    setYoutubeUrls(youtubeUrls.map((url, i) => (i === index ? value : url)));
  };

  const removeYoutubeUrl = (index: number) => {
    setYoutubeUrls(youtubeUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      {youtubeUrls.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">YouTube URLs</h2>
          {youtubeUrls.map((url, index) => (
            <div key={index} className="mb-3 flex items-center space-x-2">
              <Input
                type="text"
                value={url}
                onChange={(e) => updateYoutubeUrl(index, e.target.value)}
                placeholder="Enter YouTube URL"
                className="mb-2"
              />
              {youtubeUrls.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => removeYoutubeUrl(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="flex items-center text-black border"
        onClick={addYoutubeUrl}
      >
        <CirclePlus size={16} className="mr-1" /> Add another URL
      </Button>
    </div>
  );
};

export default YouTubeSection;
