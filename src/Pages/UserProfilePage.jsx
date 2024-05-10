import Footer from "../components/Footer";
import HeaderReal from "../components/HeaderReal";
import ProfileUserInfo from "../components/ProfileUserInfo";
import DisplayBooks from "../components/DisplayBooks";

function UserProfilePage() {
    return (
        <div>
            <HeaderReal />
            <h1>Hola mundo</h1>
            <div style={{ display: "flex" }}>
                <div className="profile-info-container">
                    <ProfileUserInfo />
                </div>
                <div style={{ flex: 1 }}>
                    <DisplayBooks />
                </div>
            </div>
            
        
            
        </div>
    );
}

export default UserProfilePage;