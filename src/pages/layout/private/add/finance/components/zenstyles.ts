export const zenSelectStyles = {
  control: (base: any, state: { isFocused: any; }) => ({
    ...base,
    backgroundColor: "#FAFAFA",
    borderColor: state.isFocused ? "#E26300" : "#E5E7EB",
    boxShadow: state.isFocused ? "0 0 0 1px #E26300" : "none",
    minHeight: "42px",
    borderRadius: "0.5rem",
    color: "#2E2E2E",
    "&:hover": {
      borderColor: "#E26300",
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "#2E2E2E",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9CA3AF",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#2E2E2E",
  }),
  option: (base: any, state: { isFocused: any; isSelected: any; }) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#F3F4F6"
      : state.isSelected
      ? "#E5E7EB"
      : "white",
    color: "#2E2E2E",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    ":active": {
      backgroundColor: "#E5E7EB",
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "white",
    color: "#2E2E2E",
    zIndex: 10,
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
};