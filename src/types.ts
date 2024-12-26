export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  listingType: 'sale' | 'rent';
  priceDisplay: 'show' | 'inquire' | 'auction';
  price?: number;
  condition: string;
  conditionOther: string;
  specialEnhancements: string;
  deficiencies: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  emphasis: string[];
}

export interface LotLocationDetails {
  neighborhood: string;
  lotSize: string;
  nearbyAttractions: string;
  topography: string;
  view: string;
  viewOther: string;
  hasHOA: boolean;
  hoaFee?: number;
  hoaFeeFrequency: 'monthly' | 'quarterly' | 'annually';
  lastYearTaxes?: number;
  emphasis: string[];
}

export interface HouseDetails {
  propertyType: string;
  propertyTypeOther: string;
  architecturalStyle: string;
  architecturalStyleOther: string;
  yearBuilt?: number;
  levels?: number;
  garageSpaces?: number;
  carportSpaces?: number;
  foundation: string;
  foundationOther: string;
  basementType: string[];
  basementTypeOther: string;
  fenceType: string;
  fenceTypeOther: string;
  hasInGroundPool: boolean;
  hasAboveGroundPool: boolean;
  hasPorch: boolean;
  hasDeck: boolean;
  hasPatio: boolean;
  isHandicapAccessible: boolean;
  isFurnished: boolean;
  additionalStructures: string[];
  additionalStructuresOther: string;
  emphasis: string[];
}

export interface CommunityDetails {
  amenities: string[];
  amenitiesOther: string;
  poaName: string;
  schoolDistrict: string;
  emphasis: string[];
}

export interface SaleType {
  isOwnerFinance: boolean;
  isLeaseOption: boolean;
  isForeclosure: boolean;
  isShortSale: boolean;
  isTenantOccupied: boolean;
  ownerFinanceTerms: string;
  leaseOptionTerms: string;
  emphasis: string[];
}

export interface SellerDetails {
  includeSeller: boolean;
  agentName: string;
  agency: string;
  website: string;
  phone: string;
  textNumber: string;
  facebookId: string;
  email: string;
  preferredContact: 'website' | 'phone' | 'text' | 'facebook' | 'email';
}

export interface FormState {
  propertyDetails: PropertyDetails;
  lotLocationDetails: LotLocationDetails;
  houseDetails: HouseDetails;
  communityDetails: CommunityDetails;
  saleDetails: SaleType;
  sellerDetails: SellerDetails;
  tone: string;
  outputType: string;
  includeCallToAction: boolean;
  inSpanish: boolean;
  mlsCharacterLimit: number;
}