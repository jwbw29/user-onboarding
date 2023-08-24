export default function Members({ details }) {
  if (!details) {
    return <h3>Fetching Member Details</h3>;
  }

  return (
    <div className="container pb-2 pt-6 border-b-2 text-center">
      <h2 className="text-2xl">
        {details.first_name} {details.last_name}
      </h2>
      <p>{details.email}</p>
    </div>
  );
}
