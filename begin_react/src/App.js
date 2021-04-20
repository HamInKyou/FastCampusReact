import React, { useRef, useState, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

//useRef
//특정 DOM을 선택할 때 사용하거나,
//렌더링과 전혀 관계없는 변수같은걸 관리할 때에도 사용할 수 있다.

//useState
//상태관리를 위한 함수

//useMemo
//useMemo를 쓰면 특정 값이 바뀌었을 때만 특정 함수를 수행해서 연산하게한다!
//만약에 원하는 값이 바뀌지 않았다면 리렌더링 할 때 이전에 만들었던 값을 재사용할 수 있게 해준다.

//useCallback
//이전에 만들었던 함수를 새로 만들지 않고 재사용!
//컴포넌트가 리렌더링될 때마다 새로운 함수를 만들었었다.
//이 작업은 리소스를 많이 차지하는 작업은 아니지만, 그럼에도 불구하고 한번 만든 함수를 재사용할 수 있다면 재사용하는게 좋다!
//컴포넌트들이 props가 바뀌지 않았다면 virtual DOM이 하는 리렌더링조차 안하게끔 만들어줄 수 있다.
//만약에 props가 바뀌지 않았더라면 virtual DOM을 새로 그리는게 아니라, 이전에 만들었던 결과물들을 재사용할 수 있게 만들 수 있다.
//이렇게 하려면 매번 함수가 새로 만들어지는 구조면 최적화하지 못한다. 이럴 떄 useCallback 쓴다!
//이렇게 한다고 눈에 띄는 최적화는 없지만, 나중에 컴포넌트 리렌더리 성능 최적화 작업을 해줘야만 성능이 좋아진다.

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");

  //유저 목록에서 필터로 활성화 상태인 애들만 거르고
  //걔네 수 세기
  return users.filter((user) => user.active).length;
}
function App() {
  //useState로 input 상태 관리 -> 객체로 input 관리
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  //상태 관리 쉽게 하기 위해 input 안에 있는 요소들 비구조화 할당으로 꺼내기
  const { username, email } = inputs;

  //input의 내용 바뀔 때마다 호출해주는 함수
  //useCallback 함수로 감쌌기 때문에
  //inputs가 바뀔 때만 함수를 새로 만들고,
  //그렇지 않다면 기존에 만든 함수를 재사용한다!
  const onChange = useCallback(
    (e) => {
      //이벤트 발생한 DOM의 속성들 비구조화 할당으로 꺼내기
      const { name, value } = e.target;

      //기존의 상태를 들고 복사해온 뒤에 바꾸려는 값만 덮어씌워준다.
      //불변성을 지키기 위해서!
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

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

  //useCallback 함수로 감쌌기 때문에
  //deps에 들어간 상태, username, email, users가 바뀔 때마다 새로 함수를 만든다.
  //그렇지 않다면 기존에 만든 함수를 재사용한다!
  //deps에 상태를 넣는걸 깜빡하게 된다면,
  //이 함수 내부에서 해당 상태들을 참조하게 될 때, 가장 최신의 상태를 참조하는 게 아니라
  //이전의, 컴포넌트가 처음 만들어졌을 때의 옛날의 상태를 참조하게 될 수 있기 때문에 깜빡하면 안된다!
  //만약에, useCallback 내부에서 참조하게 되는 상태, 혹은 props로 받아온 값이 있다면 이 안에 넣어줘야한다!
  //+ props로 함수가 넘어온걸, 이 함수 내에서 쓴다해도 그 함수 이름을 deps 안에 넣어줘야 한다!
  const onCreate = useCallback(
    () => {
      //생성할 새로운 유저 객체를 만들어준다.
      const user = {
        id: nextId.current,
        username,
        email,
      };

      //users상태 관리
      //spread 연산자로 기존의 users 배열 복사해온 뒤, 뒤에 새로운 유저 객체 user를 붙인다.
      //불변성을 위해서! -> .push 이런걸로 추가하면 안돼!
      /*
      setUsers([...users, user]);
      */
      //함수형 업데이트를 사용해서 deps에 users 안넣어도 되게 하자!
      setUsers((users) => [...users, user]);

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
    },
    //useState의 함수형 업데이트를 사용해서 setUsers 하자!
    //함수형 업데이트를 하면 deps에 users 안넣어도 된다!
    //[username, email, users]
    [username, email]
  );

  //useCallback 함수로 감쌌기 때문에
  //deps에 들어간 상태, users가 바뀔 때마다 새로 함수를 만든다.
  //그렇지 않다면 기존에 만든 함수를 재사용한다!
  const onRemove = useCallback(
    (id) => {
      //불변성을 지키면서 삭제하기 위한 방법
      //filter : 배열에서 조건 만족하는 원소들만 남기는 거
      //파라미터로 넘어온 id랑 비교해서, 일치하지 않는 애들만 남긴다! -> 일치하는 애를 지우겠다는 거!
      /*
      setUsers(users.filter((user) => user.id !== id));
      */

      //함수형 업데이트를 사용해서 deps에 users 안넣어도 되게 하자!
      setUsers((users) => users.filter((user) => user.id !== id));
    },
    //users가 deps에 있다.
    //users 배열이 바뀌면 onRemove가 바뀌고,
    //그렇게 되면 userList 입장에서는 props가 바뀐걸로 받아들여 리렌더링 해야한다.
    //이걸 해결하려면 기존 users를 참조하면 안된다!
    //useState의 함수형 업데이트를 사용해서 setUsers 하자!
    //함수형 업데이트를 하면 deps에 users 안넣어도 된다!
    //[users]
    []
  );

  //useCallback 함수로 감쌌기 때문에
  //deps에 들어간 상태, users가 바뀔 때마다 새로 함수를 만든다.
  //그렇지 않다면 기존에 만든 함수를 재사용한다!
  const onToggle = useCallback(
    (id) => {
      //유저 이름 클릭했을 때 active true <-> false 토글해주는 함수
      //배열의 불변성을 지키면서 업데이트
      //배열 안의 원소를 업데이트 할 때에는 .map 함수를 사용하자!
      /*
      setUsers(
        // 파라미터로 들어온 id와 일치하는 유저에 대해서 업데이트
        // spread함수로 기존의 user 객체 복사해온 다음, 수정할 값만 업데이트 해주자!
        // 불변성을 위해서!
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
      */

      //함수형 업데이트를 사용해서 deps에 users 안넣어도 되게 하자!
      setUsers((users) =>
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    //users가 deps에 있다.
    //users 배열이 바뀌면 onToggle가 바뀌고,
    //그렇게 되면 userList 입장에서는 props가 바뀐걸로 받아들여 리렌더링 해야한다.
    //이걸 해결하려면 기존 users를 참조하면 안된다!
    //useState의 함수형 업데이트를 사용해서 setUsers 하자!
    //함수형 업데이트를 하면 deps에 users 안넣어도 된다!
    //[users]
    []
  );

  //이렇게 할 경우
  //같은 컴포넌트 안에 속하는 input이 onChange 이벤트로 리렌더링 될 때마다
  //활성 사용자수를 계속 다시 세게 된다.
  //이렇게 하는건 불필요함!
  //const count = countActiveUsers(users);

  //useMemo를 써보자!
  //useMemo를 쓰면 특정 값이 바뀌었을 때만 특정 함수를 수행해서 연산하게한다!
  //만약에 원하는 값이 바뀌지 않았다면 리렌더링 할 때 이전에 만들었던 값을 재사용할 수 있게 해준다.
  //첫번째 파라미터는 수행할 특정 함수
  //두번째 파라미터는 deps, 이 안에 들어간 특정 값이 바뀌었을 때만 함수 수행!
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <div className="App">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      {/*
        UserList에 onRemove랑 onToggle 전달해주고 있다.
        UserList에서는 User컴포넌트랑 UerList 컴포넌트에 React.memo해서
        만약에 props가 바뀌지 않았다면 리렌더링을 방지하게 해줬다.
       */}
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count} </div>
    </div>
  );
}

export default App;
