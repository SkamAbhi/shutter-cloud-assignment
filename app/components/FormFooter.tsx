"use client";

import { Button } from "@/components/ui/button";

interface FormFooterProps {
  isLoading: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
}

const FormFooter = ({ isLoading, onPrevious, onSubmit }: FormFooterProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isLoading}
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Previous
      </Button>
      <Button
        onClick={onSubmit}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        {isLoading ? "Saving..." : "Submit"}
      </Button>
    </div>
  );
};

export default FormFooter;
