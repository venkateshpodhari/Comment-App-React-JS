// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {listDetails, onDelete, isFavoriteToggler} = props
  const {id, username, date, comments, isLiked, backgroundColor} = listDetails
  const formatTime = formatDistanceToNow(date)
  const initialLetter = username[0].toUpperCase()
  const onDeleteList = () => {
    onDelete(id)
  }
  const isLikedChange = () => {
    isFavoriteToggler(id)
  }
  const like = isLiked ? 'like' : 'unlike'

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  return (
    <li className="li">
      <div className="comment-initial">
        <p className={`${backgroundColor} initial-letter `}>{initialLetter}</p>
        <div className="comment-container">
          <p className="username">
            {username} <span className="date">{formatTime} ago</span>
          </p>
          <p className="comment">{comments}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="row">
          <button
            className="button1"
            type="button"
            id="like"
            onClick={isLikedChange}
          >
            <img src={likeUrl} className="like-logo" alt="like" />
          </button>
          <label htmlFor="like" className={like}>
            Like
          </label>
        </div>
        <button
          className="button1"
          type="button"
          onClick={onDeleteList}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="separator" />
    </li>
  )
}

export default CommentItem
