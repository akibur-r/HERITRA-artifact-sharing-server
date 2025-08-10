const LoaderSpinner = ({ size = 20, color = "foreground" }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: `var(--${color})`,
    borderTopColor: "transparent",
  };

  return (
    <div
      className={`animate-spin rounded-full border-4`}
      style={spinnerStyle}
    />
  );
};

export default LoaderSpinner;
