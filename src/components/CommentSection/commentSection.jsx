import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import MakeComment from './MakeComment/makeComment'
import ViewComment from './ViewComment/viewComment'


class CommentSection extends Component{
    constructor(props){
        super(props);
        
        this.state={
            videoId:props.videoId,
            comments:"No Comments Yet",
            renderIndex:"view",
             
        }
    }

    async getComments(){
        try{
            let comments= await axios.get('http://127.0.0.1:8000/'+this.state.videoId)
            comments = comments.data
            this.setState(
                {comments:comments}
            )
        }
        catch(e){
            console.log(e)
            this.setState({comments:"No Comments Yet"})

        }

    }

    async componentDidMount(){
        this.getComments();
    }
    render(){
        if(this.state.renderIndex === 'view'){
            if(this.state.comments === 'No Comments Yet'){
                return(this.state.comments)
            }
            return(<ViewComment comments={this.state.comments}/>)
        }
        else if (this.state.renderIndex === 'make'){
            
            return(<MakeComment/>)
        
        }
    }
    
}
export default CommentSection