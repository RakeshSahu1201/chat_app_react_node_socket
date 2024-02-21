import onlineIcon from "../../images/onlineIcon.png";

import "./UserContainer.css";

const UserContainer = ({ users, setTo }) => {
  const handleToClick = (e) => {
    const id = e.currentTarget.getAttribute("id");
    setTo(id);
  };
  return (
    <div className="textContainer">
      {users ? (
        <div className="user-container">
          <h3>Online Users</h3>
          <div className="activeContainer">
            <div>
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="activeItem"
                  id={user._id}
                  onClick={handleToClick}
                >
                  {user.name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserContainer;
