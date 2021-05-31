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
    
    debugger;

    function commentBreakout(comment){

    }
    
    return(<div>
        <button>Make Comment</button>

    </div>)
}
export default ViewComment