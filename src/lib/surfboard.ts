export type BoardShape =
  | "shortboard"
  | "longboard"
  | "fish"
  | "funboard"
  | "gun"
  | "hybrid";

export type BoardMaterial = "polyurethane" | "eps" | "carbon_fiber" | "wood";

export type FinSetup =
  | "single"
  | "twin"
  | "thruster"
  | "quad"
  | "five_fin"
  | "no_fins";

export interface SurfboardOrder {
  shape: BoardShape;
  lengthFt: number;
  lengthIn: number;
  material: BoardMaterial;
  fins: FinSetup;
  color: string;
  customInstructions: string;
  customerName: string;
  customerEmail: string;
}

export const BOARD_SHAPES: { value: BoardShape; label: string; description: string }[] = [
  { value: "shortboard", label: "Shortboard", description: "High-performance board for experienced surfers" },
  { value: "longboard", label: "Longboard", description: "Classic smooth ride, great for beginners" },
  { value: "fish", label: "Fish", description: "Wide, flat design perfect for small waves" },
  { value: "funboard", label: "Funboard", description: "Versatile mid-length for all skill levels" },
  { value: "gun", label: "Gun", description: "Narrow and long for big wave riding" },
  { value: "hybrid", label: "Hybrid", description: "Blend of shortboard performance and fish stability" },
];

export const BOARD_MATERIALS: { value: BoardMaterial; label: string; description: string }[] = [
  { value: "polyurethane", label: "Polyurethane (PU)", description: "Traditional feel, classic flex" },
  { value: "eps", label: "EPS Foam", description: "Lightweight and buoyant, great for beginners" },
  { value: "carbon_fiber", label: "Carbon Fiber", description: "Ultra-light, ultra-responsive for pros" },
  { value: "wood", label: "Timber", description: "Eco-friendly, beautiful natural finish" },
];

export const FIN_SETUPS: { value: FinSetup; label: string; description: string }[] = [
  { value: "single", label: "Single", description: "Classic longboard control" },
  { value: "twin", label: "Twin", description: "Loose and fast in small surf" },
  { value: "thruster", label: "Thruster (3 Fins)", description: "Most popular, balanced drive and control" },
  { value: "quad", label: "Quad (4 Fins)", description: "Fast down the line, great in bigger surf" },
  { value: "five_fin", label: "Five Fin", description: "Maximum versatility — use any configuration" },
  { value: "no_fins", label: "Finless", description: "Experimental, skate-inspired sliding" },
];

export const BOARD_COLORS = [
  { value: "#FFFFFF", label: "White" },
  { value: "#0ea5e9", label: "Ocean Blue" },
  { value: "#10b981", label: "Sea Green" },
  { value: "#f59e0b", label: "Sandy Yellow" },
  { value: "#ef4444", label: "Sunset Red" },
  { value: "#8b5cf6", label: "Purple Haze" },
  { value: "#f97316", label: "Coral Orange" },
  { value: "#1e293b", label: "Midnight" },
];
