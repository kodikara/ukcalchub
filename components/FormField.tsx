import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type FieldShellProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

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
};

export function InputField({ label, hint, prefix, className = "", ...props }: InputFieldProps) {
  if (prefix) {
    return (
      <FieldShell label={label} hint={hint}>
        <div className={`input-group ${className}`.trim()}>
          <span className="prefix-slot" aria-hidden="true">
            {prefix}
          </span>
          <input {...props} className="input-inline" />
        </div>
      </FieldShell>
    );
  }

  return (
    <FieldShell label={label} hint={hint}>
      <input
        {...props}
        className={`input-shell ${className}`.trim()}
      />
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
