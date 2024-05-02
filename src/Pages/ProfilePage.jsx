import Footer from "../components/Footer";
import HeaderReal from "../components/HeaderReal";
import ProfileInfo from "../components/ProfileInfo";
import DisplayBooks from "../components/DisplayBooks";
function ProfilePage(){

    return (
        <div>
            <div>
                <HeaderReal/>
            </div>
            <div>
                <ProfileInfo></ProfileInfo>
            </div>
            <div>
                <DisplayBooks/>
            </div>
            <div>
                <Footer/>
            </div>
            </div>
    )
        
        

}

export default ProfilePage;