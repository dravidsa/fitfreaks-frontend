import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ExcelExport from './ExcelExport';
import { API_URL } from "../../config";
import RTable from "./RTable";
import { useRouter } from 'next/router';

const App = () => {
    const [eventEnrollments, setEventEnrollments] = useState(null);
    const [data, setData] = useState([]);

    const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    //const jwt=  localStorage.getItem('jwt') ;
        const { push } = useRouter();
        console.log( "got this jwt" + jwt ) ; 
        if( jwt === null) 
        {
            console.log( "user is not logged in or session expired. Kindly login again") ; 
            push('/');
            return ; 
        }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getEnrollmentData();
                setEventEnrollments(fetchedData);
            } catch (error) {
                console.error("Error fetching enrollment data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (eventEnrollments && eventEnrollments.data) {
            const newData = eventEnrollments.data.map(enrollment => ({
                id: enrollment.id,
                full_name: enrollment.attributes.full_name,
                mobile: enrollment.attributes.mobile,
                email: enrollment.attributes.email,
                event_catagory: enrollment.attributes.event_catagory,
                gender: enrollment.attributes.gender,
                group_name: enrollment.attributes.group_name,
                event_name: enrollment.attributes.event_name,
                createdAt: enrollment.attributes.createdAt
            }));
            setData(newData);
        }
    }, [eventEnrollments]);

    if (!eventEnrollments) {
        return <div>Loading...</div>;
    }

    const columns = [
        { Header: "Enrollment ID", accessor: "id" },
        { Header: "First Name", accessor: "full_name" },
        { Header: "Mobile", accessor: "mobile" },
        { Header: "Email", accessor: "email" },
        { Header: "Event Category", accessor: "event_catagory" },
        { Header: "Gender", accessor: "gender" },
        { Header: "Registered On", accessor: "createdAt" },
        { Header: "Group Name", accessor: "group_name" },
        { Header: "Event Name", accessor: "event_name" }
    ];

    return (
        <div>
            <div>
                <RTable columns={columns} data={data} />
            </div>
            <h1>Export Data to Excel</h1>
            <ExcelExport data={data} fileName="event-enrollments" />
        </div>
    );
}

async function getEnrollmentData() {
    try {
        
        const res = await fetch(`${API_URL}/api/event-enrollments`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error("Error fetching enrollment data:", error);
        return null;
    }
}

export default App;
