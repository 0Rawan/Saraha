import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  const [user, setUser] = useState({email: "",password: ""});
  const [loginError,setLoginError] = useState('')

  const [errList, setErrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("success");

  let navigate = useNavigate();

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  }

  async function Login() {
    try 
    {
      setLoading(true);
      let { data } = await axios.post("https://sarahabackend.onrender.com/user/signin", user);
      setLoading(false);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("isAdmin", data.user.isAdmin);
        localStorage.setItem("name", data.user.name);
        setError("success");
        setLoginError("fffffff")
        navigate("/");
      }
      else
      {
        setLoginError("Incorrect email or password or email may be not verified")
      }
      
    } 
    catch (error) 
    {
        setLoginError("Incorrect email or password or email may be not verified")
    }
    
    
      
  }

  function validateLoginData() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).required()
    });

    return schema.validate(user, { abortEarly: false });
  }

  function submitLoginForm(e) {
    //setLoading(true);
    e.preventDefault();
    let validation = validateLoginData();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
    } else {
      Login();
    }
  }

  return (
    <>
      <div>
      <div className='mx-auto mt-5' style={{width:"fit-content"}}>
    {errList.map((detail, index) => (
      
        <div className='text-danger' key={index}>{detail.message}</div>
      ))}
      </div>
        <div className="w-100 mt-5 d-flex justify-content-center align-items-center">
          <form onSubmit={submitLoginForm} className="w-100 w-input px-5">
            <p className="fs-4 fw-bold">{t("Login")}</p>
            <hr className="w-input px-5 mx-auto mb-5" />
            <input
              onChange={getUserData}
              type="email"
              className="form-control w-100 mx-auto my-3"
              name="email"
              placeholder={t("email")}
            />
            <input
              onChange={getUserData}
              type="password"
              className="form-control w-100 mx-auto my-3"
              name="password"
              placeholder={t("password")}
            />
            {loading ? 
            <button className="bg-main w-100 rounded-5 py-2 sign " disabled> {t("Loading")}</button>
            : 
            <button className="bg-main w-100 rounded-5 py-2 sign">{t("LoginBtn")}  </button>
            }
            
            <p className="text-danger fs-6 text-center pt-1">{loginError}</p>
            <p className="pt-2 text-secondary text-center">
              {t("forgetPassword")}
            </p>
            <p className="pb-2 text-secondary text-center">
              {t("don'tHaveAccount")}{" "}
              <Link className="text-decoration-none text-main" to="/register">
                {t("SignUpNow")}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
