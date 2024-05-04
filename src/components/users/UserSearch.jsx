import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

const UserSearch = () => {
  const [formText, setFormText] = useState("");

  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleFormChange = (e) => setFormText(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formText === "") {
      setAlert("Please enter search term", "error");
    } else {
      searchUsers(formText);

      setFormText("");
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 mb-8 gap-8">
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={formText || ""}
                onChange={handleFormChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-32 btn btn-lg btn-outline"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 ? (
        <div>
          <button onClick={clearUsers} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserSearch;
