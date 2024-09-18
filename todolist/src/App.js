import { useState } from 'react';
import './App.css';

function App() {
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    return storageJobs
  })

  //hàm removeJob
var removeJob = function (job) {
    setJobs((prev) => {
      var newArray = prev.filter((item) => item !== job);
      var jsonStringArray = JSON.stringify(newArray);
      localStorage.setItem('TODO_APP', jsonStringArray);
      return newArray;
    })
  }

  const handleSubmit = () => {
    setJobs(prev => {
      const newJobs = [...prev, job]

      // Save to local storage
      const jsonJobs  = JSON.stringify(newJobs)
      localStorage.setItem('jobs', jsonJobs)
      return newJobs
    })
    setJob('')
  }

  return (
    <div style={{padding: 32}}>
      <input 
        value={job} 
        onChange={e => setJob(e.target.value)} 
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
      {jobs.map((job, index) => (
        <li key={index}>
          {job}
          <button onClick={() => { removeJob(job) }}>Xóa</button>
        </li>
      ))}
        
      </ul>
    </div>
  );
}

export default App;
