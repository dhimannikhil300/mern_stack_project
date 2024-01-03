import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  // const[firstName, setFirstName] = useState("");
  // const[lasttName, setLasttName] = useState("");

  
  // function changeFirstHandler(event){
  //   // console.log('Printing First Name ');
  //   // console.log(event.target.value);
  //   setFirstName(event.target.value);
  // }
  // function changeLastHandler(event){
  //   // console.log('Printing Last Name ');
  //   // console.log(event.target.value);
  //   setLasttName(event.target.value);
  // }

const [formData, setFormData] = useState(
    {firstName: "", lastName: "", email: "", comment: "", isVisible:true, mode:"", favCar:"scorpio"}
);
console.log(formData);
function changeHandler(event){
  const {name, value, checked, type} = event.target
  setFormData(prevFormData => {
    return {
      ...prevFormData,
      [name] : type==="checkbox" ? checked : value,
    }
  });
}

function submitHandler(event){
  event.preventDefault();

  console.log("Finally printing the Entireform data .....");
  console.log(formData);
}

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
          <input type="text" placeholder='First Name' onChange={changeHandler} name="firstName"
              value={formData.firstName}
          />
          <br/>
          <br />
          <input type="text" placeholder='Last Name' onChange={changeHandler} name="lastName" 
              value={formData.lastName}
          />
          <br/>
          <br />
          <input type="email" placeholder='Enter your Email Here' onChange={changeHandler} 
            name="email"  value={formData.email}/>

          <br/>
          <br />

          <textarea placeholder='Enter your Comments Here' onChange={changeHandler} name = "comment"
            value={formData.comment}></textarea>

          <br />
          <br />

          <input type="checkbox" onChange={changeHandler} name="isVisible" id="isVisible" 
              checked={formData.isVisible}/>
          <label htmlFor='isVisible'>Am I visible?</label>

          <br />
          <br />

          <fieldset>
            <legend>Mode : </legend>
            <input type="radio" onChange={changeHandler} name="mode" value="Online Mode"
              id="Online-Mode" checked={formData.mode == "Online Mode"} />
            <label htmlFor="Online-Mode">Online Mode</label>

            <input type="radio" onChange={changeHandler} name="mode" value="Offline Mode"
              id="Offline-Mode" checked={formData.mode == "Offline Mode"}/>
            <label htmlFor="Offline-Mode">Offline Mode</label>
          </fieldset>
          <br />
          <br />

          <label htmlFor="favCar">Tell me your Favourite Car </label>
          <select onChange={changeHandler} name="favCar" id="favCar" value={formData.favCar}>
            <option value="scorpio">Scorpio</option>
            <option value="Fortuner">Fortuner</option>
            <option value="Thar">Thar</option>
          </select>

          {/* <input type="submit" value='submit' /> */}
          <br />
          <button>Submit</button>

          
      </form>
    </div>
  );
}

export default App;
