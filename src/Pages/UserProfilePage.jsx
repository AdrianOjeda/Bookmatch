import Footer from "../components/Footer";
import HeaderReal from "../components/HeaderReal";
import ProfileUserInfo from "../components/ProfileUserInfo";
import DisplayUserBooks from "../components/DisplayUserBooks";

function UserProfilePage() {
    return (
        <div>
            <HeaderReal />
            
            <div style={{ display: "flex" }}>
                <div className="profile-info-container">
                    <ProfileUserInfo />
                </div>
                <div style={{ flex: 1 }}>
                    <DisplayUserBooks />
                </div>
            </div>
            
        
            
        </div>
    );
}

export default UserProfilePage;