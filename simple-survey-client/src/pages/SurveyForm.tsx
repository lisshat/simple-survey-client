import React, { useEffect, useState } from 'react';
import api from '../api';
import { Question } from '../types';

function SurveyForm() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [files, setFiles] = useState<FileList | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);

    useEffect(() => {
        api.get('/questions').then(res => setQuestions(res.data.questions));
    }, []);

    const current = questions[step];
    const isLast = step === questions.length;

    const handleChange = (e: any) => {
        const { name, value, files, type, selectedOptions } = e.target;
        if (type === 'file') {
            setFiles(files);
        } else if (type === 'select-multiple') {
            const values = Array.from(selectedOptions, (opt: any) => opt.value);
            setAnswers({ ...answers, [name]: values });
        } else {
            setAnswers({ ...answers, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        for (let key in answers) formData.append(key, answers[key]);
        if (files) Array.from(files).forEach(f => formData.append('certificates', f));
        await api.put('/questions/responses', formData);
        setSubmitted(true);
        setConfirmationVisible(true);
    };

    if (!questions.length) return <p>Loading...</p>;

    return (
        <div>
            {confirmationVisible && (
                <div style={{ backgroundColor: '#d1fae5', padding: '10px', marginBottom: '10px', color: '#065f46' }}>
                    ✅ Thank you! Your submission was successful.
                </div>
            )}

            {!submitted ? (!isLast ? (
                <div>
                    <p><strong>{current.text}</strong></p>
                    {current.type === 'short_text' || current.type === 'email' ? (
                        <input name={current.name} type="text" onChange={handleChange} value={answers[current.name] || ''} />
                    ) : current.type === 'long_text' ? (
                        <textarea name={current.name} onChange={handleChange} value={answers[current.name] || ''}></textarea>
                    ) : current.type === 'choice' ? (
                        <select name={current.name} multiple={current.multiple} onChange={handleChange}>
                            {current.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                        </select>
                    ) : current.type === 'file' ? (
                        <input type="file" name="certificates" multiple onChange={handleChange} />
                    ) : null}
                    <div>
                        {step > 0 && <button onClick={() => setStep(step - 1)}>Previous</button>}
                        <button onClick={() => setStep(step + 1)}>Next</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Review Your Answers</h3>
                    <ul>
                        {questions.map((q) => (
                            <li key={q.name}><strong>{q.text}:</strong> {Array.isArray(answers[q.name]) ? answers[q.name].join(', ') : answers[q.name]}</li>
                        ))}
                        {files && <li><strong>Certificates:</strong> {Array.from(files).map(f => f.name).join(', ')}</li>}
                    </ul>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )) : null}
        </div>
    );
}

export default SurveyForm;
