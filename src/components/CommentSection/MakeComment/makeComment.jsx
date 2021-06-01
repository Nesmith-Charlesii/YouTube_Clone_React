function MakeComment(props){
    
    return(
        <form onSubmit={(e) => props.postComment(e,props.url)}>
            <label>Please Enter Comment:<input type="text" name='comment' className='btn btn-dark'/></label><br/>
            <input type="submit" value="Submit" className='btn btn-dark'/>

        </form>
    )
}
export default MakeComment