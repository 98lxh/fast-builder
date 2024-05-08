import { defineMaterialCategory, defineMaterialComponents } from "./../_composables/define";

const key = Symbol('media')

const components = []

defineMaterialComponents(key, components)
defineMaterialCategory({ text: '媒体', key, icon: 'designer/media/media' })

