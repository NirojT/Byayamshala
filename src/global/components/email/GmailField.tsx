import React, { useState, useEffect } from "react";

interface GmailFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const GMAIL_SUFFIX = "@gmail.com";

export const GmailField: React.FC<GmailFieldProps> = ({
  value,
  onChange,
  placeholder = "Enter email username",
  disabled,
  className,
  error,
}) => {
  // Only extract part before @gmail.com for editing
  const initialUsername = value.endsWith(GMAIL_SUFFIX)
    ? value.replace(GMAIL_SUFFIX, "")
    : value;

  const [username, setUsername] = useState(initialUsername);

  useEffect(() => {
    // If parent value changes externally, update username
    setUsername(
      value.endsWith(GMAIL_SUFFIX) ? value.replace(GMAIL_SUFFIX, "") : value
    );
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameValue = e.target.value.replace(/@gmail\.com$/i, "");
    setUsername(usernameValue);
    if (usernameValue) {
      onChange(usernameValue + GMAIL_SUFFIX);
    } else {
      onChange("");
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`pr-28 w-full ${className || ""} ${
          error ? "border-red-500" : ""
        }`}
        autoComplete="off"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">
        {GMAIL_SUFFIX}
      </span>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};
