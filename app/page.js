"use client";
import { useState } from "react";
import { insertUser } from '../utils/supabaseHelper';
import {fetchUserByCin} from '../utils/supabaseHelper';

export default function Home() {
  const [activeForm, setActiveForm] = useState("login");
  const [userType, setUserType] = useState("");
  const [signupData, setSignupData] = useState({
    cin: "",
    name: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
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
    insertUser([
      {
        cin: signupData.cin,
        firstname: signupData.name,
        lastname: signupData.lastName,
        phone: signupData.telephone,
        email: signupData.email,
        address: signupData.address,
        password: signupData.password,
        role: userType,
        profilepictureurl: signupData.pictureBase64,
        cartegriseurl: signupData.cartegriseBase64,
      },
    ]); 
    alert("Sign up successful!");
  };

const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.table(signupData);
    console.log("Login CIN:", signupData.cin);
    console.log("Login Password:", signupData.password);

    // Fetch user by CIN
    const { retrievedCin, retrievedPassword } = await fetchUserByCin(signupData.cin);

    if (!retrievedCin) {
        // If the CIN is not found
        alert("User is not found. Create a new account.");
    } else {
        // If CIN is found, check password
        if (retrievedPassword !== signupData.password) {
            // If the password is incorrect
            alert("Password is incorrect. Forgot your password?");
        } else {
            // If the password is correct
            alert("Login successful!");
        }
    }
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
          <input type="password" placeholder="Your password" required onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
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
          <input type="text" placeholder="Your Address" required onChange={(e) => setSignupData({ ...signupData, address: e.target.value })} />
          <input type="password" placeholder="Your Password" required onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
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
          {
            userType === "client" && (
              <div>
                <label>Upload Picture:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "pictureBase64")} />
              </div>
            )
          }

          <button type="submit">SUBMIT</button>
        </form>
      )}
    </div>
  );
}

