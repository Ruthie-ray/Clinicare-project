export default function PageWrapper({ children, classname }) {
  return (
    <div
      className={`container pt-22 md:pt-24 lg:pt-10 pb-6 px-4 md:px-0 lg:px-4 mx-auto ${classname}`}
    >
      {children}
    </div>
  );
}
