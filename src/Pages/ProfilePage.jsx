import Footer from "../components/Footer";
import HeaderReal from "../components/HeaderReal";
import ProfileInfo from "../components/ProfileInfo";
import DisplayBooks from "../components/DisplayBooks";

function ProfilePage() {
    return (
        <div>
            <HeaderReal />
            <div style={{ display: "flex" }}>
                <div className="profile-info-container">
                    <ProfileInfo />
                </div>
                <div style={{ flex: 1 }}>
                    <DisplayBooks />
                </div>
            </div>
           
            
        
            
        </div>
    );
}

export default ProfilePage;