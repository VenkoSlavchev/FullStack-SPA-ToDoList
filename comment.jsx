"use strict";

import React from 'react';
import Remarkable from 'remarkable';

/*Comment component demo*/
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }
    rawMarkup(){
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return {
            __html: rawMarkup
        }
    }
    handleDeleteButton(){
       let deleteId = this.props.commentId;
       if(deleteId){
           this.props.onCommentDelete(deleteId)
       }

    }
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}>{}</span>
                <input type="button" value='Delete' onClick={this.handleDeleteButton}/>
            </div>
        )
    }
}

Comment.propTypes = {
        author: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired,
        commentId:React.PropTypes.number.isRequired,
        onCommentDelete:React.PropTypes.func
};
