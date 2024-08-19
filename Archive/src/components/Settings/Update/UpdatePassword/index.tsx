import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IChange } from '../../../../helpers/types';
import { handlePasswordChange, verifyUser } from '../../../../helpers/api';


export const UpadtePassword = () => {

    const { register, handleSubmit } = useForm<IChange>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    const handleUpdatePassword = async (payload: IChange) => {
        const { old, newpwd } = payload;
        if (typeof old !== 'string' || typeof newpwd !== 'string') {
            setError("Both old and new passwords are required.");
            return;
        }
        const isVerify = await verifyUser();
        if (isVerify.status == "error") {
            setError(isVerify.message || "User verification failed")
        } else {
            handlePasswordChange({ old, newpwd })
                .then(response => {
                    if (response.status === "error" && response.message) {
                        setError(response.message);
                    } else {
                        setError("");
                        navigate("/login");
                    }
                });
        }
    }

    return <>
        <MDBContainer fluid className="p-5">
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='6' md='8' sm='10'>
                    <MDBCard className='my-5 rounded-4 shadow-lg border-0'>
                        <MDBCardBody className='px-4 py-5'>
                            <h3 className="mb-4 text-center">Update Password</h3>
                            <form onSubmit={handleSubmit(handleUpdatePassword)}>
                                {error && <div className='alert alert-danger mb-4'>{error}</div>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Old Password'
                                    type='password'
                                    {...register("old", { required: true })}
                                    className="rounded-pill"
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='New Password'
                                    type='password'
                                    {...register("newpwd", { required: true })}
                                    className="rounded-pill"
                                />
                                <button type='submit' className='btn btn-info w-100 py-2 rounded-pill'>
                                    Update Password
                                </button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>
}