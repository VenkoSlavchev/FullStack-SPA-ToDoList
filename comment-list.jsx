"use strict";

import React from 'react';
import Comment from './comment';


/*Comment-list component demo*/
class CommentList extends React.Component{
    constructor (props){
       super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(id){
        this.props.id = id;
    }
    render() {
        let commentNodes = this.props.data.map((comment)=>{
            return (
                <Comment author={comment.author} key={comment.id}
                         onDelete={this.handleDelete}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentsList" > I am comments list.
                {commentNodes}
            </div>
        )
    }
}

CommentList.propTypes = {
data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
        id:React.PropTypes.number,
        author:React.PropTypes.string,
        text: React.PropTypes.string
    })
)
};
export default CommentList;