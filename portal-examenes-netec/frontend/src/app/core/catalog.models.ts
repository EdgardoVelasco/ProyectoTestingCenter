export interface CatalogOption {
  id: string;
  code: string;
  name: string;
}

export interface ExamCatalogItem extends CatalogOption {
  vendorId: string;
  vendorName: string;
  technologyId: string;
  technologyName: string;
  certificationId: string;
  certificationName: string;
  courseName: string;
  retake: string | null;
  comments: string | null;
  basePrice: string;
  currency: 'USD';
  active: boolean;
}

export interface RequestCatalogs {
  courseTypes: CatalogOption[];
  segments: CatalogOption[];
  locations: CatalogOption[];
  vendors: CatalogOption[];
  technologies: CatalogOption[];
  certifications: CatalogOption[];
  exams: ExamCatalogItem[];
}
