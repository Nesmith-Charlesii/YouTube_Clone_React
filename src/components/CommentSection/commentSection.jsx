import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import MakeComment from './MakeComment/makeComment'
import ViewComment from './ViewComment/viewComment'


class CommentSection extends Component{
    constructor(props){
        super(props);
        
        this.commentMaker = this.commentMaker.bind(this)
        this.postComment = this.postComment.bind(this)
        this.state={
            videoId:props.videoId,
            comments:"No Comments Yet",
            renderIndex:"view",
            commentDest:"none",
            commentParent:"new"
        }
    }

    async getComments(){
        try{
            let comments= await axios.get('http://127.0.0.1:8000/'+this.state.videoId)
            comments = comments.data
            this.setState(
                {renderIndex:"view",
                commentDest:"none",
                commentParent:"new",
                comments:comments}
            )
        }
        catch(e){
            console.log(e)
            this.setState({comments:"No Comments Yet"})

        }

    }

    commentMaker(event, video, reply="new"){
       
        event.preventDefault()
        let url = 'http://127.0.0.1:8000';
        if(reply === "new"){
            url = url+'/'+video+'/';
            // this.state.renderIndex = 'make';
            // this.state.commentDest = url;
            // this.forceUpdate()
            this.setState({
                renderIndex:"make",
                commentDest:url
            });
            console.log(this.state);
        }
        else{
            url = url+'/'+video+'/'+reply;
            this.setState({
                renderIndex:"make",
                commentDest:url
            });
        }
        

    }

    async postComment(event,url){
        console.log(event," ",url)
        let comment = {
            comment_text:event.target.comment.value,
            video:this.state.videoId
        }
        event.preventDefault();
        if (this.state.commentParent === 'new'){
        let test = await axios.post(url, comment)
        console.log(test)
    }
        else{
            console.log(await axios.post(url, {
                comment_text:event.target.value,
                video:this.state.videoId,
                parent:this.state.commentParent
            }))

        }
        this.getComments();

    }


    async componentDidMount(){
        this.getComments();
    }
    render(){
        
        if(this.state.renderIndex === 'view'){
            if(this.state.comments === 'No Comments Yet'){
                return(this.state.comments)
            }
            
            return(<ViewComment comments={this.state.comments} commentMaker={this.commentMaker} video={this.state.videoId}/>)
        }
        else if (this.state.renderIndex === 'make'){
            
            return(<MakeComment postComment={this.postComment} url={this.state.commentDest}/>)
        
        }
    }
    
}
export default CommentSection