import { useState } from "react";
import "../styles/profile.css";
import { IconSave, IconLock, IconUpload, IconCustomers } from "../assets/icons";
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    middleName: "Carlo",
    lastName: "Santos",
    email: "john@email.com",
    mobile: "09123456789",
    username: "johnsantos",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="manage-profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <h1 className="page-title">Manage Profile</h1>

        <button className="save-btn">
          <span>
            <IconSave />
          </span>{" "}
          Save
        </button>
      </div>

      {/* CONTENT */}
      <div className="profile-container">
        {/* LEFT SIDE */}
        <div className="profile-image-card">
          <img src={profile.image} alt="Profile" className="profile-image" />

          <button className="upload-btn">
            <span>
              <IconUpload />
            </span>{" "}
            Upload Image
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-form-card">
          <h2 className="section-title">Account Information</h2>

          {/* ROW 1 */}
          <div className="form-grid three">
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={profile.middleName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="form-grid two">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="divider" />

          {/* ROW 3 */}
          <div className="form-grid two bottom-row">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <button className="change-password-btn">
                <span>
                  <IconLock />
                </span>{" "}
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
