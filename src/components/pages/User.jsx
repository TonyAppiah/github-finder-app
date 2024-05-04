import {
  FaStore,
  FaUserFriends,
  FaUsers,
  FaTwitter,
  FaMapMarkerAlt,
  FaGlobe,
  FaCode,
} from "react-icons/fa";
import { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../Spinner";
import UserReposList from "../users/UserReposList";

const User = () => {
  const { user, getUser, isLoading, getUserRepos, userRepos } =
    useContext(GithubContext);
  const params = useParams();

  useEffect(() => {
    getUser(params.login);
    getUserRepos(params.login);
  }, []);

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn">
            Back To Search
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-lg card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title">{name}</h2>
                <h6>{login}</h6>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>

            <div className="w-full rounded-lg shadow-md bg-base-100 stats">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="text-lg stat-value">{location}</div>
                </div>
              )}
              {blog && (
                <div className="stat">
                  <div className="stat-title text-md">
                    <FaGlobe />
                  </div>
                  <div className="text-lg stat-value">
                    <Link
                      to={`https://${blog}`}
                      target="_blank"
                      rel="norefferer"
                    >
                      {blog}
                    </Link>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">
                    <FaTwitter />
                  </div>
                  <div className="text-lg stat-value">
                    <Link
                      to={`https://twitter.com/${twitter_username}`}
                      target="_blank"
                      rel="norefferer"
                    >
                      {twitter_username}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure">
              <FaUsers className="text-3xl md:text-5xl" color="gray" />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl">{followers}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <FaUserFriends className="text-3xl md:text-5xl" color="gray" />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl">{following}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <FaCode className="text-3xl md:text-5xl" color="gray" />
            </div>
            <div className="stat-title pr-5">Public Repos</div>
            <div className="stat-value pr-5 text-3xl">{public_repos}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <FaStore className="text-3xl md:text-5xl" color="gray" />
            </div>
            <div className="stat-title pr-5">Public Gists</div>
            <div className="stat-value pr-5 text-3xl">{public_gists}</div>
          </div>
        </div>

        <UserReposList userRepos={userRepos} />
      </div>
    </>
  );
};

export default User;
