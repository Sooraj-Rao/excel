import { JSX } from "react";

// Type for Coordinator
export interface I_Coordinator {
  name: string;
  contact: string;
}

// Type for Event
export interface I_Event {
  id: number;
  roundsTime: string[];
  name: string;
  image: string;
  slogan: string;
  participants: string;
  venue: string;
  guidelines: string[];
  coordinator: Coordinator[];
}

// Type for TeamMember
export interface I_TeamMember {
  id: number;
  name: string;
  role?: string;
  designation: string;
  image: string;

  phone?: string;
}
