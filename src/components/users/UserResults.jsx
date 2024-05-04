import { useEffect, useContext } from "react";
import Spinner from "../../Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

const UserResults = () => {
  const { users, isLoading, fetchUsers } = useContext(GithubContext);

  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_APP_GITHUB_URL}/users`,
  //     {
  //       headers: {
  //         Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
  //       },
  //     }
  //   );

  //   const data = await response.json();
  //   setUsers(data);
  //   setIsLoading(false);
  // };

  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
