import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  const clearSelection = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management System</h2>

      <UserForm
        selectedUser={selectedUser}
        onSuccess={handleSuccess}
        clearSelection={clearSelection}
      />

      <UserList
        key={refresh}
        onEdit={(user) => setSelectedUser(user)}
      />
    </div>
  );
}

export default App;
