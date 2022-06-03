import { useMemo } from "react";

type PlainValue = undefined | null | string | number | boolean;
type EvaluatesToPlainValue = {
  valueOf(): PlainValue;
};
type Value = PlainValue | EvaluatesToPlainValue;
type Param = Record<string, Value>;

const isObject = (value: unknown): value is object => {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
};
const getValues = (obj: Param): PlainValue[] =>
  Object.entries(obj).map(([key, val]) => {
    if (!isObject(val)) {
      return val;
    }
    if (typeof val.valueOf == "function") {
      const value = val.valueOf();
      if (!isObject(value)) {
        return value;
      }
    }
    throw new Error(`${key} contains an unsupported object`);
  });

export const useObject = <T extends Param>(obj: T): T =>
  useMemo<T>(() => obj, getValues(obj));
