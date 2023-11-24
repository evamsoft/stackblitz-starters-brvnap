/*
We used the export {} line in our index.d.ts file to mark it as an external module.

A module is a file that contains at least 1 import or export statement. We are required to do that to be able to augment the global scope.
*/
export {};

declare global {
  interface Array<T> {
    shuffle(): Array<T>;
    splitEquallyIntoTwoArrays(): T[][];
  }  
}

