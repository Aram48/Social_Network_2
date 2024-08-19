import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import { UpdatePrivacy } from "../../../components/Settings/UpdatePrivacy";
import { useNavigate } from "react-router-dom";

export const Settings = () => {

  const navigate = useNavigate();

  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody className="p-4">
          <UpdatePrivacy />
        </MDBCardBody>
        <MDBCardBody className="p-4">
          <button onClick={() => navigate("/profile/settings/update")} className="btn btn-outline-info">Update password</button>
          <MDBCardBody>
            <button onClick={() => navigate("/profile/settings/update/updateL")} className="btn btn-outline-info">Update login</button>
          </MDBCardBody>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
