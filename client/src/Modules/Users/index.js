import React from "react";
import { Button, Layout, Typography, List, Spin, Input } from "antd";
import { observer } from "mobx-react";
import ChatList from "./chatMessages";
import "./users.css";

const { Paragraph } = Typography;
const { Header, Sider, Content } = Layout;
@observer
class UsersComponent extends React.Component {
    render() {
        const {
            users: {
                addNewMessage,
                userListFetching,
                chatUsers,
                onChangeUser,
                viewInput,
                selectedChatRoom,
                handleAddChatUser,
                handleChangeUserId,
                reload,
                onChangeUserName,
                user
            },
        } = this.props;

        return <Spin spinning={ reload }>
            { !reload && <div style={ {
                padding: "0px 150px"
            } }>
                <Layout>
                    <Header style={ { background: "#aad3fb" } }>
                        <strong> { user.user_id } </strong>
                        <Paragraph style={ {
                            display: "inline-block",
                            padding: "0px 30px"
                        } } 
                        editable={{ onChange: onChangeUserName }}>
                        { user.user_name }</Paragraph>
                        {viewInput && (
                            <span style={{ display: "inline-block" }}>
                            <Input onChange={e => handleChangeUserId(e.target.value)}/>
                            </span>
                        )}
                            
                            {viewInput && <Button onClick={e => handleAddChatUser()}> Add User</Button>}
                        <Button onClick={(e) => addNewMessage(e)} > {!viewInput ? "Add Message"  : "cancel" } </Button>
                    </Header>
                    <Layout>
                        <Sider style={{ background: "#ffffff" }}>
                            <List
                                size="small"
                                bordered
                                loading={ userListFetching }
                                dataSource={ chatUsers }
                                renderItem={ item => <List.Item
                                    onClick={() => onChangeUser(item)}
                                    ><div> {item.user_name} </div></List.Item> }
                            />
                        </Sider>
                        <Content>{
                            (selectedChatRoom && selectedChatRoom.user_id) && 
                            <ChatList { ...this.props } />
                        }</Content>
                    </Layout>
                    <Layout>

                    </Layout>
                </Layout>
            </div>
            }
        </Spin>
    }
}

export default UsersComponent