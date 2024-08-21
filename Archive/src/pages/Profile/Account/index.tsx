import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { follow, getAccount, unfollow, cancelRequest } from "../../../helpers/api"
import { IAccount, IContext } from "../../../helpers/types"
import { BASE, DEF } from "../../../helpers/default"
import { Gallery } from "../../../components/Gallery"

export const Account = () => {

    const { id } = useParams()
    const { account } = useOutletContext<IContext>();
    const [userAccount, setUserAccount] = useState<IAccount | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getAccount(id)
                .then(response => {
                    if (!response.payload || response.status == 'error') {
                        navigate('/profile')
                    } else {
                        setUserAccount(response.payload as IAccount)
                    }
                })
        }
    }, [id])

    const handlePostUpdate = (id: number) => {
        if (userAccount) {
            setUserAccount({
                ...userAccount,
                posts: userAccount.posts.map(post => {
                    if (post.id != id) {
                        return post
                    }
                    post.isLiked = !post.isLiked
                    if (!post.isLiked) {
                        post.likes = post.likes.filter(a => a.id != account.id)
                    } else {
                        post.likes.push(account)
                    }
                    return post

                })
            })

        }
    }

    const followUser = () => {
        if (userAccount?.id) {
            follow(userAccount.id)
                .then(response => {
                    if (response.status == 'following') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, following: true },
                            followers: (userAccount.followers || []).concat(response.payload as IAccount)
                        })
                    } else if (response.status == 'requested') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, requested: true }
                        })
                    }
                })
        }
    }

    const unfollowUser = () => {
        if (userAccount?.id) {
            unfollow(userAccount.id)
                .then(response => {
                    if (response.status == 'unfollowed') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, following: false },
                            followers: userAccount.followers?.filter(
                                (follower) => follower.id !== (response.payload as IAccount).id
                            ),
                        })
                    }
                })
        }
    }

    const cancelFollowRequest = () => {
        if (userAccount?.id) {
            cancelRequest(userAccount.id)
                .then(response => {
                    if (response.status == 'cancelled') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, requested: false }
                        })
                    }
                })
        }
    }

    const handleFollow = () => {
        if (userAccount && userAccount.id) {
            if (userAccount.connection.following) {
                unfollowUser()
            } else if (userAccount.connection.requested) {
                cancelFollowRequest()
            } else {
                followUser()
            }

        }
    }

    return userAccount && <>
        <div className="container mt-5 mb-5">
            <div className="row no-gutters">
                <div className="col-md-4 col-lg-4">
                    <img
                        style={{ width: "600px", height: "550px" }}
                        src={
                            userAccount.picture ?
                                BASE + userAccount.picture
                                :
                                DEF
                        }
                    />
                </div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 className="display-5">{userAccount.name} {userAccount.surname}</h3><i className="fa fa-facebook"></i><i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i></div>
                        <div className="p-3 bg-black text-white">
                            <img
                                className="icon"
                                src={
                                    userAccount.isPrivate
                                        ? "https://cdn0.iconfinder.com/data/icons/leto-ui-generic-1/64/leto-44-512.png"
                                        : "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-open-alt-512.png"
                                }
                            />
                            <button
                                onClick={handleFollow}
                                className="btn btn-outline-primary">
                                {
                                    userAccount.connection.requested ?
                                        "requested"
                                        :
                                        userAccount.connection.followsMe ?
                                            "follow back"
                                            :
                                            userAccount.connection.following ?
                                                "unfollow"
                                                :
                                                "follow"
                                }
                            </button>
                        </div>
                        <div className="d-flex flex-row text-white">
                            <div className="p-4 bg-primary text-center skill-block">
                                <h4>{userAccount.followers?.length || 0}</h4>
                                <h6>followers</h6>
                            </div>
                            <div className="p-3 bg-success text-center skill-block">
                                <h4>{userAccount.following?.length || 0}</h4>
                                <h6>following</h6>
                            </div>
                            <div className="p-3 bg-danger text-center skill-block">
                                <h4>{userAccount.posts?.length || 0} </h4>
                                <h6>posts</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            userAccount.isPrivate == 0 &&
            <Gallery
                posts={!userAccount.posts ? [] : userAccount.posts}
                onUpdate={handlePostUpdate}
            />
        }
    </>
}
