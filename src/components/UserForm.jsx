import { useState, useEffect } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
};

const UserForm = ({ selectedUser, onSuccess, clearSelection }) => {
  const [userData, setUserData] = useState(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = selectedUser
    ? `https://test-task-six-iota.vercel.app/users/${selectedUser._id}`
    : `https://test-task-six-iota.vercel.app/users`;

  // Use the same method as your backend expects
  const method = "POST"; // or PUT if backend supports

  console.log("Submitting URL:", url);
  console.log("User data:", userData);

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Something went wrong");
    }

    const data = await response.json();
    setMessage(selectedUser ? "User updated successfully!" : "User added successfully!");
    setUserData(initialState);
    onSuccess();
    clearSelection();
  } catch (error) {
    console.error(error);
    setMessage("Error saving user: " + error.message);
  }
};


  return (
    <div className="card p-4 mb-4">
      <h3>{selectedUser ? "Update User" : "Add New User"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            className="form-control"
            value={userData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {selectedUser ? "Update" : "Add User"}
        </button>

        {selectedUser && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearSelection}
          >
            Cancel
          </button>
        )}
      </form>

      <p className="text-success mt-3">{message}</p>
    </div>
  );
};

export default UserForm;
