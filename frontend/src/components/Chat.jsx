import { createContext, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Context = createContext();

const Chat = () => {
  const [contacts, setContacts] = useState("");
  const [message, setMessage] = useState("");
  const [messageStore, setMessageStore] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const context = useContext(Context);

  // socket listerner events
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("logged user : ", user);

  context.socket.on("fetched_users", ({ users }) => {
    console.log("users ", users);
    setContacts(users);
  });

  context.socket.on("message_received", ({ newMessage }) => {
    setMessageStore([...messageStore, newMessage]);
  });

  console.log("message store", messageStore);

  // HANDLER WITH EMITING SOCKET EVENT

  const chatClickHandler = (e) => {
    console.log("to ", e.currentTarget.getAttribute("name"));
    setSelectedChat(e.currentTarget.getAttribute("name"));
  };

  const sendMessageHandler = (e) => {
    const newMessage = {
      fromMe: true,
      from: socket.id,
      to: selectedChat,
      message,
    };

    context.socket.emit("send_message", { message: newMessage });
  };

  const onChangeMessageHandler = async (e) => {
    setMessage(e.target.value);
  };

  const shortcutClickHandler = (e) => {};

  const handleFileChange = (e) => {};

  const closeChatHanlder = (e) => {};

  const closeContactHanlder = () => {};

  return (
    <div>
      (
      <Container fluid>
        <Row>
          <Col sm={6}>
            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={6}>This area is used for chat</Col>
        </Row>
        <Row>
          <Col>Enter you text : </Col>
          <Col>
            <input type="text" />
          </Col>
          <Col>
            <Button variant="info">Send</Button>
          </Col>
        </Row>
      </Container>
      );
    </div>
  );
};

export default Chat;
