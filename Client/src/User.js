import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useLocation, NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";
import { UsersContext } from "./UsersContext";
import { SearchBar } from "./Header";
import Loading from "./Loading";

const Search = () => {
  const { currentUser, followAction, setFollowAction } =
    useContext(CurrentUserContext);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const imported = useParams();
  console.log(imported);
  const searchInput = Object.values(imported)[0];
  console.log(searchInput);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    fetch(`/pseudo/${searchInput}`)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data === "Not Found") {
          console.log("Not Found");
        } else {
          console.log(data);
          setUser(data.data);
          setUserId(data.data._id);
          console.log(user);
        }
      })
      .catch((err) => {
        // setStatus("error");
      });
  }, []);

  const handleClickFollow = () => {
    let type = "";
    console.log(userId);
    if (isFollowed) {
      type = "unfollow";
      setFollowAction({ isFollowed: "follow", userId: userId });
      console.log(`This is ${user.id}`);
    } else {
      type = "follow";
      setFollowAction({ isFollowed: "like", userId: userId });
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type }),
    };
    fetch(`/following/${currentUser._id}`, requestOptions)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        // setCurrentUser(data);
        setIsFollowed(!isFollowed);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      verifyFollow();
    }
  }, [currentUser, imported]);

  const verifyFollow = () => {
    if (!currentUser || currentUser.following === []) {
      setIsFollowed(false);
    } else {
      const usersFollowed = currentUser.following;
      usersFollowed.forEach((person) => {
        console.log();
        if (person === userId) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      });
    }
  };

  return (
    <Page>
      <Title>Votre recherche : {searchInput}</Title>
      <User>
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={`/profile/${user._id}`}
        >
          <div>
            {" "}
            <Pseudo>{user.pseudo}</Pseudo>
            <Avatar src={user.avatar} />
          </div>
        </NavLink>
        <button onClick={handleClickFollow}>
          {!isFollowed ? "Follow " : "UnFollow "}
          user
        </button>
      </User>
    </Page>
  );
};

const Page = styled.div`
  min-height: 750px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-left: 30px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pseudo = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  width: 200px;
  /* background-color: red; */
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
export default Search;
