import React from "react";

interface RadioGroupProps {
  title: string;
  options: string[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ title, options }) => (
  <div>
    <h3>{title}</h3>
    {options.map((option, index) => (
      <label key={index}>
        <input type="radio" name={title} value={option} />
        {option}
      </label>
    ))}
  </div>
);

export default RadioGroup;