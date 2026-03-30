export default function Main({ title, className, children, fProject }) {
  return (
    <main role="main">
      {fProject ? (
        <h1 className={`${fProject}__h1`}>{title}</h1>
      ) : (
        <h1>{title}</h1>
      )}
      <div className={`container ${className}`}>{children}</div>
    </main>
  );
}
