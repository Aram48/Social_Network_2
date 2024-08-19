import { useEffect, useState } from "react"
import { IUser } from "../../helpers/types"
import { getAllFollowing } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";

export const Followings = () => {

    const [following, setFollowing] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllFollowing()
            .then(response => {
                if (response.status == "ok") {
                    setFollowing(response.payload as IUser[])
                } else {
                    setError("Faild to load followers");
                }
            })
    }, []);

    return <>
        <div className="container mt-5">
            <h1>Followings</h1>
            {error && <p className="text-danger">{error}</p>}
            {
                following.length > 0 ? (
                    <ul className="list-group">
                        {
                            following.map(follow => (
                                <li key={follow.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={BASE + follow.picture || DEF}
                                        alt={follow.name}
                                        className="rounded-circle me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <span className="fw-bold">{follow.name} {follow.surname}</span>
                                </li>)
                            )
                        }
                    </ul>
                ) : (
                    <p className="text-muted">You have no followers yet.</p>
                )}
        </div >
    </>
}