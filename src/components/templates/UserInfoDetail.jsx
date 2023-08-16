const UserInfo = ({ user }) => {
    return (
        <div>
        <h1>{user.name}</h1>
        <h3>Added blogs</h3>
        <ul>
            {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
            ))}
        </ul>
        </div>
    );
    }
export default UserInfo;