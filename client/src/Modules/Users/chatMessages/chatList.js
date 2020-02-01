import React from "react";
import { List, Avatar } from "antd";
import moment from "moment";

const ChatList = (props) => {
  const { item, users } = props;
  console.log(props);
  
  return (
    <List.Item className={users.user.user_id === item.msg_from ? "right-msg" : "left-msg"}>
      <List.Item.Meta
      className="chat-msg"
        title={
          <span>
            {`${
              users.selectedChatRoom.user_name
              } (${moment(item.created_at).format(
                "hh:mm A"
              )}`})
          </span>
        }
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: item.message
            }}
          />
        }
      />
    </List.Item>
  );
};

export default ChatList;
