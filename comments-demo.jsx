"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './comment-list'
import CommentsForm from './comments-form'

/*Comment-box demo*/

let CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments Demo</h1>
                <CommentsList />
                <CommentsForm />
            </div>
        )
    }

});

ReactDOM.render(<CommentBox />,
document.getElementById('container'));