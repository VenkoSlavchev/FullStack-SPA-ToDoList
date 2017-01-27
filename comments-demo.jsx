"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import CommentsList from './comment-list';
import CommentsForm from './comments-form';
import $ from 'jquery';
import SetIntervalMixin from './set-interval-mixin'

/*Comment-box demo*/

class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        this.mixins = [SetIntervalMixin];
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleDeleteComment= this.componentDidMount.bind(this);
    }
    refreshComments(){
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
    }
    componentDidMount() {
        this.interval = setInterval(() => this.refreshComments(), this.props.pollInterval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    handleCommentSubmit(comment) {
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
    }
    handleDeleteComment(id){
        $.ajax({
            method: 'DELETE',
            url: this.props.url + '/' + id,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({data: data})
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        })
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments Demo</h1>
                <CommentsList data={this.state.data} id={this.handleDeleteComment} />
                <CommentsForm onCommentsSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }

}

CommentBox.propTypes = {
    url: React.PropTypes.string.isRequired,
    pollInterval: React.PropTypes.number,

};


ReactDOM.render(<CommentBox url="/api/comments" pollInterval={10000}/>,
    document.getElementById('container'));