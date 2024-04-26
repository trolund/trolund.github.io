export default function SubPostTitle({ children }) {
  return (
    <div>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {children}
      </h2>
    </div>
  )
}
