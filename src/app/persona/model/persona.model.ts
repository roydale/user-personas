export interface PersonaType {
  id: number;
  name: string;
  icon: string;
  themeColor: string;
}

export interface Media {
  fileName: string;
  description: string;
}

export interface Demographics {
  age: number;
  occupation: string;
  status: string;
  location: string;
}

export interface TraitOption {
  icon: string;
  value: string;
}

export interface TraitLevel {
  value: number;
  text: string;
}

export interface Traits {
  techSavvy: TraitLevel;
  floralKnowledge: TraitLevel;
  planningStyle: TraitOption[];
  buyingFrequency: TraitOption[];
}

export interface Persona {
  id: number;
  type: PersonaType;
  name: string;
  photo: Media;
  quote: string;
  demographics: Demographics;
  keyGoals: string[];
  keyBehaviors: string[];
  traits: Traits;
  environment: Media;
}
