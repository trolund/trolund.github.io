type PostTitleProps = {
  children: React.ReactNode;
};

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <div>
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {children}
        <div
          className="mr-auto ml-auto md:m-0"
          style={{
            height: '5px',
            maxWidth: '500px',
            backgroundImage: 'var(--bg-img)',
            backgroundSize: 'cover',
            borderRadius: '8px',
          }}
        />
      </h1>
    </div>
  );
}
