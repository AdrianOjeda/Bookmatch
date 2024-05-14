import { Tag } from "@mui/icons-material";


function UserTagProfileInfo(props){

    return(
        <div>
            <p className = {props.className}>#{props.tagname}</p>
        </div>
    )


}

export default UserTagProfileInfo;