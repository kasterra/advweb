import {useNavigate} from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userName = data.get('username');
    const userType = data.get('type');
    const res = await fetch(`/api/user?userName=${userName}&userType=${userType}`,{
      method:"GET",
    })
    if(res.ok){
      const json = await res.json();
      console.log(json);
      sessionStorage.setItem("ID",json.userID);
      if(userType === "counselor"){
        navigate('/consel');
      }
      else if(userType === 'client'){
        navigate('/client');
      }
    }
  }


  return <form onSubmit={onSubmit}>
    <label htmlFor="username">사용자 이름</label>
    <input type="text" id="username" name="username"></input>
    <label><input type="radio" name="type" id="type" value="counselor"/>상담사</label>
    <label><input type="radio" name="type" id="type" value="client"/>상담자</label>
    <input type="submit" value="제출" />
  </form>
}

export default Index;