import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectLoading from "./RedirectLoading";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current usser", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("admin error:", err);
          setOk(false);
        });
    }
  });

  return ok ? <Route {...rest} /> : <RedirectLoading />;
};

export default AdminRoute;
