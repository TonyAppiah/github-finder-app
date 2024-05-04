import UserReposItem from "./UserReposItem";

const UserReposList = ({ userRepos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">Latest Repos</h2>
        {userRepos.map((repo) => (
          <UserReposItem key={repo.id} userRepo={repo} />
        ))}
      </div>
    </div>
  );
};

export default UserReposList;
