import '../../index.css'

export default function Typewriter({ text, className = "", as: Component = "div" }) {

  return (
    <Component
      key={text}
      className={`w-max animate-typewriter overflow-hidden whitespace-nowrap ${className}`}
      style={{
        "--steps": 100,
        "--duration": `1s`,
      }}
    >
      {text}
    </Component>
  );
}