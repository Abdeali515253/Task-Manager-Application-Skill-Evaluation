import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { addTask, fetchTasks } from './features/taskSlice';
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const User = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const status = useSelector((state) => state.tasks.status);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);


    const handleSearch = (e) => {
        const searchText = e.target.value;
        setQuery(searchText);

        if (searchText) {
            const matches = fuse.search(searchText).map((result) => result.item);
            setResults(matches);
        } else {
            setResults(tasks); // Reset to full data when query is empty
        }
    };

    const fuse = new Fuse(tasks, {
        keys: ['title', 'description', 'createdBy'],
        threshold: 0.3,
    });

    useEffect(() => {
        getUserEmails();
    }, [])

    const getUserEmails = async () => {
        const endpoint = "http://localhost:3001";
        const response = await fetch(`${endpoint}/users`);
        const json = await response.json();
        setAllUsers(json);
    }

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (status === 'idle' && user) {
            dispatch(fetchTasks(user));
        }
    }, [dispatch, status, user])

    useEffect(() => {
        setResults(tasks);
    }, [tasks])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(assignedTo === ""){
            alert("assign task to someone to add")
            return
        }
        const newTask = { title, description, assignedTo, priority, dateCreated, createdBy: user.email };
        dispatch(addTask(newTask));
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [priority, setPriority] = useState('');
    const [dateCreated, setDateCreated] = useState('');

    return (
        <>
        {user ? (<div>
            {user.email}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">description:</label>
                        <input
                            type="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="assignedTo">Assigned to:</label>
                        <select
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value={""} />
                            {allUsers.map((aUser) => (
                                <option key={aUser.id} value={aUser.email}>
                                    {aUser.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="priority">priority</label>
                        <input
                            type="number"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dateCreated">dateCreated</label>
                        <input
                            type="date"
                            id="dateCreated"
                            value={dateCreated}
                            onChange={(e) => setDateCreated(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add Task</button>
                </form>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' &&
                    <>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={handleSearch}
                    />
                        {results.map((task) => (
                            <div key={task.id} style={{borderStyle: "solid", borderWidth: 1}}>
                                <h3>{task.title}</h3>
                                <p>{task.createdBy}</p>
                                <p>{task.description}</p>
                            </div>
                        ))}
                    </>
                }
                {status === 'failed' && <p>Error loading users.</p>}
        </div>) : (
            (<div>
                welcome please sign up or sign in to view tasks
            </div>)
        )}
        </>
    );
}

export default User;