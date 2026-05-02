export type CouncilTaxBand = "" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export const councilTaxBandOptions: { label: string; value: CouncilTaxBand }[] = [
  { label: "Select a band", value: "" },
  { label: "Band A", value: "A" },
  { label: "Band B", value: "B" },
  { label: "Band C", value: "C" },
  { label: "Band D", value: "D" },
  { label: "Band E", value: "E" },
  { label: "Band F", value: "F" },
  { label: "Band G", value: "G" },
  { label: "Band H", value: "H" },
];

export const councilTaxBandMonthlyAverages: Record<Exclude<CouncilTaxBand, "">, number> = {
  A: 110,
  B: 128,
  C: 146,
  D: 164,
  E: 200,
  F: 237,
  G: 273,
  H: 328,
};

export function councilTaxValueForBand(band: CouncilTaxBand): number {
  if (!band) {
    return 0;
  }

  return councilTaxBandMonthlyAverages[band];
}
