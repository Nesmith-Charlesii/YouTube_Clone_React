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
            commentParent:"new",
            likes: Number,
            dislikes: Number
        }
    }

    

    commentMaker(event, video, reply="new"){
        
        event.preventDefault()
        let url = 'http://127.0.0.1:8000';
        if(reply === "new"){
            url = url+'/'+video+'/';
            this.setState({
                renderIndex:"make",
                commentDest:url
            });
        }
        else{
            url = url+'/'+video+'/'+reply;
            this.setState({
                renderIndex:"make",
                commentDest:url,
                commentParent:reply,
                force:false
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
            try{
                let test = await axios.post(url, comment)
            }
            catch(e){
                console.log(e)
            }
    }
        else{
            try{
            await axios.post(url, {
                comment_text:event.target.comment.value,
                video:this.state.videoId,
                parent:this.state.commentParent
            })
            }
            catch(e){
                console.log(e)
            }
        }
        this.state.comments = []
        let comments = await this.props.getComments(this.state.videoId)
        this.setState(
            {
                renderIndex:"view",
                comments:comments,
                commentParent:"new",
                force:true
            }
        )
    }
    
    likeComment = async(e, video_id, comment_id ) => {
        axios.put(`http://127.0.0.1:8000/${video_id}/${comment_id}/like`)
        this.props.getComments(this.state.videoId)
    }

    dislikeComment = async(e, video_id, comment_id ) => {
        axios.put(`http://127.0.0.1:8000/${video_id}/${comment_id}/dislike`)
        this.props.getComments(this.state.videoId)
    }

    componentDidMount()
    {
        this.setState({comments:this.props.comments})
    }

    newComments(comments){
        this.setState(
            {comments:comments}
            );
    }

    render(){
        if(this.state.renderIndex === 'view'){
            if(this.state.comments != this.props.comments && !this.state.force){
                this.newComments(this.props.comments)
                return("re-render failed");
            }
            else if(this.state.comments === 'No Comments Yet'){
                return(<MakeComment postComment={this.postComment} url={this.state.commentDest}/>)
            }
            this.state.force=false;
            return(<ViewComment comments={this.state.comments} commentMaker={this.commentMaker} video={this.state.videoId} likeComment={this.likeComment} dislikeComment={this.dislikeComment} />)
        }
        else if (this.state.renderIndex === 'make'){
            
            return(<MakeComment postComment={this.postComment} url={this.state.commentDest}/>)
        
        }
    }
    
}
export default CommentSection