import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function Products() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users${query ? `?q=${query}` : ''}`);
      setUsers(response.data);
      setDisplayedUsers(response.data.slice(0, 5)); // Display only the first 5 users
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setDisplayedUsers(users.slice(0, 5)); // Update displayed users when users array changes
  }, [users]);

  const handleEdit = (user) => {
    setEditing({ ...user }); // Ensure a fresh copy for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditing((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== userId);
        setDisplayedUsers(updatedUsers.slice(0, 5)); // Ensure displayedUsers is updated
        return updatedUsers;
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      setLoading(true);
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editing.id}`, editing);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === editing.id ? editing : u))
        );
        setEditing(null);
        setDisplayedUsers(users.slice(0, 5)); // Update displayedUsers
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, response.data];
        setDisplayedUsers(updatedUsers.slice(0, 5)); // Ensure displayedUsers is updated
        return updatedUsers;
      });
      setCreating(false);
      setNewUser({ name: '', email: '', phone: '' });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers(searchQuery);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User Management</h2>
      
      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email"
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mb-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {/* User Table */}
      {!loading && (
        <>
          <div className="d-flex justify-content-between mb-3">
            <h3>Users List</h3>
            <button
              className="btn btn-success"
              onClick={() => setCreating(true)}
              disabled={loading}
            >
              Create New User
            </button>
          </div>
          
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {editing && editing.id === user.id ? (
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={editing.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editing && editing.id === user.id ? (
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={editing.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editing && editing.id === user.id ? (
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={editing.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td>
                    {editing && editing.id === user.id ? (
                      <button
                        className="btn btn-success me-2"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        Update
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEdit(user)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Create User Form */}
          {creating && (
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title">Create New User</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={handleCreate}
                    disabled={loading}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setCreating(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Error Message */}
      {error && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
    </div>
  );
}
