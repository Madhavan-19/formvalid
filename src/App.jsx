import React ,{useState}from 'react'
import{useFormik} from 'formik'
import './App.css'
import Popup from './Components/popup'



const validate=values=>{
  const errors={};
  if(!values.firstname){
    errors.firstname="*Required";
  }else if(values.firstname.length>8){
    errors.firstname="*Must be 8 charcters or less";
  }
  if(!values.lastname){
    errors.lastname="*Required";
  }else if(values.lastname.length>8){
    errors.lastname="*Must be 8 charcters or less";
  }
  if(!values.emailaddress){
    errors.emailaddress="*Required";
  }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.emailaddress)){
    errors.emailaddress="*invalid Mail";
  }
  if(!values.password){
    errors.password="*Required";
  }else if(values.password.length > 8){
    errors.password="*Must be 4 charcters";
  }
  else if(values.password.length > 4){
    errors.password="*Minimum 4 characters";
  }
  if(!values.conformpassword){
    errors.conformpassword="*Required";
  }else if(values.password!==values.conformpassword){
    errors.conformpassword="*paasword must match";
  }
 return errors;
}
const App=()=>{
  const [bool,setBool]=useState(0);
   const formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      emailaddress:"",
      password:"",
      conformpassword:""
    },
    validate,
    onSubmit : (values,{resetForm}) =>{
      // alert(`hello!, ${values.firstname} You succssfully signed up!` )
      if(bool){
        setBool(0);
        resetForm({})
      }else{
        setBool(1)
        console.table(values)
      }
    }
   });
   console.log(formik.values)
  return(
    <div className='main'>
      <div className='signUp-form'>
        <h2>Sign up Here</h2>
        <form onSubmit={formik.handleSubmit}>
          <input type='text' placeholder='First-Name' name='firstname' autoComplete='off'
           onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur}/>
           {
            formik.touched.firstname && formik.errors.firstname ?<span>{formik.errors.firstname}</span> : null   
           }
          <input type='text' placeholder='Last-Name' name='lastname' autoComplete='off'onChange={formik.handleChange}
           value={formik.values.lastname}onBlur={formik.handleBlur}/>
           {
           formik.touched.lastname&&formik.errors.lastname ?<span>{formik.errors.lastname}</span> : null   
           }
          <input type='text' placeholder='Email-Address' name='emailaddress'autoComplete='off'onChange={formik.handleChange} 
          value={formik.values.emailaddress}onBlur={formik.handleBlur}/>
           {
           formik.touched.emailaddress&&formik.errors.emailaddress ?<span>{formik.errors.emailaddress}</span> : null   
           }
          <input type='password' placeholder=' New-Password' name='password'autoComplete='off'onChange={formik.handleChange}
          value={formik.values.password}onBlur={formik.handleBlur}/>
          {
           formik.touched.password&&formik.errors.password ?<span>{formik.errors.password}</span> : null   
           }
          <input type='password' placeholder='conform-Password' name='conformpassword'autoComplete='off'onChange={formik.handleChange} 
          value={formik.values.conformpassword}onBlur={formik.handleBlur}/>
           {
           formik.touched.conformpassword&&formik.errors.conformpassword ?<span>{formik.errors.conformpassword}</span> : null   
           }
          <button>Submit</button>
        
        </form>
      </div>
      <div className="message-box">
        {
          bool ?(<Popup onClick={formik.handleSubmit}/>):null
        }
      </div>
    </div>
  )
}
export default App;