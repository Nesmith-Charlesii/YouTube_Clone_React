import './viewComment.css';
import './fontAwesome/css/all.min.css'

function ViewComment(props){
    //this first if statement shouldn't ever be seen but it's a emergency catch in case we accidently pass in an empty comment array
    if (props.comments.length < 1){
        return(<button className="btn btn-dark" onClick={(e) => props.commentMaker(e,props.video)}>be the first to make a comment</button>)
    }
    //move all the original comments into 1 array
    let parents = props.comments.filter((comment)=>{
        if(comment.parent===null){
            return true;
        }
        return false;
    })
    //move all child components into another array
    let replies = props.comments.filter((comment)=>{
        if(comment.parent!=null){
            return true;
        }
        return false;
    })
    //sorts comments so they are in ascending order of creation
    parents.sort((a,b)=>{
        return(a.id-b.id);
    })
    //sorts comments so they are in descending order of creation
    replies.sort((a,b)=>{
        return(b.id-a.id);
    })
    let index = -1
    //this loop iterates through all child comments to find their parent and inserts them into the parent array on the index immediatly after their parent
    while (replies.length>0){
        let insert = replies.shift()
        index = parents.findIndex((comment,arrayIndex)=>{
            if(comment.id === insert.parent){
                return true;
            }
            return false;
        })
        //if the parent isn't found the comment we are testing must be a grandchild so adds it back to the end of the array for testing again
        if(index==-1){
            replies.push(insert)
        }
        else{
            //adds the comment to the index following the located parent
            parents.splice(index+1,0,insert);
        }
    }
    
    
    //returns the HTML for each comment for rendering
    function commentBreakout(comment){
        //checks to see if the comment is a child
        if(comment.parent===null){
            //HTML for non child comments
            return(
                <div className="comment-section">
                    <ul>
                        <li id="Anon">{comment.id}</li>
                        <ul>
                            <li>{comment.comment_text}</li>
                            <li><i className="far fa-thumbs-up" id="thumbs-up" name={comment.id} onClick={(e) => props.likeComment(e, props.video, comment.id)}> {comment.likes}</i> <i className="far fa-thumbs-down mx-4" id="thumbs-down" name={comment.id} onClick={(e) => props.dislikeComment(e, props.video, comment.id)}> {comment.dislikes}</i> <button className='btn btn-dark btn-sm mx-2' name={comment.id} value='Reply' onClick={(e) => props.commentMaker(e,props.video,comment.id)}>Reply :: {comment.parent}</button></li>
                            {/* <li>Reply @: {comment.parent} </li> */}
                        </ul>
                    </ul>
                </div>
            )

        }

        else{
            //HTML for children
            return(
                <div className="comment-section">
                    <ul>
                        <li id="Anon">{comment.id}</li>
                        <ul>
                            <li>Reply to:{comment.parent}</li>
                            <li>{comment.comment_text}</li>
                            <li><i className="far fa-thumbs-up" id="thumbs-up" name={comment.id} onClick={(e) => props.likeComment(e, props.video, comment.id)}> {comment.likes}</i> <i className="far fa-thumbs-down mx-4" id="thumbs-down" name={comment.id} onClick={(e) => props.dislikeComment(e, props.video, comment.id)}> {comment.dislikes}</i> <button className='btn btn-dark btn-sm mx-2' name={comment.id} value='Reply' onClick={(e) => props.commentMaker(e,props.video,comment.id)}>Reply :: {comment.parent}</button></li>
                            {/* <li>Reply @: {comment.parent} </li> */}
                        </ul>
                    </ul>
                </div>
            )
        }
    }
    
    return(<div>
        {parents.map(commentBreakout)}
        <button className="btn btn-dark" onClick={(e) => props.commentMaker(e,props.video)}>make a comment</button>
        </div>
        )
}
export default ViewComment