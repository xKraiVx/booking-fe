import { useGetActions } from "@/use-cases/actions/useGetActions";

export default function ActionsPage() {
  const { data: actions, isLoading, error } = useGetActions();

  if (!actions && isLoading) {
    return <div>Loading actions...</div>;
  }

  return (
    <div>
      <h1>Actions</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading actions</p>}
      {actions?.data && (
        <ul>
          {actions.data.map((item) => (
            <li key={item.id}>
              {item.action} - {item.user?.email || 'N/A'} - {item.statusCode} - (
              {new Date(item.createdAt).toLocaleString("en-GB")})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
