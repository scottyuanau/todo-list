import './App.css';
import styled from 'styled-components';
import React, {useState} from 'react';

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Text = styled.input`
border: 2px solid #000;
height:1.5rem;
`
const Button = styled.button`
display: inline-block;
flex: 1;
border: none;
background-color: teal;
color: white;
height: 30px;
width: 50px;
border-radius: 2px;
cursor: pointer;
margin:5px;
`;

const Tasks = styled.div`
`;

const TaskCount = styled.span`
margin: 10px;
`;

const LIST = styled.li`
listStyle:none;
text-decoration: 'line-through';
`;

const Warning = styled.p`
color: red;
font-weight: 600;
font-size:0.8rem;
margin-top: 0;
`;

const TaskArea = styled.div`
display: grid;
grid-template-columns: 50% 50%;
`;

function App() {

  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]); //parent input list
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [warning, setWarning] = useState('');
  let [pendingTask, setPendingTask] = useState([]); //filtered from list
  let [completeTask, setCompleteTask] = useState([]);  //filtered from list
  let [list, setList] = useState([]); //processed list from todolist

  function handleClick(){
    const id = todoList.length + 1;
    if(!input) {
        setWarning('The input box cannot be empty.'); //input check
    } else {
    setTodoList( (previous)=>[
      ...previous,
      {
        id:id,
        task:input,
        complete:false,
      },
    ])
    setList((previous)=>[
      ...previous,
      {
        id:id,
        task:input,
        complete:false,
      }
    ])
    setInput(''); //clear input once the new item has been added.
    setWarning(''); //clear warning
  } }
  
    function handleComplete(id){
      todoList.forEach((task)=>{ //need to mutate original list, don't use map.
        if (task.id == id) {
          if(!task.complete) {
            setCompletedTaskCount(completedTaskCount + 1);
            task.complete = !task.complete;
          } 
      }});

     pendingTask = todoList.filter((item)=>!item.complete);
     completeTask = todoList.filter((item)=>item.complete);
    
      setList(pendingTask);
      setCompleteTask(completeTask);
      
      
    }

    function handleReverse(id) {
      todoList.forEach((task)=>{ //need to mutate original list, don't use map.
        if (task.id == id) {
          if(task.complete) {
            setCompletedTaskCount(completedTaskCount - 1);
            task.complete = !task.complete;
          } 
      }});
      completeTask = todoList.filter((item)=>item.complete);
      pendingTask = todoList.filter((item)=>!item.complete);
      setCompleteTask(completeTask);
      setList(pendingTask);
    }

    function handleClear(){
        setTodoList([])
        setList([])
        setCompleteTask([])
        setPendingTask([])
        setWarning('')
        setCompletedTaskCount(0)
    }

  return (
    <Container>
        <div>
          <h2>Todo List</h2>
          <Text value={input} onInput = {(event)=>setInput(event.target.value)}/>
          
          <Button onClick={()=>handleClick()}>Add</Button>
          <Button onClick = {()=>handleClear()}>Clear</Button>
          <Warning>{warning}</Warning>
          <Tasks>
            <TaskCount>
              <b>Pending Tasks</b> {todoList.length - completedTaskCount}
            </TaskCount>
            <TaskCount>
              <b>Completed Tasks</b> {completedTaskCount}
            </TaskCount>
          </Tasks>
          <TaskArea>
          <div className='pendingTasks'>
            <ul>
            {
              list.map((todo)=>{
                return (
                  <LIST 
                  complete = {todo.complete}
                  id={todo.id}
                  onClick = {()=>handleComplete(todo.id)}
                  style={
                    {
                      listStyle:"none",
                      textDecoration: todo.complete &&"line-through",
                    }
                  }
                  >
                    {todo.task}
                  </LIST>
                )
              })
            }
            </ul>
          </div>
          <div className='completedTasks'>
            <ul>
            {
              completeTask.map((todo)=>{
                return (
                  <LIST 
                  complete = {todo.complete}
                  id={todo.id}
                  onClick = {()=>handleReverse(todo.id)}
                  style={
                    {
                      listStyle:"none",
                      textDecoration: todo.complete &&"line-through",
                    }
                  }
                  >
                    {todo.task}
                  </LIST>
                )
              })
            }
            </ul>
          </div>
          </TaskArea>
        </div>
    </Container>
  )
}



export default App;
