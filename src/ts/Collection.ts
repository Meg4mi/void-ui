/**
 * Generic collection type definitions.
 */

/**
 * A dict mode map object type, use string as key type.
 */
export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * A dict mode map object type, use number as key type.
 */
export interface DictionaryNumber<T> {
  [key: number]: T;
}
