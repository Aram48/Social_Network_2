import { useEffect, useState } from "react"
import { IUser } from "../../helpers/types"
import { getAllRequests, requestsAccept, requestsDecline } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";
import { Link } from "react-router-dom";

export const Requests = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllRequests()
            .then((response) => {
                if (Array.isArray(response.payload)) {
                    const userData = response.payload.map(
                        (item: { user: IUser }) => item.user
                    );
                    setUsers(userData);
                }
            });
    }, []);

    const handleAccept = (id: number | undefined) => {
        if (id !== undefined) {
            requestsAccept(id)
                .then(() => {
                    setUsers(users.filter(x => x.id !== id));
                });
        }
    }

    const handleDecline = (id: number | undefined) => {
        if (id !== undefined) {
            requestsDecline(id)
                .then(() => {
                    setUsers(users.filter(x => x.id !== id));
                });
        }
    }

    return (
        <div className="container mt-5">
            <h1>Requests</h1>
            {
                users.length > 0 ? (
                    <ul className="list-group">
                        {
                            users.map(user => (
                                <li key={user.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={user.picture ? BASE + user.picture : DEF}
                                        alt={user.name}
                                        className="rounded-circle me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <span className="fw-bold">{user.name} {user.surname}</span>
                                    <div className="ms-auto">
                                        <button onClick={() => handleAccept(user.id)} className="btn btn-outline-info me-2">Accept</button>
                                        <button onClick={() => handleDecline(user.id)} className="btn btn-outline-info me-2">Decline</button>
                                        <Link to={"/profile/" + user.id}  className="btn btn-outline-info me-2">Account</Link>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p className="text-muted">You have no follower requests yet.</p>
                )
            }
        </div>
    );
}