import React, { useEffect, useState } from 'react';
import api from '../api';
import { ResponseItem } from '../types';

function SurveyResponses() {
    const [responses, setResponses] = useState<ResponseItem[]>([]);
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState('');

    const fetchResponses = async () => {
        const res = await api.get('/questions/responses', { params: { page, email_address: email } });
        setResponses(res.data.responses || []);
    };

    useEffect(() => {
        fetchResponses();
    }, [page]);

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button onClick={() => { setPage(1); fetchResponses(); }}>Search</button>

            {responses.map(r => (
                <div key={r.id}>
                    <p><b>{r.full_name}</b> - {r.email_address}</p>
                    <p>{r.description}</p>
                    <p>{r.gender}</p>
                    <p>{r.programming_stack}</p>
                    <div>
                        {r.certificates.map(c => (
                            <a key={c.id} href={`http://localhost:5000/api/questions/responses/certificates/${c.id}`} target="_blank" rel="noreferrer">{c.file_name}</a>
                        ))}
                    </div>
                </div>
            ))}

            <button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
            <span> Page {page} </span>
            <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
    );
}

export default SurveyResponses;
