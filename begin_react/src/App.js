import React, { useRef, useState } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function App() {
  //useState로 input 상태 관리 -> 객체로 input 관리
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  //상태 관리 쉽게 하기 위해 input 안에 있는 요소들 비구조화 할당으로 꺼내기
  const { username, email } = inputs;

  //input의 내용 바뀔 때마다 호출해주는 함수
  const onChange = (e) => {
    //이벤트 발생한 DOM의 속성들 비구조화 할당으로 꺼내기
    const { name, value } = e.target;

    //기존의 상태를 들고 복사해온 뒤에 바꾸려는 값만 덮어씌워준다.
    //불변성을 지키기 위해서!
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //유저들도 State로 관리
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "김길동",
      email: "Kim.GilDong@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "이길동",
      email: "Lee.GilDong@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "박길동",
      email: "Park.GilDong@gmail.com",
      active: false,
    },
  ]);

  //useRef
  //특정 DOM을 선택할 때 사용하거나,
  //렌더링과 전혀 관계없는 변수같은걸 관리할 때에도 사용할 수 있다.
  //nextId는 리렌더링 되어도 기억된다!
  //useRef(초기값) : useRef로 관리할 값의 초기값을 파라미터로 넣는다.
  const nextId = useRef(4);

  const onCreate = () => {
    //생성할 새로운 유저 객체를 만들어준다.
    const user = {
      id: nextId.current,
      username,
      email,
    };

    //users상태 관리
    //spread 연산자로 기존의 users 배열 복사해온 뒤, 뒤에 새로운 유저 객체 user를 붙인다.
    //불변성을 위해서! -> .push 이런걸로 추가하면 안돼!
    setUsers([...users, user]);

    /*  users에 추가해주는 또 다른 방법
    concat : 복사해서 새로운 배열을 만든 뒤에 user를 뒤에 붙여준다!
    setUsers(users.concat(user))
    */

    //제출시 input 안에 있는 값들 다 지워주게
    setInputs({
      username: "",
      email: "",
    });

    //nextId.current 를 하면 useRef로 기억되는 컴포넌트 안의 현재 변수값을 갖고온다.
    console.log(nextId.current);

    //nextId 사용하고 나서, create해서 유저 늘어났으니 nextId 값도 1 키운다.
    nextId.current += 1;
  };

  const onRemove = (id) => {
    //불변성을 지키면서 삭제하기 위한 방법
    //filter : 배열에서 조건 만족하는 원소들만 남기는 거
    //파라미터로 넘어온 id랑 비교해서, 일치하지 않는 애들만 남긴다! -> 일치하는 애를 지우겠다는 거!
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    //유저 이름 클릭했을 때 active true <-> false 토글해주는 함수
    //배열의 불변성을 지키면서 업데이트
    //배열 안의 원소를 업데이트 할 때에는 .map 함수를 사용하자!
    setUsers(
      // 파라미터로 들어온 id와 일치하는 유저에 대해서 업데이트
      // spread함수로 기존의 user 객체 복사해온 다음, 수정할 값만 업데이트 해주자!
      // 불변성을 위해서!
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="App">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}

export default App;
