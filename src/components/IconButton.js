function IconButton({ icon, onClick, text }) {
  return (
    <span className="icon-button">
      <button onClick={onClick}>
        {icon} <span className="icon-button-text">{text}</span>
      </button>
    </span>
  );
}

export default IconButton;
