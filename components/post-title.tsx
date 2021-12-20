export default function PostTitle({ children }) {
  return (
    <div>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {children}
        <div style={{ height: "5px", maxWidth: "500px", backgroundImage: "var(--bg-img)", backgroundSize: "cover", borderRadius: "8px" }} />
      </h1>
    </div>
  )
}
