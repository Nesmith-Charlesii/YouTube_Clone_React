function ViewComment(props){
    if (props.comments.length < 1){
        return(<button className="btn btn-dark" onClick={(e) => props.commentMaker(e,props.video)}>be the first to make a comment</button>)
    }
    let parents = props.comments.filter((comment)=>{
        if(comment.parent===null){
            return true;
        }
        return false;
    })
    let replies = props.comments.filter((comment)=>{
        if(comment.parent!=null){
            return true;
        }
        return false;
    })
    parents.sort((a,b)=>{
        return(a.id-b.id);
    })
    replies.sort((a,b)=>{
        return(b.id-a.id);
    })
    let index = -1
    while (replies.length>0){
        let insert = replies.shift()
        index = parents.findIndex((comment,arrayIndex)=>{
            if(comment.id === insert.parent){
                return true;
            }
            return false;
        })
        if(index==-1){
            replies.push(insert)
        }
        else{
            parents.splice(index+1,0,insert);
        }
    }
    
    

    function commentBreakout(comment){
        if (isNaN(comment.parent)){
            return(
            <table width ='30%' align='left' className='table-dark'>
                <tbody>
                    <tr>
                        <td>Comment#:</td>
                        <td>{comment.id}</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>{comment.comment_text}</td>
                    </tr>
                </tbody>
            </table>)
        }
        return(
        <table width ='30%' align='left' className='table-secondary'>
        <tbody>
            <tr>
                <td>Comment#:</td>
                <td>{comment.id}</td>
            </tr>
            <tr>
                <td colSpan='2'>{comment.comment_text}</td>
            </tr>
            <tr>
                <td>
                    Reply To:
                </td>
                <td>
                    {comment.parent}
                </td>
            </tr>
        </tbody>
    </table>)

    }
    
    return(<div>
        {parents.map(commentBreakout)}
        <button className="btn btn-dark" onClick={(e) => props.commentMaker(e,props.video)}>make a comment</button>
        </div>
        )
}
export default ViewComment