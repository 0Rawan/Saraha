import UserMessages from './UserMessages';
import UserProfile from './UserProfile';
import {  useParams } from "react-router-dom";

export default function Timeline() {
  let { id } = useParams();

  return (
    <div >
    
    <div className="container py-5">
        <div className="row">
            <div  className="col-md-4">
                <UserProfile id={id} />
            </div>
            <div className="col-md-8">
                <UserMessages id={id}/>
            </div>
        </div>
    </div>
    </div>
  )
}
