import Header from "./Header";
import DisplayUsers from "./DisplayUsers";

function VerifyUserFeed(){

    return (

        <div>
            <div >
                <Header/>
            </div>
            <div className="listContainer">
                <DisplayUsers/>
            </div>
        </div>
        
        
    )

}

export default VerifyUserFeed;