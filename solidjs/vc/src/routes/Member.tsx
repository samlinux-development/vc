import MemberComp from "../components/member";
import { AuthProvider } from '../context/AuthContext';

const Member = () => {
  return (   
    <div>
      <AuthProvider>
        <MemberComp />
      </AuthProvider>
    </div>
  )
}
export default Member;
