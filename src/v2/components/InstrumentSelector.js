export const InstrumentSelector = ({ instruments, selected, onSelect }) => (
  <select
    onChange={(e) => onSelect(e.target.value)}
    value={selected}>
    {instruments.map((instrument) => (
      <option
        key={instrument.value}
        value={instrument.value}>
        {instrument.label}
      </option>
    ))}
  </select>
);
