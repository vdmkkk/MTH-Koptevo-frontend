import Footer from '../../Components/reusable/footer';
import Layout from '../../Components/reusable/layout';
import './profile-page.css';
import {useNavigate} from "react-router"

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Layout/>
      <Footer/>
    </div>
  );
}

export default ProfilePage;
