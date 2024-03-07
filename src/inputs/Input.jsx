import css from "./Input.module.css";

export const Input = ({ label, name, value, type, onChange }) => {
  return (
    <label className={css.label}>
      {label}
      <input
        className={css.input}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
        required
      />
    </label>
  );
};
