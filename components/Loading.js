export default function Loading({ text = "Finding your creative space..." }) {
  return <div className="loading-state"><span className="loader-ring"/><p>{text}</p></div>;
}
