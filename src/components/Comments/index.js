import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {commentsLists: [], username: '', comments: ''}

  onDelete = id => {
    this.setState(prevState => ({
      commentsLists: prevState.commentsLists.filter(
        eachList => eachList.id !== id,
      ),
    }))
  }

  isFavoriteToggler = id => {
    this.setState(prevState => ({
      commentsLists: prevState.commentsLists.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isLiked: !eachList.isLiked}
        }
        return eachList
      }),
    }))
  }

  renderCommentList = () => {
    const {commentsLists} = this.state

    return commentsLists.map(eachList => (
      <CommentItem
        listDetails={eachList}
        key={eachList.id}
        onDelete={this.onDelete}
        isFavoriteToggler={this.isFavoriteToggler}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comments} = this.state

    const initialBackgroundColor = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      username,
      date: new Date(),
      comments,
      isLiked: false,
      backgroundColor: initialBackgroundColor,
    }
    this.setState(prevState => ({
      commentsLists: [...prevState.commentsLists, newComment],
      username: '',
      comments: '',
    }))
  }

  onInputChange = event => {
    this.setState({username: event.target.value})
  }

  onTextChange = event => {
    this.setState({comments: event.target.value})
  }

  render() {
    const {commentsLists, username, comments} = this.state
    return (
      <div className="bg-container">
        <div>
          <h1 className="title">Comments</h1>
          <div className="comments-container">
            <form onSubmit={this.onAddComment}>
              <div className="comments-input-container">
                <p className="input-title">
                  Say something about 4.0 Technologies
                </p>
                <input
                  type="input"
                  onChange={this.onInputChange}
                  placeholder="Your Name"
                  className="input"
                  value={username}
                />
                <textarea
                  rows="5"
                  cols="20"
                  onChange={this.onTextChange}
                  placeholder="Your Comment"
                  className="text"
                  value={comments}
                />
                <button type="submit" className="button">
                  Add Comments
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="img"
            />
          </div>
          <hr className="separator" />
          <p className="comments-count-title">
            <span className="comments-count">{commentsLists.length}</span>{' '}
            Comments
          </p>
          <ul className="comment-list">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
