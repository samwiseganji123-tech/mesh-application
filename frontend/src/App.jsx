import { useState } from "react";
import {
  Home,
  Search,
  MessageCircle,
  Bell,
  UserRound,
  Settings,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Image as ImageIcon,
  Send,
  Users,
  Compass,
} from "lucide-react";

import "./App.css";

const initialPosts = [
  {
    id: 1,
    name: "Alex Morgan",
    username: "alexmorgan",
    avatar: "A",
    color: "#7c6cf2",
    time: "15 minutes ago",
    text: "Just finished working on my latest project! 🚀 Building something new every day is such a rewarding experience.",
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahcodes",
    avatar: "S",
    color: "#e879a9",
    time: "1 hour ago",
    text: "Reminder: You don't have to know everything to start. Keep learning, keep building, and trust the process. 💜",
    likes: 56,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    name: "David Wilson",
    username: "davidwilson",
    avatar: "D",
    color: "#269c91",
    time: "3 hours ago",
    text: "What technologies are you currently learning? I'm exploring backend development with Node.js and MongoDB. Let's connect!",
    likes: 18,
    comments: 5,
    liked: false,
  },
];

const suggestions = [
  { name: "Emma Williams", username: "emmaw", avatar: "E", color: "#df8c55" },
  { name: "Michael Chen", username: "mchen", avatar: "M", color: "#568ed9" },
  { name: "Olivia Brown", username: "oliviab", avatar: "O", color: "#bb76c9" },
];

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [search, setSearch] = useState("");

  function createPost(event) {
    event.preventDefault();

    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      name: "Sam",
      username: "sam_dev",
      avatar: "S",
      color: "#6d5dfc",
      time: "Just now",
      text: newPost.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts((currentPosts) => [post, ...currentPosts]);
    setNewPost("");
    setActivePage("Home");
  }

  function toggleLike(postId) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    );
  }

  function toggleFollow(username) {
    setFollowedUsers((current) =>
      current.includes(username)
        ? current.filter((user) => user !== username)
        : [...current, username]
    );
  }

  const visiblePosts = posts.filter((post) => {
    const term = search.toLowerCase();

    return (
      post.text.toLowerCase().includes(term) ||
      post.name.toLowerCase().includes(term) ||
      post.username.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          href="#home"
          className="brand"
          onClick={() => setActivePage("Home")}
        >
          <span className="brand-icon">C</span>
          <span>Connect</span>
        </a>

        <div className="profile-mini">
          <div className="avatar my-avatar">S</div>
          <div>
            <strong>Sam</strong>
            <span>@sam_dev</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="nav-label">MENU</p>

          {[
            { name: "Home", icon: Home },
            { name: "Explore", icon: Compass },
            { name: "Messages", icon: MessageCircle },
            { name: "Notifications", icon: Bell },
            { name: "Profile", icon: UserRound },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${
                activePage === name ? "active" : ""
              }`}
              onClick={() => setActivePage(name)}
            >
              <Icon size={20} />
              <span>{name}</span>
              {name === "Notifications" && (
                <span className="notification-dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <div className="sidebar-note">
            <Users size={21} />
            <strong>Good things happen when we connect.</strong>
            <p>Share your journey with the community.</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-icon">C</span>
            <strong>Connect</strong>
          </div>

          <label className="search-box">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search posts and people..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button
            className="icon-button top-notification"
            aria-label="Notifications"
            onClick={() => setActivePage("Notifications")}
          >
            <Bell size={21} />
          </button>

          <button
            className="top-profile"
            onClick={() => setActivePage("Profile")}
          >
            <span className="avatar small-avatar">S</span>
            <span>Sam</span>
          </button>
        </header>

        <div className="content-grid">
          <section className="feed-column">
            {activePage === "Home" && (
              <>
                <div className="welcome-section">
                  <div>
                    <p className="eyebrow">YOUR COMMUNITY</p>
                    <h1>Your daily feed</h1>
                    <p>Discover what's happening in your world.</p>
                  </div>
                  <span className="welcome-emoji">👋</span>
                </div>

                <form className="composer card" onSubmit={createPost}>
                  <div className="composer-top">
                    <div className="avatar my-avatar">S</div>

                    <textarea
                      placeholder="What's on your mind, Sam?"
                      value={newPost}
                      onChange={(event) => setNewPost(event.target.value)}
                      maxLength={2000}
                      aria-label="Write a post"
                    />
                  </div>

                  <div className="composer-bottom">
                    <span className="composer-hint">
                      <ImageIcon size={17} />
                      Share something with your community
                    </span>

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={!newPost.trim()}
                    >
                      <Send size={16} />
                      Publish
                    </button>
                  </div>
                </form>

                <div className="feed-heading">
                  <h2>Latest posts</h2>
                  <span>{visiblePosts.length} posts</span>
                </div>

                {visiblePosts.length === 0 && (
                  <div className="empty-state card">
                    <Search size={30} />
                    <h3>No posts found</h3>
                    <p>Try searching for another name or keyword.</p>
                  </div>
                )}

                <div className="posts-list">
                  {visiblePosts.map((post) => (
                    <article className="post-card card" key={post.id}>
                      <div className="post-header">
                        <div
                          className="avatar"
                          style={{ backgroundColor: post.color }}
                        >
                          {post.avatar}
                        </div>

                        <div className="post-author">
                          <strong>{post.name}</strong>
                          <span>
                            @{post.username} · {post.time}
                          </span>
                        </div>

                        <button
                          className="more-button"
                          aria-label="Post options"
                        >
                          ···
                        </button>
                      </div>

                      <p className="post-text">{post.text}</p>

                      <div className="post-actions">
                        <button
                          className={`action-button ${
                            post.liked ? "liked" : ""
                          }`}
                          onClick={() => toggleLike(post.id)}
                          aria-label="Like post"
                        >
                          <Heart
                            size={19}
                            fill={post.liked ? "currentColor" : "none"}
                          />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          className="action-button"
                          onClick={() =>
                            alert(
                              "Comment functionality will be connected to the backend."
                            )
                          }
                        >
                          <MessageSquare size={19} />
                          <span>{post.comments}</span>
                        </button>

                        <button
                          className="action-button share-button"
                          onClick={() =>
                            navigator.clipboard
                              ?.writeText(post.text)
                              .then(() => alert("Post text copied!"))
                              .catch(() =>
                                alert("Unable to copy this post.")
                              )
                          }
                        >
                          <Share2 size={18} />
                          <span>Share</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activePage === "Profile" && (
              <section className="card page-panel">
                <div className="profile-cover" />
                <div className="profile-detail-avatar">S</div>
                <h1>Sam</h1>
                <p className="muted">@sam_dev</p>
                <p>
                  Software developer passionate about building useful
                  applications and connecting with people.
                </p>

                <div className="profile-stats">
                  <div>
                    <strong>{posts.length}</strong>
                    <span>Posts</span>
                  </div>
                  <div>
                    <strong>{followedUsers.length}</strong>
                    <span>Following</span>
                  </div>
                </div>

                <button
                  className="primary-button"
                  onClick={() =>
                    alert("Profile editing will be connected to the backend.")
                  }
                >
                  <UserRound size={17} />
                  Edit profile
                </button>
              </section>
            )}

            {activePage === "Explore" && (
              <section className="page-panel">
                <h1>Explore</h1>
                <p className="muted">
                  Search for people and discover posts from the community.
                </p>
                <label className="search-box explore-search">
                  <Search size={19} />
                  <input
                    placeholder="Search the community..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>

                <h2>Discover posts</h2>
                {visiblePosts.map((post) => (
                  <article className="card explore-post" key={post.id}>
                    <strong>{post.name}</strong>
                    <p>{post.text}</p>
                  </article>
                ))}
              </section>
            )}

            {activePage === "Messages" && (
              <section className="card page-panel">
                <MessageCircle size={36} className="panel-icon" />
                <h1>Your messages</h1>
                <p>
                  Your conversations will appear here when messaging is
                  connected to the backend.
                </p>
                <p className="muted">
                  The next development phase will implement real messaging.
                </p>
              </section>
            )}

            {activePage === "Notifications" && (
              <section className="card page-panel">
                <Bell size={36} className="panel-icon" />
                <h1>Notifications</h1>
                <p>
                  You're all caught up! Notifications will be connected to
                  the backend in a later phase.
                </p>
              </section>
            )}

            {activePage === "Settings" && (
              <section className="card page-panel">
                <Settings size={36} className="panel-icon" />
                <h1>Settings</h1>
                <p>Manage your account preferences.</p>
                <p className="muted">
                  Account security and privacy settings will be implemented
                  with authentication.
                </p>
              </section>
            )}
          </section>

          <aside className="right-column">
            <section className="card community-card">
              <div className="section-title">
                <h2>People to follow</h2>
                <Users size={19} />
              </div>

              {suggestions.map((person) => {
                const isFollowing = followedUsers.includes(person.username);

                return (
                  <div className="suggestion" key={person.username}>
                    <div
                      className="avatar"
                      style={{ backgroundColor: person.color }}
                    >
                      {person.avatar}
                    </div>

                    <div className="suggestion-info">
                      <strong>{person.name}</strong>
                      <span>@{person.username}</span>
                    </div>

                    <button
                      className={`follow-button ${
                        isFollowing ? "following" : ""
                      }`}
                      onClick={() => toggleFollow(person.username)}
                    >
                      {isFollowing ? "Following" : <Plus size={17} />}
                    </button>
                  </div>
                );
              })}
            </section>

            <section className="card opportunity-card">
              <span className="opportunity-icon">✦</span>
              <h2>Grow your network</h2>
              <p>
                Connect with creators, share your skills, and discover
                opportunities.
              </p>
              <button
                className="text-button"
                onClick={() => setActivePage("Explore")}
              >
                Explore community →
              </button>
            </section>

            <footer className="site-footer">
              <p>About · Community · Privacy</p>
              <p>© 2026 Project Connect</p>
              <span>Built to bring people together.</span>
            </footer>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;