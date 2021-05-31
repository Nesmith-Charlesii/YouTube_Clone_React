function ViewComment(props){
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
    debugger;
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
    
    return(parents.map(commentBreakout))
}
export default ViewComment