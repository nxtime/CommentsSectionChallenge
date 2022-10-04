import { memo, useState } from "react"
import { userSavePoint } from "../../store/userSavePoint";
import Modal from "../Molecules/Modal";

const Comment = ({ data }: any) => {
    const { currentUser, deleteCommentById } = userSavePoint((state) => state) as any;
    const [confirmation, setConfirmation] = useState<string>('none');

    return (
        <>
            {
                confirmation === 'asking' &&
                <Modal>
                    <div className="bg-white p-6 flex flex-col gap-4 w-11/12 rounded-xl">
                        <h2 className="text-xl font-bold text-gray-800">Delete comment</h2>
                        <p className="text-lg text-gray-600">Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                        <div className="flex justify-evenly">
                            <button
                                className="py-3 px-5 font-medium bg-gray-500 text-gray-100 rounded-lg self-center"
                                onClick={() => setConfirmation('none')}
                            >
                                NO, CANCEL
                            </button>
                            <button
                                className="py-3 px-5 font-medium bg-red-500 text-gray-100 rounded-lg self-center"
                                onClick={() => deleteCommentById(data.id, data.replyingTo)}
                            >
                                YES, DELETE
                            </button>
                        </div>
                    </div>
                </Modal>
            }
            <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-white">
                    <header className="flex gap-4 items-center">
                        <img className="w-8 h-8" src={data.user.image.png} alt={data.user.username} />
                        <a href="#" className="font-medium text-gray-700">{data.user.username}</a>
                        {
                            currentUser.username === data.user.username
                            && <span className="px-1 rounded-sm bg-indigo-800 text-white">you</span>
                        }
                        <span className="text-gray-500">{data.createdAt}</span>
                    </header>
                    <main className="p-2">
                        <p className="text-gray-600">
                            {
                                data?.replyingTo
                                && <a href="#" className="text-indigo-800 font-medium">@{data?.replyingTo} </a>
                            }
                            {data.content}
                        </p>
                    </main>
                    <footer className="flex justify-between">
                        <div className="flex bg-indigo-50 max-w-fit rounded-xl overflow-hidden">
                            <button className="px-3">
                                <img className="self-center" src="images/icon-plus.svg" alt="Up Score" />
                            </button>
                            <span className="text-indigo-700 font-medium p-2">{data.score}</span>
                            <button className="px-3">
                                <img className="self-center" src="images/icon-minus.svg" alt="Down Score" />
                            </button>
                        </div>
                        {
                            currentUser.username === data.user.username
                                ?
                                <div className="flex gap-4 font-medium">
                                    <button
                                        onClick={() => setConfirmation('asking')}
                                        className="flex items-center gap-2"
                                    >
                                        <img src="images/icon-delete.svg" alt="Delete Comment" />
                                        <span className="text-red-500">Delete</span>
                                    </button>
                                    <button className="flex items-center gap-2">
                                        <img src="images/icon-edit.svg" alt="Edit Comment" />
                                        <span className="text-indigo-700">Edit</span>
                                    </button>
                                </div>
                                :
                                <button className="flex items-center gap-2 text-indigo-700 font-medium">
                                    <img src="images/icon-reply.svg" alt="Reply Icon" />
                                    <span>Reply</span>
                                </button>
                        }
                    </footer>
                </div>
                {
                    data.replies?.length > 0
                    &&
                    <div className="border-l-2 border-spacing-4 pl-4">
                        <ul className="flex flex-col gap-4">
                            {
                                data.replies.map((reply: any) => (
                                    <li key={reply.id}>
                                        <Comment data={reply} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </>

    )
}

export default memo(Comment);