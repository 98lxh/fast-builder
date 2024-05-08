export const is = (value: unknown, type: string): boolean => {
  return toString.call(value) === `[object ${type}]`
}

export const isFunction = (value: unknown): value is Function => is(value, 'Function')
export const isBoolean = (value:unknown): value is boolean => is(value, 'Boolean')
export const isObject = (value:unknown): value is Object => is(value, 'Object')
export const isNull = (value:unknown): value is null => is(value, 'Null')
