import React, { Component } from 'react';
import logo from './logo.svg';
import './PostEntry.css';
import axios from 'axios';

class PostEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post
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
        this.setState({ post: nextProps.post });
    }

    render() {
        if (!this.state.post) {
            return (
                <div></div>
            );
        }


        return (
            <div className="ui segment item" key={this.state.post.id}>
                <div className="right floated content">
                    <div className="ui vertical icon  buttons" role="group" aria-label="...">
                        <button type="button" className="ui post-ctrl compact  button"><i className="chevron up icon"></i></button>
                        <button type="button" className="ui post-ctrl compact  button">{this.state.post.score}</button>
                        <button type="button" className="ui post-ctrl compact  button"><i className="chevron down icon"></i></button>
                    </div>
                </div>
                <a className="ui small image">
                    {this.state.post.thumbnail != 'self' && this.state.post.thumbnail != '' && this.state.post.thumbnail != 'default' && this.state.post.thumbnail != 'spoiler' ?
                        (<img src={this.state.post.thumbnail} alt="..." />)
                        : (<img src="http://placehold.it/140x70" alt="..." />)
                    }
                </a>
                <div className="content">
                    <h3 className="header"><a href={this.state.post.url}>{(this.state.post.title)}</a></h3><br />
                    <b><a href={this.state.post.permalink}>{this.state.post.num_comments} Comments</a></b>
                </div>

            </div>
        );
    }
}

export default PostEntry;
