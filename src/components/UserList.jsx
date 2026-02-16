import { useEffect, useState } from "react";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://test-task-six-iota.vercel.app/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://test-task-six-iota.vercel.app/users/${id}`, {
        method: "DELETE",
      });
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="card p-3 p-md-4 mb-4">
      <h3 className="mb-3">All Users</h3>

      {/* Make table responsive */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="text-success mt-3">{message}</p>}
    </div>
  );
};

export default UserList;
