export default function Blob({ color = "#3D5AFE", className = "", opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M45.3,-58.5C58.4,-49.9,68.5,-35.5,72.6,-19.5C76.7,-3.5,74.8,14.1,67.1,28.6C59.4,43.1,45.9,54.5,30.7,61.6C15.5,68.7,-1.4,71.5,-17.9,68.4C-34.4,65.3,-50.5,56.3,-60.8,42.6C-71.1,28.9,-75.6,10.5,-73.4,-6.8C-71.2,-24.1,-62.3,-40.3,-49.3,-49.1C-36.3,-57.9,-19.2,-59.3,-1.6,-57.2C16,-55.1,32,-67.1,45.3,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
