import React from 'react';

/*Comment-form component demo*/
let CommentsForm = React.createClass({
    render: function () {
        return (
            <form className="commentsForm">
                <input type="text" placeholder="Your name"/>
                <input type="text" placeholder="Say something"/>
                <input type="submit" value="Post"/>
            </form>
        )
    }
});

export default CommentsForm;