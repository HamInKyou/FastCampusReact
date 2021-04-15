import React from "react";

function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;
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
}

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

export default UserList;
