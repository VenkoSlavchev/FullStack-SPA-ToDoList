"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './comment-list';
import CommentsForm from './comments-form';
import $ from 'jquery';
import SetIntervalMixin from './set-interval-mixin'

/*Comment-box demo*/

let CommentBox = React.createClass({
    propTypes : {
        url: React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number,

    },
    mixins: [SetIntervalMixin],
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
     this.setInterval(this.refreshComments, this.props.pollInterval)
    },
    handleCommentSubmit: function (comment) {
        $.ajax({
            method: 'POST',
            url: this.props.url,
            dataType: 'json',
            cache: false,
            data: comment
        }).done((data) => {
            this.setState({data: data})
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        })
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments Demo</h1>
                <CommentsList data={this.state.data} />
                <CommentsForm onCommentsSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }

});



ReactDOM.render(<CommentBox url="/api/comments" pollInterval={10000}/>,
document.getElementById('container'));