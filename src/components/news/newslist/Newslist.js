import React from 'react';
import Axios from 'axios';
import Config from '../../../Config';
import {NavLink} from 'react-router-dom';

import Category from '../../navigation/category/Category';
import Pagination from '../../../components/navigation/pagination/Pagination';

var options = {
    month: "short",
    day: "numeric"
};

class Newslist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                data: []
            }
        };
    }

    componentDidMount() {
        this.requestData(this.props.params);
    }

    componentWillReceiveProps (newProps) {
      if (this.props.params.param1 !== newProps.params.param1) {
            this.requestData(newProps.params);
      } else if (this.props.params.param2 !== newProps.params.param2) {
            this.requestData(newProps.params);
        } else if (this.props.params.param3 !== newProps.params.param3) {
            this.requestData(newProps.params);
        }
    }

    requestData(params){
        Axios.get(Config.base_url + `news` + this.getResource(params)).then(response => {
            console.log(response.data);
            this.setState({data: response.data});
        });
    }

    getResource(params) {

        console.log(params);

        if (!params) {
            return "";
        }

        console.log(params.param1, params.param2);

        var resource = "";

        if (params.param1) {
            resource += "/" + params.param1;
        }

        if (params.param2) {
            resource += "/" + params.param2;
        }

        return resource;
    }

    getPosts() {
        if (this.state.data.success === false){
            return (
                <div className="error">No posts to display.</div>
            );
        }

        return this.state.data.data.map(function(post) {
            var date = new Date(post.created_at).toLocaleDateString("en-us", options);
            var content = post.content.substring(0, 200) + "...";
            post.views = 1337;

            return (
                <NavLink to={"/post/" + post.id} key={post.id}>
                    <div className="newslist-post">
                        <div className="newslist-image">
                            <img src="/images/background.png" alt=""/>
                            <div className={"type " + post.type.toLowerCase()}>{post.type}</div>
                            <div className="view-count">{post.views} views</div>

                        </div>
                        <div className="newslist-information">
                            <h2>{post.title}</h2>
                            <h3 className="meta-data">Written by {post.author} on {date}</h3>
                            <div className="content">{content}</div>
                            <div className="read-me">read more</div>
                        </div>
                    </div>
                </NavLink>
            );
        });
    }

    render() {

        if (this.props.pagination && this.state.data.success) {
            var page_info = {
                prev: this.state.data.prev,
                current: this.state.data.current,
                next: this.state.data.next,
                last: this.state.data.last
            }
            var params = [this.props.params.param1, this.props.params.param2];
            var pagination = <Pagination type="news" page_info={page_info} params={params} />
        }

        if (this.props.category) {
            var category = <Category type="news" active={this.props.params.param1}/>
        }

        return (
            <section className="newslist">
                {category}
                {this.getPosts()}
                {pagination}
            </section>
        );
    }
}

export default Newslist;
