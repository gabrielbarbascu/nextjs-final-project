import sjson from 'secure-json-parse';

//import { FruitComment } from '../app/fruits/[fruitId]/actions.js';

export function parseJson(stringifiedJson: string): Comment[] | undefined {
  if (!stringifiedJson) return undefined;
  try {
    return sjson(stringifiedJson);
  } catch {
    return undefined;
  }
}
