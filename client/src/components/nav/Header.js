import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  console.log(user);
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGGED_OUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login" className="float-right">
            Login
          </Link>
        </Item>
      )}

      {user && (
        <SubMenu icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
