import { createContext, useState, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  const initialState = {
    users: [],
    user: {},
    userRepos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //for getting search results
  const searchUsers = async (formText) => {
    isLoading();

    const params = new URLSearchParams({
      q: formText,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    // setUsers(data);
    // setIsLoading(false);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get single user
  const getUser = async (login) => {
    isLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //for getting  user top repositories
  const getUserRepos = async (login) => {
    isLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  //clear users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //set isLoading function
  const isLoading = () => dispatch({ type: "SET_ISLOADING" });

  return (
    <GithubContext.Provider
      value={{
        // users: state.users,
        // isLoading: state.isLoading,
        // user: state.user,
        // userRepos: state.userRepos,
        // instead of the four lines of code above '...state' below
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
