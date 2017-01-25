"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './comment-list';
import CommentsForm from './comments-form';
import data from './comments-data';
import $ from 'jquery';

/*Comment-box demo*/

let CommentBox = React.createClass({
    propTypes : {
        data: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id:React.PropTypes.number,
                author:React.PropTypes.string,
                text: React.PropTypes.string
            })
        ),
        url: React.PropTypes.string
    },
    getInitialState : function () {
      return {data: []}
    },
    componentDidMount: function () {
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
    render: function() {
        return (
            <div className="commentBox" url="/api/comments">
            <h1>Comments Demo</h1>
                <CommentsList data={this.state.data} />
                <CommentsForm />
            </div>
        )
    }

});

ReactDOM.render(<CommentBox data={data}/>,
document.getElementById('container'));