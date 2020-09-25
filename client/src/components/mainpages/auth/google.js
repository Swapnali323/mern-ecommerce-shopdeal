import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function Google() {
  // console.log(clientId);
  const responseGoogle =(response) => {
    console.log(response);
    console.log("type of",typeof(response))
   axios({
      method: 'POST',
      url: 'user/google_signin',
      data: { idToken: response.tokenId }
      
    })
  // await axios.post('/user/google_signin' )
      .then(response => {
        console.log('GOOGLE SIGNIN SUCCESS', response);
        // inform parent component
        // informParent(response);
        localStorage.setItem('firtLogin', true)
        window.location.href = "/";
      })
      // .catch(error => {
      //   console.log('GOOGLE SIGNIN ERROR', error.response);
      // });
  };
  const responseErrorGoogle= response=>{
    console.log(response)
  }
  return (
    <div className='pb-3'>
      <GoogleLogin
        clientId='35746752649-8gulr2l93p5lmn3imql443bs9c3ehe86.apps.googleusercontent.com'
        onSuccess={responseGoogle}
        onFailure={responseErrorGoogle}
        // render={renderProps => (
        //   <button
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //     className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
        //   >
        //     <div className=' p-2 rounded-full '>
        //       <i className='fab fa-google ' />
        //     </div>
        //     <span className='ml-4'>Sign In with Google</span>
        //   </button>
        // )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Google;