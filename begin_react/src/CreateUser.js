import React from "react";

//유저 추가할 때 사용할 컴포넌트
//필요한 값들을 props로 갖고와서 사용
//내부에서 상태 관리는 하지 않을 것이다.
function CreateUser({ username, email, onChange, onCreate }) {
  //onChange : input 안의 값이 바뀔 때마다 호출할 함수
  //onCreate : 버튼을 눌렀을 때 새로운 항목을 등록해주는 함수
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}
export default CreateUser;
