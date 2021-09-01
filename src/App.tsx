import React from 'react';
import './App.css';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./components/Login/LoginHookForm";
import {connect, Provider} from "react-redux";
import store, {RootReduxState} from "./redux/reduxStore";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from "./hoc/WithSuspense";
import {UsersPage} from "./components/Users/UsersPage";
import 'antd/dist/antd.css';

import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {Header} from "./components/Header/Header";

const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;




export type mapStateToPropsType = {
    initialized: boolean
}

export type authOwnPropsType = {
    initializeApp: () => void
}

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));


class App extends React.Component<authOwnPropsType & mapStateToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {


        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>

                <Layout>
                    <Header/>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                   /* defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}*/
                                    style={{ height: '100%' }}
                                >
                                   <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                        <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                        <Menu.Item key="3"><Link to="/dialogs" >Messages</Link></Menu.Item>
                                        <Menu.Item key="4"><Link to="/login" >Login</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                        <Menu.Item key="5"><Menu.Item key="2"><Link to="/developers" >Developers</Link></Menu.Item></Menu.Item>
                                    </SubMenu>

                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>

                                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

                                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>

                                    <Route path='/developers' render={() => <UsersPage pageTitle={'Samurai'}/>} />

                                    <Route path='/login' render={() => <Login/>}/>

                                    <Route path='*' render={() => <div>
                                        404 not found</div>}/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2021 Created by IT-Kamasutra Mentors Team</Footer>
                </Layout>,
            </BrowserRouter>);
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => ({
    initialized: state.initialization.initialized
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}
export default MainApp;
