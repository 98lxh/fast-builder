import { FC } from "vite-plugin-vueact";

export function convert(component: Record<string, any>) {
  return component as unknown as { [key: string]: FC }
}
