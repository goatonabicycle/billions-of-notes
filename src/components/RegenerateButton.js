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
      Reload
    </button>
  );
}

export default RegenerateButton;
