import { useState, useEffect } from "react";

const formFields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "phoneNumber", label: "Phone Number", type: "tel", required: true, pattern: "[0-9]{10}" },
  { name: "email", label: "Email Address", type: "email", required: true }
];

const generateInitialState = () => {
  const state = {};
  formFields.forEach(field => {
    state[field.name] = "";
  });
  return state;
};

const UserForm = ({ selectedUser, onSuccess, clearSelection }) => {
  const [userData, setUserData] = useState(generateInitialState());
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    } else {
      setUserData(generateInitialState());
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = selectedUser
      ? `https://test-task-six-iota.vercel.app/users/${selectedUser._id}`
      : `https://test-task-six-iota.vercel.app/users`;

const method = selectedUser ? "PUT" : "POST";


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

      await response.json();

      setMessage(selectedUser ? "User updated successfully!" : "User added successfully!");
      setUserData(generateInitialState());
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
        
        {/* ✅ Dynamic Rendering of Fields */}
        {formFields.map(field => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              value={userData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              pattern={field.pattern || undefined}
            />
          </div>
        ))}

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

      {message && <p className="text-success mt-3">{message}</p>}
    </div>
  );
};

export default UserForm;

