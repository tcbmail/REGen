// ... keep existing types ...

export interface MetroArea {
  center: string;
  state: string;
  suburbs: string[];
  commuteBenefits: string[];
}

export interface LocationContext {
  type: 'METRO_CENTER' | 'SUBURB';
  metro: string;
  benefits: string[];
}

export interface LocationAnalysis {
  context: LocationContext | null;
  benefits: string[];
}