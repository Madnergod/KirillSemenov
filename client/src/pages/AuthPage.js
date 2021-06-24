import React, {useContext, useEffect, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading,error, request ,clearError} = useHttp();
  const [form, setForm] = useState({
    email: "123",
    password: "123",
  });
  useEffect(()=>{
      message(error)
      clearError()
  },[error,message,clearError])
  //123
  useEffect(()=>{
    window.M.updateTextFields()
  },[])
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message)
    } catch (e) {}
  };
  const loginHandler = async ()=>{
    try {
      const data = await request("/api/auth/login", "POST", { ...form })
      auth.login(data.token,data.userId)
    }catch (e) {}

  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="row">
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Авторизация</span>
              <div className="input-field">
                <input
                  placeholder="email"
                  id="email"
                  type="text"
                  className="yellow-input"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="password"
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="card-action">
              <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>
                Войти
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >
                регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
