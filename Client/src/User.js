import React, { useContext, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import styled from "styled-components";
import { UsersContext } from "./UsersContext";
import { SearchBar } from "./Header";
import Loading from "./Loading";

const useQuery = () => {
  return new URLSearchParams(useLocation().pseudo);
};

const Search = () => {
  const { users, setUsers, setUsersStatus, usersStatus } =
    useContext(UsersContext);

  const searchName = useQuery().get("name");
  console.log(searchName);

  const [searchItems, setSearchItems] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");

  useEffect(() => {
    setSearchStatus("loading");
    if (users.length > 0) {
      console.log(users.length);
      const filteredItems = users.filter((item) => {
        return item.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
      });
      setSearchItems(filteredItems);
      console.log(filteredItems.length);
    }
    setUsersStatus("idle");
  }, [users]);

  return (
    <Wrapper>
      <SearchBar />
      {searchStatus === "loading" || usersStatus === "loading" ? (
        <Loading />
      ) : searchItems.length > 0 ? (
        <div>
          <Header>Search Results</Header>
          <AllItemsWrapper>
            {searchItems.map((item) => {
              return <ItemBlock item={item} key={item._id} />;
            })}
          </AllItemsWrapper>
        </div>
      ) : (
        <Header>No matches found</Header>
      )}
    </Wrapper>
  );
};

const ItemBlock = ({ item }) => {
  const { imageSrc, name, numInStock, price, _id } = item;

  return (
    <ItemWrapper to={`items/${_id}`}>
      <ItemImg src={imageSrc} alt="item-pic"></ItemImg>
      <ItemName>{name}</ItemName>
      <div>
        <div>{price}</div>
        <ItemStock className={numInStock === 0 ? "red" : ""}>
          {numInStock === 0 ? (
            <div>Out of Stock</div>
          ) : (
            <div>In Stock: {numInStock}</div>
          )}
        </ItemStock>
      </div>
    </ItemWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Header = styled.h1`
  align-self: flex-start;
  width: 15rem;
  font-size: 24px;
  padding-bottom: 10px;
  margin: 1rem;
  border-bottom: 1px solid black;
`;

const AllItemsWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

// Individual Items

const ItemWrapper = styled(NavLink)`
  width: 250px;
  margin: 10px 1rem;
  padding: 1rem 1rem;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  text-decoration: none;
  cursor: pointer;
  color: black;
  background-color: var(--steel-blue);
  &:hover {
    background-color: var(--steel-blue);
  }
`;

const ItemImg = styled.img`
  height: 150px;
  padding-bottom: 2rem;
  align-self: center;
`;

const ItemName = styled.div`
  font-weight: bold;
  margin-bottom: auto;
  padding-bottom: 10px;
  justify-self: flex-start;
`;

const ItemStock = styled.div`
  justify-self: flex-end;

  &.red {
    color: red;
  }
`;

export default Search;
