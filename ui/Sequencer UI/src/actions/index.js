import {Base_URL} from '../constant/apilink'

export function Authenticate(){
    const output = fetch(`${Base_URL}/authenticate`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        mode:'cors',
        body:JSON.stringify({
            "username": "test",
            "password": "test"
        })

    })
    .then(function(response) {
        response.text().then((out) => localStorage.setItem('token', JSON.parse(out).token));
      })
    return{
        type:'GET_Authenticate',
        payload:output
    }
}

export function Generator(gen,seq,data,token,typeR) {
    localStorage.removeItem('outVal')
    const URL = (gen === "piped")?`${Base_URL}/${gen}/${seq}/${typeR}`:`${Base_URL}/${gen}/${seq}`;
    console.log(URL)
    const output = fetch(URL,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        mode:'cors',
        body:JSON.stringify({
            "params":data
        })
    })
    .then(function(response) {
        response.text().then((out) => console.log(out));
      })
    return{
        type:'GET_APPROVE',
        payload:output
    }
  }

  export function NextOuput(token,gen){
      console.log(`${Base_URL}/${gen}/next`)
      localStorage.removeItem('outVal')
    const output = fetch(`${Base_URL}/${gen}/next`,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        mode:'cors'
    })
    .then(function(response) {
        return response.text().then((out) => {
            if (out.done) {
                return 'end';
            } else {
                return JSON.parse(out).value;
            }
        });
      })
    return{
        type:'GET_NEXT',
        payload: output
    }
  }