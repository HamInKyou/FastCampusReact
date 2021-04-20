import React, { useReducer } from "react";

//이전에는 컴포넌트 상태를 업데이트 할 때 useState를 사용해서 새로운 상태를 설정해주었다.
//useReducer를 사용해서 상태를 업데이트 할 수도 있다.

//useState애서는 설정하고 싶은 다음 상태를 직접 지정해주는 방식으로 상태를 업데이트하는 반면,
//useReducer는 action이라는 객체를 기반으로 상태를 업데이트한다.
//action 객체라는 것은 업데이트 할 때 참조하는 객체있다.
//type이라는 값을 활용하여 어떤 업데이트를 할 것인지 명시할 수 있고,
//업데이트할 때 필요한 참조하고 싶은 다른 값이 있다면 이 객체 안에 넣을 수 있다.

//useReducer를 활용하면 컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.
//심지어 다른 파일에 작성 후 불러와서 사용할 수도 있다.

//reducer 함수 : 상태를 업데이트 하는 함수
//현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 형태를 갖추고 있어야 한다.
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
    //혹은
    // throw new Error('Unhandled action)
  }
}

function Counter() {
  //useReducer는 다음과 같이 활용한다.
  //첫번째 파라미터로는 위에서 만든 reducer 함수를 넣고,
  //두번째 파라미터로는 기본값을 넣어준다!
  //number는 현재 상태를 나타내고
  //dispatch는 액션을 발생시키는 함수이다!m
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    //dispatch로 액션을 발생시킨다!
    dispatch({
      type: "INCREMENT",
    });
  };

  //dispatch로 액션을 발생시킨다!
  const onDecrease = () => {
    dispatch({
      type: "DECREMENT",
    });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
