import React, { Component } from 'react';
import logo from './logo.svg';
import './PostEntry.css';
import axios from 'axios';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import ReactMarkdown from 'react-markdown';

class Comment extends Component {
    constructor(props) {
        super(props);


        this.state = {
            comment: props.comment,
            kind: props.kind,
            colorArray: ['red', 'orange', 'yellow', 'olive', 'violet', 'green', 'teal', 'blue']
        }
    }

    truncate(str, limit = 100) {
        if (str.length > limit) {
            return str.substr(0, limit) + "...";
        }

        return str;
    }

    componentDidMount() {

    }


    componentWillReceiveProps(nextProps) {
        this.setState({ comment: nextProps.comment });
        console.log(nextProps)
    }

    render() {
        let comment = this.state.comment;
        let children = [];
        let kind = this.state.kind;

        if (kind === 'more') {
            return (
                <div className="comment" key={comment.id}>
                    <a href="#">Read {comment.count} more replies</a>
                </div>
            );
        }

        if (comment.replies) {
            let unmapped = comment.replies.data.children;
            //children = comment.replies.data.children.map(obj => obj.data);
            children = unmapped;
        }
        return (
            <div className="comment" key={comment.id}>
                <div className="content">
                    <a className="author">{comment.author}</a>
                    <div className="metadata">
                        <span className="date"><Moment unix ago toNow>{comment.created_utc}</Moment></span>
                        <span className="other">{comment.id}</span>
                        <span className="other">{kind}</span>
                    </div>
                    <div className="text">
                        <div className={`ui ${this.state.colorArray[comment.depth]} segment`}>
                            {comment.body && (<ReactMarkdown source={renderHTML(comment.body)}></ReactMarkdown>)}
                        </div>
                    </div>
                    <div className="actions">
                        <a className="reply">Reply</a>
                    </div>
                    <div className="comments">
                        {children.map(child =>
                            <Comment key={child.data.id} kind={child.kind} comment={child.data} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
