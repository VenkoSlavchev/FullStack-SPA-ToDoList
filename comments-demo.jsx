"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './comment-list';
import CommentsForm from './comments-form';
import $ from 'jquery';

/*Comment-box demo*/

let CommentBox = React.createClass({
    propTypes : {
        url: React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number
    },
    getInitialState : function () {
      return {data: []}
    },
    refreshComments: function(){
        $.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({data: data})
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        })
    },
    componentDidMount: function () {
     this.interval = setInterval(this.refreshComments, this.props.pollInterval)
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments Demo</h1>
                <CommentsList data={this.state.data} />
                <CommentsForm />
            </div>
        )
    }

});

ReactDOM.render(<CommentBox url="/api/comments" pollInterval={5000}/>,
document.getElementById('container'));