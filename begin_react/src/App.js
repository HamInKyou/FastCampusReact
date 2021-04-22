import React, { useReducer, useMemo, createContext } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

//컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 BOOLEAN 값이라면 useState로 관리하는게 편하지만,
//상태가 복잡해지면 useReducer가 좀 더 편해질 수 있다.

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

//App 컴포넌트에서 사용할 초기 상태를 컴포넌트 바깥에 선언해주자.
const initialState = {
  users: [
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
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
