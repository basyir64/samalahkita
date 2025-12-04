import '../../index.css'

export default function Typewriter({ text, className = "", as: Component = "div" }) {
  const length = text.length;

  return (
    <Component
      className={`animate-typewriter overflow-hidden whitespace-nowrap ${className}`}
      style={{
        "--steps": 100,
        "--duration": `${Math.max(0.5, 40 / length)}s`,
      }}
    >
      {text}
    </Component>
  );
}