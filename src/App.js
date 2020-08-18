import React from  "react";
import { useState, useEffect } from "react"
import api from './services/api'
import "./styles.css";


function App() {
  const [projects,setProjects] = useState([])

  useEffect(()=>{
    api.get('repositories').then(res=>{
      setProjects(res.data)
    })
  },[])

  async function handleAddRepository() {
    const project = {
      title:`Myproject ${Date.now()}`,
      url:'http:jdjsjd',
      techs:'react'
    }
    const newRepo = await api.post('repositories',project)

    setProjects([...projects],newRepo.data)
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    setProjects([...projects])
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map(project=>

          <li key={project.id}>
            {project.title}
            
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>

      )}
    </ul> 

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
