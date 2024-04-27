import uuid from "uuid"
import { defineStore } from "pinia"

interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string
}

export interface DesignerProps {
  components: ComponentData[],
  currentElement: string;
}

export const useDesinerStore = defineStore('designer', () => {

})


export const testing: ComponentData[] = [
  { id: uuid.v4(), name: 'text', props: { text: 'hello1' } },
  { id: uuid.v4(), name: 'text', props: { text: 'hello2' } },
  { id: uuid.v4(), name: 'text', props: { text: 'hello3' } }
]
