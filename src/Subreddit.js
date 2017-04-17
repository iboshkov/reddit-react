import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Truncate from 'react-truncate';
import PostEntry from './PostEntry';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import renderHTML from 'react-render-html';
import ReactMarkdown from 'react-markdown';


class Subreddit extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            data: null,
            posts: [],
            loading: false
        };
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    updateData(props) {
        console.log(`Updating subreddit with name ${props.name}`)
        let url = `http://www.reddit.com/r/${props.name}.json`;
        let about_url = `http://www.reddit.com/r/${props.name}/about.json`;

        if (props.name === '') {
            url = 'http://www.reddit.com/.json'
        }

        this.setState({ posts: [], data: null, loading: true });

        axios.get(url)
            .then(res => {
                const posts = res.data.data.children.map(obj => obj.data);
                this.setState({ posts, loading: false });
            });
        if (props.name === '') {
            return;
        }
        axios.get(about_url)
            .then(res => {
                const data = res.data.data;
                console.log(data);
                this.setState({ data });
            });
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    render() {

        const About = () => (
            <div>
                {(this.state.data &&
                    <div>
                        <img className="ui middle aligned tiny image" src={this.state.data.header_img} />
                        <h3>{this.state.data.title}</h3>
                    </div>
                )}
            </div>
        );

        const Sidebar = () =>
            (this.state.data &&
                <div>
                    <ReactMarkdown source={renderHTML(this.state.data.description)}></ReactMarkdown>
                    <pre>{renderHTML(this.state.data.description)}</pre>
                </div>
            );

        let columnCount = this.state.data ? 'twelve' : 'sixteen';
        return (
            <div>
                <div className={`ui padded segment stackable grid ` + (this.state.loading ? 'loading' : '')} >
                    <div className="row">
                        <About></About>
                    </div>

                    <div className="row">
                        <div className={`${columnCount} wide column`}>
                            <div className="ui middle aligned divided list">
                                {this.state.posts.map(post =>
                                    <PostEntry key={post.id} post={post}></PostEntry>
                                )}
                            </div>
                        </div>

                        {(this.state.data &&
                            <div className="four wide column">
                                <Sidebar></Sidebar>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        );
    }
}

export default Subreddit;
