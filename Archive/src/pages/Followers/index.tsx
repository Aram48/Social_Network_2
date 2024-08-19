import { useEffect, useState } from "react";
import { IUser } from "../../helpers/types";
import { getAllFollowers } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";

export const Followers = () => {

    const [followers, setFollowers] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllFollowers()
            .then(response => {
                if (response.status === "ok") {
                    setFollowers(response.payload as IUser[]);
                } else {
                    setError("Faild to load followers");
                }
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Followers</h1>
            {error && <p className="text-danger">{error}</p>}
            {
                followers.length > 0 ? (
                    <ul className="list-group">
                        {
                            followers.map(follower => (
                                <li key={follower.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={BASE + follower.picture || DEF}
                                        alt={follower.name}
                                        className="rounded-circle me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <span className="fw-bold">{follower.name} {follower.surname}</span>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p className="text-muted">You have no followers yet.</p>
                )}
        </div>
    );
};