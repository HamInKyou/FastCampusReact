import React, { createContext, useContext, useState } from "react";

//Context API 예제
//Context API? : 리액트에서 전역적인 값을 관리하는 방법

//ContextSample에서 Child로 props 전달해주기 위해
//중간에 GrandParent, Parent 컴포넌트를 거쳐서 전달을 하고 있다.
//ContextSample에서 Child로 바로 전달할 수 있는 방법 있을까? ---> ContextAPI!

/*
function Child({ text }) {
  return <div>안녕하세요? {text}</div>;
}

function Parent({ text }) {
  return <Child text={text} />;
}

function GrandParent({ text }) {
  return <Parent text={text} />;
}

function ContextSample() {
  return <GrandParent text="GOOD" />;
}
*/

//Context API 사용하기 위해 Context 만들어보자
//Context에서 사용할 기본값을 파라미터로 넣어주자
//이 기본값은 Provider를 통해 값을 지정해주지 않았을 때의 기본값!
//이런 Context를 다른 파일에서 작성한다음, 내보낸다음 불러내서 사용할 수도 있다!
const MyContext = createContext("defaultValue");

function Child() {
  //Context의 값을 갖고와서 사용한다.
  //useContext는 Context에 있는 값을 읽어와서 사용할 수 있게 해주는 리액트 훅이다.
  const text = useContext(MyContext);
  return <div>안녕하세요? {text}</div>;
}

function Parent() {
  return <Child />;
}

function GrandParent() {
  return <Parent />;
}

function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    //Context의 값을 지정해주기 위해
    //Context를 사용하는 제일 위에 있는 곳에서
    //Context 안에 있는 Provider라는 컴포넌트를 사용해야한다.
    //Context.Provider로 감싸주고, value에 지정하고 싶은 값을 넣어주자.
    //이 Context의 값은 useState를 활용하여 유동적으로 바뀔 수도 있다.
    <MyContext.Provider value={value ? "GOOD" : "BAD"}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>CLICK ME!</button>
    </MyContext.Provider>
  );
}

export default ContextSample;
