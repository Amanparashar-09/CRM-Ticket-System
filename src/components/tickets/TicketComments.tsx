import React from 'react';
import Button from '../ui/Button';
import { Comment, User } from '../../types';
import { getUserById } from '../../lib/mockData';

interface TicketCommentsProps {
  ticketId: string;
  comments: Comment[];
  currentUser: User;
  onAddComment: (ticketId: string, content: string, isInternal: boolean) => void;
}

const TicketComments: React.FC<TicketCommentsProps> = ({
  ticketId,
  comments,
  currentUser,
  onAddComment,
}) => {
  const [newComment, setNewComment] = React.useState('');
  const [isInternal, setIsInternal] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(ticketId, newComment, isInternal);
      setNewComment('');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Sort comments by date (newest last)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Comments</h3>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {sortedComments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No comments yet.</p>
        ) : (
          sortedComments.map((comment) => {
            const user = getUserById(comment.userId);
            const isCurrentUserComment = comment.userId === currentUser.id;

            return (
              <div
                key={comment.id}
                className={`flex space-x-3 ${
                  isCurrentUserComment ? 'justify-end' : ''
                }`}
              >
                {!isCurrentUserComment && user && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                )}
                <div
                  className={`flex-1 max-w-[80%] overflow-hidden rounded-lg p-3 ${
                    isCurrentUserComment
                      ? 'bg-cyan-50 text-cyan-900'
                      : 'bg-gray-100 text-gray-900'
                  } ${comment.isInternal ? 'border-l-4 border-amber-400' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">
                      {user?.name || 'Unknown User'}
                      {comment.isInternal && (
                        <span className="ml-2 text-xs font-normal text-amber-600">
                          Internal Note
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
                {isCurrentUserComment && user && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-1">
          <textarea
            rows={3}
            name="comment"
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="internal-note"
              name="internal-note"
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label htmlFor="internal-note" className="ml-2 text-sm text-gray-500">
              Internal note (only visible to staff)
            </label>
          </div>
          <Button type="submit" size="sm" disabled={!newComment.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketComments;