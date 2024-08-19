import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { verifyUser, handleLoginChange } from '../../../../../helpers/api';
import { IChange } from '../../../../../helpers/types';

export const UpdateLogin = () => {

    const { register, handleSubmit } = useForm<IChange>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleUpdateLogin = async ({ password, login }: IChange) => {

        if (typeof password !== 'string' || typeof login !== 'string') {
            setError("Both old and new passwords are required.");
            return;
        }
        const isValid = await verifyUser();
        if (isValid.status === "error") {
            setError(isValid.message || "User verification failed");
            return;
        }

        handleLoginChange({ password, login })
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message);
                } else {
                    setError("");
                    navigate("/login");
                }
            });
    };

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='8'>
                        <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                            <MDBCardBody className='px-5'>
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Update Login</h3>
                                <form onSubmit={handleSubmit(handleUpdateLogin)}>
                                    {error && <p className='alert alert-danger'>{error}</p>}

                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='New Login'
                                        type='text'
                                        {...register("login", { required: true })}
                                    />
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Password'
                                        type='password'
                                        {...register("password", { required: true })}
                                    />
                                    <button type='submit' className='btn btn-outline-info'>Update</button>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};