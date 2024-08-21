import { useEffect, useState } from "react"
import { IUser } from "../../helpers/types"
import { getAllRequests, requestsAccept, requestsDecline } from "../../helpers/api";
import { BASE, DEF } from "../../helpers/default";
import { Link, useNavigate } from "react-router-dom";

export const Requests = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

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
                    navigate("/profile/followers");
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
                                        <Link to={"/profile/" + user.id} className="btn btn-outline-info me-2">Account</Link>
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


// import { useEffect, useState } from "react"
// import { IUser } from "../../helpers/types"
// import { Link, useNavigate } from "react-router-dom"
// import { BASE } from "../../helpers/default"
// import { getAllRequests, requestsAccept, requestsDecline } from "../../helpers/api"


// export const Request = () => {

//     const [request, setRequest] = useState<IUser[]>([])
//     const navigate = useNavigate()

//     useEffect(() => {
//         getAllRequests()
//             .then(response => {
//                 setRequest(response.payload as IUser[])
//             })
//     }, [])

//     const handleAccept = (reqId: number) => {

//         requestsAccept(reqId)
//             .then((res) => {

//                 console.log(res)
//             })
//         navigate('/profile/followers')
//     }
//     const handleDecline = (reqId: number) => {
//         requestsDecline(reqId)
//             .then(() => {
//                 setRequest(prevReq => prevReq.filter(req => req.id !== reqId))
//             })
//     }
//     return <div className="container">
//         <h1>Requests</h1>
//         {
//             request.map(request => {
//                 return <div key={request.id}>
//                     <br />
//                     <img
//                         src={BASE + request.user?.picture}
//                         width='150px'
//                         height='160px'
//                     />
//                     {/* <p>{request.user.name} {request.user?.surname} <Link to={'/profile/' + request.user?.id}>account</Link> </p> */}
//                     <button onClick={() => handleAccept(request.id as number)} className="btn btn-primary btn-sm btn-accept">accept</button>
//                     <button onClick={() => handleDecline(request.id as number)} className="btn btn-primary btn-sm btn-decline">decline</button>

//                 </div>
//             })
//         }
//     </div>
// }

