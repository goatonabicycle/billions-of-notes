function Select(props) {
  return (
    <div>
      <div key={props.id}>
        <label htmlFor={props.id}>{props.label}</label>
        <select id={props.id}>
          {props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
