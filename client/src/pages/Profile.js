import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
};

AWS.config.update(awsConfig);

const Profile = props => {
    const { username: userParam } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [thoughts, setThoughts] = useState([{
        username: userParam,
        createdAt: '', 
        thought: ''
    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/users/${userParam}`);
                const data = await res.json();
                console.log(data);
                setThoughts([...data]);
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userParam]);

    return (
        <div>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                    Viewing {userParam ? `${userParam}'s` : 'your'} profile.
                </h2>
            </div>
            <div className="flex-row justify-space-between mb-3">
                <div className="col-12 mb-3 col-lg-8">
                    {!isLoaded ? (
                        <div>Loading...</div>
                    ) : (
                    <ThoughtList thoughts={thoughts} title={`${userParam}'s thoughts...`} />
                    )}
                </div>
            </div>
            <div className="mb-3">
                <ThoughtForm name={userParam} />
            </div>
        </div>
    );
};

export default Profile;