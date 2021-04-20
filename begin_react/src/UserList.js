import React from "react";

//useEffect
//컴포넌트가 처음 화면에 나타나게 될 때, 사라지게 될 때,
//컴포넌트의 props나 state가 바뀌어서 업데이트 될 때, 업데이트 되기 전
//어떠한 작업을 수행 가능하다!
//useEffect는 두개의 파라미터로 구성.
//첫번째 파라미터는 우리가 실행하고자 하는 함수
//두번째 파라미터는 deps라고 하며(dependency 약자), 의존되는 값들을 배열 안에 넣어준다.
//배열이 비어있다면, 컴포넌트가 처음 화면에 나타날 때에만 수행이 된다.

//useMemo
//이전에 연산된 값을 재사용
//주로 성능을 최적화해야하는 상황에서 사용
const User = React.memo(function ({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;

  /* 예제 1
  useEffect(() => {
    //마운트되고 나서 수행
    console.log("컴포넌트가 화면에 나타남");

    //cleaner 함수(뒷정리 함수)
    //useEffect 안의 함수에서 함수를 리턴하면 그 함수를 cleaner 함수라 한다.
    //컴포넌트가 언마운트 될 때 이 함수를 수행한다!
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    }
  }, []);
  */

  /*예제 2
  // useEffect에 설정된 함수는, deps 배열 안에 있는 값이 설정되거나, 바뀔 때마다 호출이 된다.
  // 마운트 되고 나서도 수행되고, 업데이트 된 직후에도 수행된다.
  // 만약에 useEffect로 등록된 함수에서 props로 받아온 값을 참조하거나,
  // 함수를 참조할 때에도 마찬가지! 함수도 deps 안에 넣어줘야한다.
  // useState로 관리하고 있는 값을 참조하고 있는 경우에는, 그 값을 deps 안에 넣어주자!
  useEffect(() => {
    console.log("user 값이 설정 됨");
    console.log(user);

    //useEffect의 deps 안에다가 어떤 값을 넣게 된다면
    //cleaner 함수는 해당 컴포넌트가 바뀌기 직전(업데이트 직전), 사라지기 직전에 호출이 된다.
    return () => {
      console.log("user 값이 바뀌기 전");
      console.log(user);
    };
  }, [user]);
  */

  /*예제 3
  // deps를 아예 쓰지 말아보자
  // 컴포넌트가 리렌더링 된 이후에 호출이 될텐데,
  // 모든 컴포넌트에서 useEffect가 실행될 것이다.
  // 이유?
  // 리액트 컴포넌트에서는 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 리렌더링 되는데,
  // User 컴포넌트의 부모 컴포넌트는 UserlIst고, UserList에서 users props가 변경이 되게 된다면
  // UserList 컴포넌트가 리렌더링 되는거고, 그에 따라 자식인 User 컴포넌트 모두가 리렌더링 된다.
  useEffect(() => {
    console.log(user);
  });
  */

  return (
    <div>
      <b
        style={{
          color: active ? "green" : "black",
          cursor: "pointer",
        }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>{" "}
      <span>({email})</span>
      {/*
      onclick에서 새로 함수를 만들어 호출하는 이유
      파라미터를 넣어서 호출하기 위해선 새로 함수를 만들어야한다.
      함수를 새로 만들지 않고, 바로 파라미터 넣어서 호출하면, 렌더링시 바로 호출된다!
       */}
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

//React.memo()
//컴포넌트에서 리렌더링이 불필요할 경우에는 렌더링 했던 결과를 재사용할 수 있게 해준다.
//컴포넌트의 리렌더링 성능을 최적화시켜줄 수 있다.
//React.memo 를 사용하면 props가 바뀌었을 때만 리렌더링을 해준다!
/*
export default React.memo(UserList);
*/
//추가적으로, 두번째 파라미터로 propsAreEqual 함수를 넣을 수도 있다!
//전. 후의 props를 받아와서 비교해주는데,
//만약에 true를 반환하면 리렌더링 방지하고, false를 반환하면 리렌더링 하게한다.
//UserList의 경우 onRemove, onToggle 안 바뀔거라는거 알기 때문에 적용시켜줄 수 있다.
//근데 이 경우에는 props가 정말 고정적이여서 비교를 할 필요가 없는건지 꼭 확인해주어야한다.
export default React.memo(
  UserList,
  (prevProps, nextProps) => nextProps.users === prevProps
);
