import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import MakeComment from './MakeComment/makeComment'
import ViewComment from './ViewComment/viewComment'

//in hindsight this sub-wrapper may have been a mistake as it was plauged with rendering issues and in somecases
//the only solution we could find to get the page to update correctly was directly modifiying state outside of this.setState()
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

    
    // this function determines the endpoint for making a new comment and sets state to pull up the comment creation UI
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

    //this function actually posts the comment following form submit
    async postComment(event,url){
        //declared the comment variable as part of troubleshooting rejected api requests and after I got the bugs fixed saw no reason not to keep it
        let comment = {
            comment_text:event.target.comment.value,
            video:this.state.videoId
        }
        event.preventDefault();
        if (this.state.commentParent === 'new'){
            try{
                let test = await axios.post(url, comment)
                console.log(test)
            }
            catch(e){
                console.log(e)
            }
    }
        else{
            //the reason for the split logic is this is pulling double duty both posting new comments and replies this is the reply section
            try{
            console.log(await axios.post(url, {
                comment_text:event.target.comment.value,
                video:this.state.videoId,
                parent:this.state.commentParent
            }))
            }
            catch(e){
                console.log(e)
            }
        }
        //I could never figure out why but unless I reassigned comments to an empty array before resetting them they would always keep their old value
        this.state.comments = []
        let comments = await this.props.getComments(this.props.videoId)
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
        await axios.put(`http://127.0.0.1:8000/${video_id}/${comment_id}/like`)
        this.props.getComments(this.state.videoId)
        this.state.comments = []
    }

    dislikeComment = async(e, video_id, comment_id ) => {
        await axios.put(`http://127.0.0.1:8000/${video_id}/${comment_id}/dislike`)
        this.props.getComments(this.state.videoId)
        this.state.comments = []
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
        this.state.videoId = this.props.videoId
        if(this.state.renderIndex === 'view'){
            //props would get correctly passed in but not correctly update in state so this will check if they are updated correctly and if not
            //render an empty component which should immediately re-render with correct information
            if(this.state.comments !== this.props.comments && !this.state.force){
                this.newComments(this.props.comments)
                return("re-render failed");
            }
            else if(this.state.comments === 'No Comments Yet'){
                this.state.commentDest = 'http://127.0.0.1:8000/'+this.state.videoId+'/'
                return(<MakeComment postComment={this.postComment} url={this.state.commentDest}/>)
            }
            //there are a few instances where I don't want to use the props data because it's definitely out of date so created the force variable to bypass the previous check
            //couldn't see a way around directly manipulating either state or props here as the data is out of sync and I dont' have a method to force the parent component to rerender from within the child component
            this.state.force=false;
            return(<ViewComment comments={this.state.comments} commentMaker={this.commentMaker} video={this.state.videoId} likeComment={this.likeComment} dislikeComment={this.dislikeComment} />)
        }
        else if (this.state.renderIndex === 'make'){
            
            return(<MakeComment postComment={this.postComment} url={this.state.commentDest} />)
        
        }
    }
    
}
export default CommentSection