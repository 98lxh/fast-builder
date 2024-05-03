import { MATERIAL_KEY, MaterialComponent } from "./types";

export function generateMaterial(key: MATERIAL_KEY, components: MaterialComponent[]) {
  return { [key]: components } as { MATERIAL_KEY: MaterialComponent[] }
}
