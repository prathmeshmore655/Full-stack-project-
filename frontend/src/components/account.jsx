import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ReactTyped } from 'react-typed';


const Account = () => {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [p_img, setImage] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [userUpdated, setUserUpdated] = useState(false); // New state to track updates
    const csrfToken = document.cookie.split('=')[1];

    useEffect(() => {

        fetchUserData();
    }, [csrfToken, userUpdated]); 
    const fetchUserData = () => {
        fetch('http://localhost:8000/API/get_user', {
            method: 'GET',
            headers: { 'X-CSRFToken': csrfToken },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setFormData(data);
                setLoading(false);
                setImage(
                    data.info.profile_image !== null
                        ? `http://localhost:8000${data.info.profile_image}`
                        : '/assests/default.png'
                );
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => {
            if (['address', 'phone'].includes(name)) {
                return {
                    ...prevData,
                    info: {
                        ...prevData.info,
                        [name === 'phone' ? 'mobile' : name]: value,
                    },
                };
            }
            return { ...prevData, [name]: value };
        });
    };

    const handleImageChange = (e) => {
        setNewProfileImage(e.target.files[0]);
    };

    const handleSave = () => {
        const updateFormData = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'info') {
                Object.keys(formData.info || {}).forEach(infoKey => {
                    updateFormData.append(infoKey, formData.info[infoKey]);
                });
            } else {
                updateFormData.append(key, formData[key]);
            }
        });

        if (newProfileImage) {
            updateFormData.append('profile_image', newProfileImage);
        }

        fetch('http://localhost:8000/API/update_user', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            body: updateFormData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                return response.json(); // Return the updated user data
            })
            .then(updatedUser => {
                // Update the state with the new data and trigger re-fetch
                setUserUpdated(true); // Trigger the user data refetch
                setEditMode(false);
              
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                alert('Error updating profile. Please try again.');
            });
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
    }

    return (
        <div className="container my-5">
            <div className="text-center mb-4">


                    <label className="display-4 ">
                        <ReactTyped
                            strings={[`Welcome ${user.username} , `]}
                            typeSpeed={90} 
                            backSpeed={50} 
                            loop={true} 
                        />
                    </label>

                <p className="text-muted">Manage your profile with style!</p>
            </div>
            <div className="row g-4">
                {/* Profile Section */}
                <div className="col-lg-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                        <div className="position-relative">
                        {/* Profile Image */}
                        <img
                            src={p_img}
                            alt="Profile"
                            className="rounded-circle mb-3 img-thumbnail"
                            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />

                        {/* Upload Button */}
                        {editMode && (
                            <div className="mt-3">
                                <label
                                    htmlFor="profileImageInput"
                                    className="btn btn-secondary btn-sm"
                                >
                                    <i className="bi bi-camera-fill me-2"></i>Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                    </div>
                     <h3 className="card-title">{user.username}</h3>
                            <button
                                className={`btn ${editMode ? 'btn-danger' : 'btn-primary'} mt-3`}
                                onClick={() => setEditMode(!editMode)}
                            >
                                {editMode ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="mb-4">Profile Details</h2>
                            <form id="update_form">
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <div className="row g-2">
                                <div className="col-md-6 col-sm-12">
                                  <input
                                    type="text"
                                    name="first_name"
                                    className="form-control"
                                    value={formData.first_name || ''}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                    placeholder="First Name"
                                  />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                  <input
                                    type="text"
                                    name="last_name"
                                    className="form-control"
                                    value={formData.last_name || ''}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                    placeholder="Last Name"
                                  />
                                </div>
                              </div>
                            </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.info?.mobile || ''}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        value={formData.info?.address || ''}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    ></textarea>
                                </div>
                                {editMode && (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
