type SubPostTitleProps = {
  children: React.ReactNode;
};

export default function SubPostTitle({ children }: SubPostTitleProps) {
  return (
    <div>
      <h2 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
        {children}
      </h2>
    </div>
  );
}
