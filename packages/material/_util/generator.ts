import { MaterialCategory, MaterialComponent } from "./../_composables/types";

export const mapMaterialComponents: Record<string, any> = {}

export function generateMaterialComponents(category: MaterialCategory, components: Omit<MaterialComponent,'component'>[]) {
  return { [category]: components } as { MaterialCategory: MaterialComponent[] }
}

export function defineComponent(materialComponent: MaterialComponent) {
  const { key, component, icon, text, style } = materialComponent;

  if (!mapMaterialComponents[key]) {
    mapMaterialComponents[key] = component;
  }

  return { icon, text, key ,style };
}
