import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false, // Define o padrão como false
}) => (
  <div className="w-full">
    <div className="label">
      <span className="label-text">{placeholder}</span>
    </div>
    <label className="input input-bordered flex items-center gap-2 mb-4 mt-2">
      {Icon && <Icon className="h-4 w-4 opacity-70" />}{" "}
      {/* Renderiza o ícone se ele for passado */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="grow"
        required={required} // Passa o valor de required
      />
    </label>
  </div>
);

export default Input;
