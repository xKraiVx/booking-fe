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
          {actions.data.map(({ id, action, user, statusCode, createdAt }) => (
            <li key={id}>
              {action} - {user.email} - {statusCode} - (
              {new Date(createdAt).toLocaleString("en-GB")})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
