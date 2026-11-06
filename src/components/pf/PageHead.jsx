export default function PageHead({ label, title, children }) {
  return (
    <>
      <div className="pf-sep"><span>{label}</span></div>
      <div className="pf-page-in">
        <h1 className="pf-h1">{title}</h1>
        {children ? <div className="pf-txt">{children}</div> : null}
      </div>
    </>
  );
}
