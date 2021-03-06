import React, { useState, useEffect } from "react";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { auth, googleAuthProvider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("yves.loeys@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const redirectByRole = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER_REQUEST",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          redirectByRole(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER_REQUEST",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            redirectByRole(res);
          })
          .catch();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="submit"
        className="mb-3"
        shape="round"
        block
        icon={<MailOutlined />}
        disabled={!email || password.length < 6}
      >
        Login with email/password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>Loading..</h4> : <h4>Login</h4>}

          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            shape="round"
            block
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger mt-2">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
