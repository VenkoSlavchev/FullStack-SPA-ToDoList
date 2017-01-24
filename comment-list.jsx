"use strict";

import React from 'react';
import Comment from './comment';


/*Comment-list component demo*/
let CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentsList"> I am comments list.
                <Comment author='Johny Bravo'> Do you like *React* </Comment>
                <Comment author='Arthur'>Oh no...</Comment>
            </div>
        )
    }
});

export default CommentList;