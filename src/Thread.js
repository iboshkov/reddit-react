import React, { Component } from 'react';
import logo from './logo.svg';
import './Thread.css';
import axios from 'axios';
import Truncate from 'react-truncate';
import Comment from './Comment';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import renderHTML from 'react-render-html';
import ReactMarkdown from 'react-markdown';


class Thread extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            data: null,
            comments: [],
            loading: false
        };
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    updateData(props) {
        let permalink = '';
        permalink = props.permalink;

        let url = `http://www.reddit.com/${permalink}.json`;


        this.setState({ comments: [], data: null, loading: true });

        axios.get(url)
            .then(res => {
                const comments = res.data[1].data.children.map(obj => obj.data);
                const data = res.data[0].data.children[0].data;
                this.setState({ comments, data, loading: false });
                console.log(data);
            });
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    render() {
        //<Comment key={comment.id} comment={comment}></Comment>
        let thread = this.state.data;

        const SelfThread = () => (
            <div className="ui segment">
                <ReactMarkdown source={renderHTML(thread.selftext)}></ReactMarkdown>
            </div>
        )
        const LinkThread = () => (
            <div className="ui segment">
                <a href="#">{thread.title}</a>
            </div>
        )

        return (
            <div className="ui comments" >
                {thread && thread.is_self && (<SelfThread />)}
                {thread && !thread.is_self && (<LinkThread />)}

                <h3 className="ui dividing header">Comments</h3>
                {this.state.comments.map(comment =>
                    <Comment key={comment.id} comment={comment} />
                )}
            </div>
        );
    }
}

export default Thread;
