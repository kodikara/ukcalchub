"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ShareableField<T> = {
  defaultValue: T;
  parse: (raw: string) => T | undefined;
  param?: string;
  serialize?: (value: T, defaultValue: T) => string | null;
};

export type ShareableConfig<T extends Record<string, unknown>> = {
  [K in keyof T]: ShareableField<T[K]>;
};

function serialiseValue<T>(value: T, defaultValue: T, custom?: (value: T, defaultValue: T) => string | null) {
  if (custom) {
    return custom(value, defaultValue);
  }

  if (typeof value === "boolean") {
    if (value === defaultValue) {
      return null;
    }

    return value ? "1" : "0";
  }

  if (value === defaultValue || value === "" || value === null || value === undefined) {
    return null;
  }

  return String(value);
}

export function useShareableCalculatorState<T extends Record<string, unknown>>(config: ShareableConfig<T>) {
  const defaultState = useMemo(() => {
    const next = {} as T;

    (Object.keys(config) as (keyof T)[]).forEach((key) => {
      next[key] = config[key].defaultValue;
    });

    return next;
  }, [config]);

  const [state, setState] = useState<T>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const nextState = { ...defaultState };
    let foundOverride = false;

    (Object.keys(config) as (keyof T)[]).forEach((key) => {
      const field = config[key];
      const raw = params.get(field.param ?? String(key));

      if (raw === null) {
        return;
      }

      const parsed = field.parse(raw);

      if (parsed !== undefined) {
        nextState[key] = parsed;
        foundOverride = true;
      }
    });

    if (foundOverride) {
      setState(nextState);
    }

    setReady(true);
  }, [config, defaultState]);

  useEffect(() => {
    if (!ready || typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    (Object.keys(config) as (keyof T)[]).forEach((key) => {
      const field = config[key];
      const paramName = field.param ?? String(key);
      const serialised = serialiseValue(state[key], field.defaultValue, field.serialize);

      if (serialised === null || serialised === "") {
        url.searchParams.delete(paramName);
      } else {
        url.searchParams.set(paramName, serialised);
      }
    });

    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (next !== current) {
      window.history.replaceState({}, "", next);
    }
  }, [config, ready, state]);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState((current) => {
      if (Object.is(current[key], value)) {
        return current;
      }

      return { ...current, [key]: value };
    });
  }, []);

  const setFields = useCallback((partial: Partial<T>) => {
    setState((current) => ({ ...current, ...partial }));
  }, []);

  return { state, setField, setFields };
}

export function decimalField(defaultValue: number, param?: string): ShareableField<number> {
  return {
    defaultValue,
    param,
    parse: (raw) => {
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : undefined;
    },
  };
}

export function integerField(defaultValue: number, param?: string): ShareableField<number> {
  return {
    defaultValue,
    param,
    parse: (raw) => {
      const parsed = Number.parseInt(raw, 10);
      return Number.isFinite(parsed) ? parsed : undefined;
    },
  };
}

export function booleanField(defaultValue = false, param?: string): ShareableField<boolean> {
  return {
    defaultValue,
    param,
    parse: (raw) => {
      const normalised = raw.trim().toLowerCase();

      if (["1", "true", "yes", "y"].includes(normalised)) {
        return true;
      }

      if (["0", "false", "no", "n"].includes(normalised)) {
        return false;
      }

      return undefined;
    },
  };
}

export function enumField<T extends string>(defaultValue: T, values: readonly T[], param?: string): ShareableField<T> {
  return {
    defaultValue,
    param,
    parse: (raw) => (values.includes(raw as T) ? (raw as T) : undefined),
  };
}

export function stringField(defaultValue: string, param?: string): ShareableField<string> {
  return {
    defaultValue,
    param,
    parse: (raw) => raw,
  };
}
