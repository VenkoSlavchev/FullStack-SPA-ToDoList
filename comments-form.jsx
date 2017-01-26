import React from 'react';

/*Comment-form component demo*/
class CommentsForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author: '',
            text: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    handleAuthorChange(e){
        this.setState({author: e.target.value});
    }
    handleTextChange(e){
        this.setState({text: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();

        if(!text || !author){
            return;
        }
        this.props.onCommentsSubmit({
            author: author,
            text: text
        });
        this.setState({
            author: '',
            text: ''
        })
    }
    render () {
        return (
            <form className="commentsForm">
                <input type="text" value={this.state.author} placeholder="Your name"
                       onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="Say something" value={this.state.text}
                       onChange={this.handleTextChange}/>
                <input type="submit" onClick={this.handleSubmit} value="Post"/>
            </form>
        )
    }
}

CommentsForm.propTypes = {
    onCommentsSubmit: React.PropTypes.func
};
export default CommentsForm;