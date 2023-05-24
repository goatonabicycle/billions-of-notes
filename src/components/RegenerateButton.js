function RegenerateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        color: "white",
        border: "1px solid white",
        marginLeft: "20px",
      }}>
      New notes
    </button>
  );
}

export default RegenerateButton;
