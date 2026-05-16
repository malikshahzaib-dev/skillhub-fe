



function MessageItem ({user}:{user:any}) {
    console.log("message",user.id)
    return(
        <>
            <div className="">
              <h1>Name:{user.fatherName}</h1>
              <h1>Name:{user.email}</h1>

            </div>
        </>
    )
}
export default MessageItem