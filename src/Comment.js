import React, { Component } from 'react';
import logo from './logo.svg';
import './Comment.css';
import axios from 'axios';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import ReactMarkdown from 'react-markdown';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6

class Comment extends Component {
    constructor(props) {
        super(props);


        this.state = {
            comment: props.comment,
            collapsed: props.collapsed,
            kind: props.kind,
            colorArray: ['red', 'blue', 'yellow', 'olive', 'violet', 'green', 'teal', 'blue']
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
        this.setState({ comment: nextProps.comment, collapsed: nextProps.collapsed || false });
        console.log(nextProps)
    }

    toggleComment() {
        console.log("Toggling", this);
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        let comment = this.state.comment;
        let children = [];
        let kind = this.state.kind;

        if (kind === 'more') {
            return (
                <div className="comment" key={comment.id}>
                    {console.log(comment)}
                    <a href="#">Read {comment.count} more replies</a>
                </div>
            );
        }

        if (comment.replies) {
            children = comment.replies.data.children;
        }

        let collapsed = this.state.collapsed;

        return (
            <div className="comment" key={comment.id}>
                <div className="content">
                    <a onClick={this.toggleComment.bind(this)} className="author">{collapsed ? "[+]" : "[-]"}</a> &nbsp;
                    <a className="author">{comment.author}</a>
                    <div className="metadata">
                        <span className="date"><Moment unix ago toNow>{comment.created_utc}</Moment></span>
                        <span className="other">{comment.id}</span>
                        <span className="other">{kind}</span>
                        <span className="other">{children.length} child comments</span>
                    </div>
                    {/* className={collapsed ? "transition fade out" : "transition fade in" */}

                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {!collapsed && (
                            <div key={comment.id}>
                                <div className="text">
                                    <div className={`ui ${this.state.colorArray[comment.depth]} segment`}>
                                        {comment.body && (<ReactMarkdown source={renderHTML(comment.body)}></ReactMarkdown>)}
                                    </div>
                                </div>
                                <div className="actions">
                                    <a className="reply">Reply</a>
                                </div>
                                {children.length > 0 && (
                                    <div className="comments">
                                        {children.map(child =>
                                            <Comment key={child.data.id} kind={child.kind} comment={child.data} />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export default Comment;
