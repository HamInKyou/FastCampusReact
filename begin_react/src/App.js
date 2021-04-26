import React, { useReducer, useMemo, createContext } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
import produce from "immer";

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
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
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
