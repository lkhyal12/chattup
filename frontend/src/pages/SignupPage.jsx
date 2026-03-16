import React, { useState } from "react";
import { useAuth } from "../../store/authStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Lock, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";
import { LoaderIcon } from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signUp(formData);
  }
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl h-[650px] md:w-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create accoount
                  </h2>
                  <p className="text-slate-400">Sign uo for a new account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* full name */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            fullName: e.target.value,
                          }))
                        }
                        className="input"
                        placeholder="abtech ab"
                      />
                    </div>
                  </div>
                  {/* email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        className="input"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <Lock className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            password: e.target.value,
                          }))
                        }
                        className="input"
                        placeholder="Enter Your Password"
                      />
                    </div>
                  </div>

                  {/* submit btn */}
                  <button
                    className="auth-btn text-center"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <div className="w-full  flex items-center justify-center">
                        <LoaderIcon className=" size-10 text-3xl animate-spin text-center block" />
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  {/* link */}
                  <div className="mt-6 text-center">
                    <Link to="/login" className="auth-link">
                      Already have an account? Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* illustration image */}
            <div className="hidden md:w-1/2 p-6 md:flex items-center justify-center bg-gradient-to-bl bg-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default SignupPage;
