
interface DropdownProps {
    title: string;
    options: string[];
  }
  
  const Dropdown: React.FC<DropdownProps> = ({ title, options }) => (
    <div>
      <h3>{title}</h3>
      <select name={title}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default Dropdown;