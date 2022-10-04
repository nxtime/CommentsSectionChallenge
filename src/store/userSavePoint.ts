import create from 'zustand';
import { persist } from 'zustand/middleware'
import MOCK_DATA from '../mocks/data.json';

interface UserSavePoint {
    currentUser: typeof MOCK_DATA['currentUser'];
    comments: typeof MOCK_DATA['comments'];
    deleteCommentById(commentId: number, replyingTo?: string): void;
}

export const userSavePoint = create(
    persist<UserSavePoint>(
        (set, get) => ({
            currentUser: MOCK_DATA.currentUser,
            comments: MOCK_DATA.comments,
            deleteCommentById: (commentId, replyingTo) => {
                let filteredComments = get().comments;

                const commentIndex = filteredComments.findIndex(c => c.id === commentId);

                if (commentIndex === -1) {
                    let replyIndex: number;

                    filteredComments.forEach((comment, index) => {
                        comment.replies.forEach(reply => {
                            if (reply.id === commentId) replyIndex = index;
                        });
                    })

                    filteredComments[replyIndex!].replies = get().comments[replyIndex!].replies.filter(c => c.id !== commentId);
                } else {
                    filteredComments = filteredComments.filter(
                        ({ id }: any) => id !== commentId
                    );
                }

                set({
                    comments: filteredComments
                })
            }
        }),
        {
            name: 'userSavePoint'
        }
    )
)