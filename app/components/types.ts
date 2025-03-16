export interface ProjectFormProps {
    projectId: string;
    initialData?: any;
  }
  
  export interface Amenity {
    id: string;
    name: string;
    selected: boolean;
  }
  
  export interface ProjectImage {
    url: string;
    description: string;
    isPrimary: boolean;
  }
  
  export interface Landmark {
    name: string;
    distance: string;
    description: string;
  }