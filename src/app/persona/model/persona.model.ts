export interface PersonaType {
  id: number;
  name: string;
  userType?: string;
  icon: string;
  themeColor: string;
}

export interface Media {
  fileName: string;
  description: string;
}

export interface DemographicAttribute {
  label: string;
  value: string | number;
}

export interface TraitLevel {
  value: number;
  max?: number;
  text: string;
}

export interface TraitOption {
  icon?: string;
  value: string;
}

export interface Trait {
  label: string;
  level?: TraitLevel;
  options?: TraitOption[];
}

export interface Persona {
  id: number;
  type: PersonaType;
  name: string;
  photo: Media;
  quote: string;
  demographics: DemographicAttribute[];
  keyGoals: string[];
  keyBehaviors: string[];
  traits: Trait[];
  environment: Media;
  painPoints: string[];
  opportunities: string[];
}
