import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const socket = io("http://localhost:5000");

const Home = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [to, setTo] = useState("");
  const [messageStore, setMessageStore] = useState([]);

  socket.on("fetched_users", ({ contacts }) => {
    const filter_users = contacts?.filter((user) => user !== email);
    setUsers(filter_users);
  });

  socket.on("chat_by_id", ({ chats, conversation_list }) => {
    setMessageStore(chats);
    console.log("conversation LIst ", conversation_list);
  });

  useEffect(() => {
    socket.on("message_received", ({ newMessage }) => {
      setMessageStore([...messageStore, newMessage]);
    });
  }, [messageStore]);

  const sendMessageHandler = () => {
    const create_message = {
      from: email,
      to,
      body: message,
    };
    socket.emit("send_message", { message: create_message });
    setMessage("");
  };

  const selectUserClickHandler = (e) => {
    const to = e.currentTarget.getAttribute("name");
    setTo(to);
    socket.emit("get_chat_by", { from: email, to });
  };

  const createUserButton = () => {
    socket.emit("create_user", { user: email });
  };

  return (
    <Container fluid className="bg-light">
      <Row>
        <Col>
          {" "}
          <h1 className="text-center">Single chat app</h1>
        </Col>
        <Col>
          Enter email :{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <Button onClick={createUserButton}>Create</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={4}>
          {" "}
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            {users?.map((user, index) => (
              <ListGroup.Item
                key={index}
                name={user}
                onClick={selectUserClickHandler}
              >
                {user}
              </ListGroup.Item>
            ))}
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          {to && (
            <>
              <ListGroup.Item>Message to : {to}</ListGroup.Item>
              {messageStore?.map((msg, index) =>
                msg.from === email ? (
                  <ListGroup.Item key={index} className="text-end">
                    {msg.body}
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item key={index}>{msg.body}</ListGroup.Item>
                )
              )}
            </>
          )}
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={4}>
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Button variant="info" onClick={sendMessageHandler}>
            Send Message
          </Button>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
