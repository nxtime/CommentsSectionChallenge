import { useEffect, useState } from 'react';
import Comment from './components/Organisms/Comment'
import MOCK_DATA from './mocks/data.json';
import { userSavePoint } from './store/userSavePoint';

function App() {
    const { currentUser, comments } = userSavePoint((state: any) => state) as any;

    return (
        <div className="bg-blue-50 min-h-screen p-4 flex flex-col gap-4 ">
            <ul className="flex flex-col gap-4">
                {
                    comments.map((commentData: any) => (
                        <li key={commentData.id}>
                            <Comment data={commentData} />
                        </li>
                    ))
                }
            </ul>
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                <textarea
                    name="newComment"
                    rows={4}
                    className="w-full border rounded-2xl p-4 resize-none"
                    placeholder="Add a comment..."
                />
                <footer className="flex justify-between">
                    <img className="w-8 h-8" src={currentUser.image.png} alt={currentUser.username} />
                    <button
                        className="px-4 py-2 bg-indigo-700 text-white rounded-lg"
                    >
                        Send
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default App
