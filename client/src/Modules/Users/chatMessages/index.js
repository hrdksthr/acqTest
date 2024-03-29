import React from "react";
import { Form, List, Divider } from "antd";
import moment from "moment";
import { observer } from "mobx-react";

import ChatList from "./chatList";
import ChatFooter from "./chatinput";

class ChatMessages extends React.Component {
  getHeading = (name) => {
    return name || '';
  };

  render() {
    const {
      users: {
        isChatFetching,
        selectedChatRoom,
        chatList
      },
    } = this.props;
    const { user_name } = selectedChatRoom;
    return (
      <List
        loading={isChatFetching}
        id="messagesBox"
        className="chat-messages"
        style={{
          height: "65vh"
        }}
        locale={{
          emptyText: "No Messages"
        }}
        header={
          <div>
            <h4>
              {`TO : 
                ${this.getHeading(user_name)}`}
            </h4>
          </div>
        }
        footer={
          <ChatFooter
            {...this.props}
          />
        }
        bordered
        dataSource={chatList}
        renderItem={item => <>{user_name && <ChatList  {...this.props} item={item} />} </>}
      />
    );
  }
}

export default Form.create()(observer(ChatMessages));
