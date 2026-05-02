"use client";

import type { ChangeEvent, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { FocusEvent } from "react";
import { useEffect, useMemo, useState } from "react";

type FieldShellProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

type SearchableOption = {
  label: string;
  value: string;
};

function normaliseInputValue(value: InputHTMLAttributes<HTMLInputElement>["value"]) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function FieldShell({ label, hint, children }: FieldShellProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <label className="block text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-300">{label}</label>
        {hint ? <span className="text-xs leading-5 text-slate-400">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
};

export function InputField({
  label,
  hint,
  prefix,
  suffix,
  className = "",
  type,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}: InputFieldProps) {
  const isNumberInput = type === "number";
  const [draftValue, setDraftValue] = useState(normaliseInputValue(value));
  const normalisedValue = useMemo(() => normaliseInputValue(value), [value]);

  useEffect(() => {
    if (!isNumberInput) {
      return;
    }

    if (normalisedValue !== draftValue) {
      setDraftValue(normalisedValue);
    }
  }, [draftValue, isNumberInput, normalisedValue]);

  function triggerNumericChange(nextValue: string) {
    if (!onChange) {
      return;
    }

    const parsed = Number(nextValue);
    if (!Number.isFinite(parsed)) {
      return;
    }

    onChange({
      target: { value: String(parsed) },
      currentTarget: { value: String(parsed) },
    } as ChangeEvent<HTMLInputElement>);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isNumberInput) {
      onChange?.(event);
      return;
    }

    const nextValue = event.target.value;
    setDraftValue(nextValue);

    if (nextValue === "" || nextValue === "-" || nextValue === "." || nextValue === "-.") {
      return;
    }

    triggerNumericChange(nextValue);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    if (isNumberInput) {
      if (draftValue !== "" && draftValue !== "-" && draftValue !== "." && draftValue !== "-.") {
        setDraftValue(normaliseInputValue(Number(draftValue)));
      }
    }

    onBlur?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
  }

  const sharedInputProps = {
    ...props,
    type,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    value: isNumberInput ? draftValue : value,
  };

  if (prefix || suffix) {
    return (
      <FieldShell label={label} hint={hint}>
        <div className={`input-group ${className}`.trim()}>
          {prefix ? (
            <span className="prefix-slot" aria-hidden="true">
              {prefix}
            </span>
          ) : null}
          <input {...sharedInputProps} className="input-inline" />
          {suffix ? (
            <span className="prefix-slot text-slate-400" aria-hidden="true">
              {suffix}
            </span>
          ) : null}
        </div>
      </FieldShell>
    );
  }

  return (
    <FieldShell label={label} hint={hint}>
      <input {...sharedInputProps} className={`input-shell ${className}`.trim()} />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function SelectField({ label, hint, children, className = "", ...props }: SelectFieldProps) {
  return (
    <FieldShell label={label} hint={hint}>
      <div className="relative">
        <select {...props} className={`input-shell select-shell ${className}`.trim()}>
          {children}
        </select>
        <span className="select-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </FieldShell>
  );
}

type SearchableSelectFieldProps = {
  label: string;
  hint?: string;
  value: string;
  options: SearchableOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchableSelectField({
  label,
  hint,
  value,
  options,
  onChange,
  placeholder = "Type or choose",
}: SearchableSelectFieldProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) {
      setQuery(selectedOption?.label ?? "");
    }
  }, [open, selectedOption?.label]);

  return (
    <FieldShell label={label} hint={hint}>
      <div className="relative">
        <input
          type="text"
          className="input-shell pr-12"
          value={open ? query : selectedOption?.label ?? ""}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(event) => {
            setOpen(true);
            setQuery(event.target.value);
          }}
          onBlur={() => {
            window.setTimeout(() => {
              setOpen(false);
            }, 120);
          }}
        />
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setOpen((current) => !current);
            setQuery("");
          }}
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/8 hover:text-white"
          aria-label="Toggle options"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open ? (
          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-[#0f1728]/96 p-2 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-xl">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(option.value);
                    setQuery(option.label);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    option.value === value ? "bg-cyan-400/14 text-cyan-100" : "text-slate-200 hover:bg-white/8"
                  }`}
                >
                  <span>{option.label}</span>
                  {option.value === value ? <span className="text-xs font-semibold text-cyan-300">Selected</span> : null}
                </button>
              ))
            ) : (
              <div className="rounded-xl px-3 py-3 text-sm text-slate-400">No matching options.</div>
            )}
          </div>
        ) : null}
      </div>
    </FieldShell>
  );
}

type CheckboxFieldProps = {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ label, hint, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 shadow-[0_14px_32px_rgba(2,6,23,0.24)] backdrop-blur-xl">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#121826] text-cyan-400"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm font-semibold text-white">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-5 text-slate-400">{hint}</span> : null}
      </span>
    </label>
  );
}
