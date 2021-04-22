import React, { useContext, useRef } from "react";
import { UserDispatch } from "./App";
import useInputs from "./useInputs";

//유저 추가할 때 사용할 컴포넌트
//필요한 값들을 props로 갖고와서 사용
//내부에서 상태 관리는 하지 않을 것이다.
function CreateUser() {
  const dispatch = useContext(UserDispatch);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const { username, email } = form;
  const nextId = useRef(4);

  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  };
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

//React.memo()
//컴포넌트에서 리렌더링이 불필요할 경우에는 렌더링 했던 결과를 재사용할 수 있게 해준다.
//컴포넌트의 리렌더링 성능을 최적화시켜줄 수 있다.
//React.memo 를 사용하면 props가 바뀌었을 때만 리렌더링을 해준다!
export default React.memo(CreateUser);
