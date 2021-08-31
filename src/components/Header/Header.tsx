import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectCurrentUserLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/authReducer";

// type authPropsType = {
//     login: string | null
//     isAuth: boolean
//     logout: () => void
// }


export const Header = () => {


    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();

    const logOutCallBack = () => {
        dispatch(logout())
    }

    const {Header} = Layout;
    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                    {isAuth
                        ? <>
                            <Col span={2}>
                                <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={4}>
                                <Button onClick={logOutCallBack}>Log Out</Button>
                            </Col>
                        </>
                        :
                        <Col span={6}>
                            <Link to={'/login'}>Login</Link>
                        </Col>
                    }
            </Row>
        </Header>

        /* <header className={classes.header}>
             <img className={classes.picture}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjG-JZ1vOhYl5GhS0900uggNYgE6M7qWYNmw&usqp=CAU'/>
             <div className={classes.loginBlock}>
                 {props.isAuth
                     ? <div>{props.login} - <button onClick={props.logout}>log out</button> </div>
                     : <NavLink to={'/login'}>Login</NavLink>}
             </div>
         </header>*/
    )
}

