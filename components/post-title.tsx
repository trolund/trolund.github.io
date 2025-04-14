type PostTitleProps = {
  children: React.ReactNode;
};

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <div>
      <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
        {children}
        <div
          className="ml-auto mr-auto h-[5px] max-w-[500px] rounded-[8px] bg-cover md:m-0"
          style={{ backgroundImage: 'var(--bg-img)' }}
        />
      </h1>
    </div>
  );
}
