"use client";
import { useState } from "react";

export default function Home() {
  const [activeForm, setActiveForm] = useState("login");
  const [userType, setUserType] = useState("");
  const [signupData, setSignupData] = useState({
    cin: "",
    name: "",
    lastName: "",
    email: "",
    telephone: "",
    pictureBase64: "",
    cartegriseBase64: "",
  });

  const handleFileUpload = (event, field) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignupData((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    console.log(signupData);
    alert("Sign up successful!");
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Login CIN:", signupData.cin);
    alert("Login successful!");
  };

  return (
    <div className="container">
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button onClick={() => setActiveForm("login")} className={activeForm === "login" ? "active" : ""}>
          Log In
        </button>
        <button onClick={() => setActiveForm("signup")} className={activeForm === "signup" ? "active" : ""}>
          Sign Up
        </button>
      </div>

      {/* Log In Form */}
      {activeForm === "login" && (
        <form onSubmit={handleLoginSubmit} className="form">
          <h2>LOG IN</h2>
          <input type="number" placeholder="Your CIN" required onChange={(e) => setSignupData({ ...signupData, cin: e.target.value })} />
          <button type="submit">SUBMIT</button>
          <p>Forgot your password?</p>
        </form>
      )}

      {/* Sign Up Form */}
      {activeForm === "signup" && (
        <form onSubmit={handleSignupSubmit} className="form">
          <h2>SIGN UP</h2>
          <input type="number" placeholder="Your CIN" required onChange={(e) => setSignupData({ ...signupData, cin: e.target.value })} />
          <input type="text" placeholder="Your Name" required onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
          <input type="text" placeholder="Your Last Name" required onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} />
          <input type="email" placeholder="Your Email" required onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
          <input type="tel" placeholder="Your Telephone Number" required onChange={(e) => setSignupData({ ...signupData, telephone: e.target.value })} />
          
          <select required onChange={(e) => setUserType(e.target.value)}>
            <option value="">Select User Type</option>
            <option value="client">Client</option>
            <option value="chauffeur">Chauffeur</option>
          </select>

          {/* File Upload Fields for Chauffeur */}
          {userType === "chauffeur" && (
            <div>
              <label>Upload Picture:</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "pictureBase64")} />

              <label>Upload Cartegrise:</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "cartegriseBase64")} />
            </div>
          )}

          <button type="submit">SUBMIT</button>
        </form>
      )}
    </div>
  );
}
