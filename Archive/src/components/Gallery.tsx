import { IPost } from '../helpers/types';
import { BASE } from '../helpers/default'
import { deletePost } from '../helpers/api';

interface Props {
    posts: IPost[]
    setPosts: (posts: IPost[]) => void,
}

export function Gallery({ posts, setPosts }: Props) {

    const handleDelete = (id: number) => {
        deletePost(id)
            .then(() => {
                setPosts(posts.filter(p => p.id !== id));
            });
    }

    return (
        <div className='list'>
            {
                posts.map(post => {
                    return <div key={post.id}>
                        <img
                            src={BASE + post.picture}
                        />
                        <p>{post.title}
                            <small>({post.likes.length} likes</small>)
                            <strong>
                                <button onClick={() => handleDelete(post.id)} className='btn btn-info'>Delete</button>
                            </strong>
                        </p>
                        <img
                            className='small-icon'
                            src="https://cdn4.iconfinder.com/data/icons/utilities-part-3/64/empty_heart-512.png"
                        />
                    </div>
                })
            }
        </div >
    )
}