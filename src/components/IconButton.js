function IconButton({ icon, onClick, text }) {
  return (
    <span className="icon-button">
      <button onClick={onClick}>
        {icon} {text}
      </button>
    </span>
  );
}

export default IconButton;
