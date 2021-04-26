import produce from "immer"; //보통 immer를 produce라는 이름으로 불러온다.

//Immer 설명을 위한 임시 js 파일
//Immer : 불변성을 더 쉽게 지킬 수 있게 해준다.

//객체가 있다고 가정해보자.
const object = {
  a: 1,
  b: 2,
};

object.b = 3;
//이렇게 값에 직접 수정을 가하는 행위는 불변성을 깨트리는 행위!

const nextObject = {
  ...object,
  b: 3,
};
//그 대신에 이렇게 spread 연산자를 사용해서
//새로운 객체를 만들고, 기존의 값을 집어넣고 새로운 값을 덮어쓰는 방식이 올바른 방식
//이렇게 해야 나중에 컴포넌트가 제대로 리렌더링도 되고, 컴포넌트 최적화를 할 수 있다.

//배열이 있다고 가정해보자
const todos = [
  {
    id: 1,
    text: "할 일 #1",
    done: true,
  },
  {
    id: 2,
    text: "할 일 #2",
    done: false,
  },
];

todos.push({
  id: 3,
  text: "할 일 #3",
  done: false,
});

todos.splice(
  todos.findIndex((todo) => todo.id === 2),
  1
);

const selected = todos.find((todo) => todo.id === 2);
selected.done = !selected.done;
//배열도 마찬가지로 push, splice 같은 함수를 사용하거나, n번째 항목을 직접 수정하면 안된다!

const inserted = todos.concat({
  id: 3,
  text: "할 일 #3",
  done: false,
});

const filtered = todoes.filter((todo) => todo.id !== 2);

const toggled = todos.map((todo) =>
  todo.id === 2
    ? {
        ...todo,
        done: !todo.done,
      }
    : todo
);
//그 대신에, concat, filter, map 같은 함수로 새로운 배열을 만들어내어 불변성을 지켜줄 수 있다!
//이런식으로 하면 불변성을 지킬 순 있지만, 상태가 복잡해지면 불변성을 지켜가면서 새로운 상태를 만들어내는게 복잡해진다.

const state = {
  posts: [
    {
      id: 1,
      title: "제목입니다.",
      bodt: "내용입니다.",
      //이 comments에 새로운 댓글 객체를 추가한다고 가정해보자.
      comments: [
        {
          id: 1,
          text: "와 정말 잘 읽었습니다.",
        },
      ],
    },
    {
      id: 2,
      title: "제목입니다.",
      bodt: "내용입니다.",
      comments: [
        {
          id: 2,
          text: "또 다른 댓글 어쩌고 저쩌고",
        },
      ],
    },
  ],
  selectedId: 1,
};

const nextState = {
  ...state, //spread 연산자로 state 집어넣고
  posts: state.posts.map(
    (post) =>
      //posts 에서 id가 1인 포스트라면
      post.id === 1
        ? {
            //spread 연산자로 post 집어넣고 comment 추가
            ...post,
            comments: post.comments.concat({
              id: 3,
              text: "새로운 댓글",
            }),
          }
        : post //아니면 post 그대로 냅두고
  ),
};
//...어려운 건 아닌데 상태가 꽤 복잡하다..!

//우리가 앞으로 Immer 라는 라이브러리를 사용하면 다음과 같이 간편해질 수 있다!
//dreaft에다가 우리가 불변성을 신경쓰지 않고 바로 값을 바꿔줄 수 있다.
/*
const nextState = produce(state, (draft) => {
  //특정 포스트를 id를 갖고 찾았다!
  const post = draft.posts.find((post) => post.id === 1);
  //해당 post가 들고 있는 comments에 바로 push할 수 있게 된다!
  post.comments.push({
    id: 3,
    text: "와 정말 쉽다!",
  });
});
*/
//immer를 사용하면 불변성을 해치는 코드를 작성해도 대신 불변성 유지를 해준다!

//immer 예제 1
const state = {
  number: 1,
  dontChangeMe: 2,
};
//produce 함수 (immer) 를 사용하며,
//첫번째 파라미터로 우리가 바꿔주고자 하는 객체 혹은 배열을 넣어준다.
//두번째 파라미터로는 어떻게 바꿀지 알려주는 함수를 넣어준다.
//이 함수는 draft라는 값을 파라미터로 받아와서, 내부에서 하고싶은 작업을 해준다.
const nextState = produce(state, (draft) => {
  //이 함수 내에서 불변성을 맞추지 않으면서 업데이트를 해줘도, produce가 알아서 불변성을 유지해준다.
  draft.number += 1;
});

//immer 예제 2
const array = [
  {
    id: 1,
    text: "hello",
  },
  {
    id: 2,
    text: "bye",
  },
  {
    id: 3,
    text: "lalalala",
  },
];

const nextArray = produce(array, (draft) => {
  draft.push({ id: 4, text: "blabla" }); //원소 하나 추가하고
  draft[0].text = draft[0].text + " world"; //첫번째 원소의 텍스트 뒤에 world 붙여주자
});
//내부 함수에서 불변성 신경 안쓰고 업데이트 해줬는데, 알아서 불변성 처리해줌 (기존의 배열 건드리지 않음)

//예제3
//함수형 업데이트를 통한 useState
/*
const [todo, setTodo] = useState({
  text: "Hello",
  done: false,
});
*/
/*
const onClick = useCallback(() => {
  setTodo((todo) => ({
    ...todo,
    done: !todo.done,
  }));
}, []);
*/
//setTodo에 그 다음 상태를 넣어주는게 아니라, 어떻게 업데이트할지 정의하는 함수를 넣어주었다.
//이 방식을 활용하면 deps에 기존 todo를 넣어줄 필요가 없었다는 장점이 있었다!

//원래 immer 사용할 때, produce의 첫번째 파라미터로 state를 넣어주고,
//두번째 파라미터로 draft를 파라미터로 가져오는 함수를 넣어줬었는데,
//아래처럼 파라미터에 state를 생략하고 함수만 넣어줬을 경우
//이 produce함수의 결과물은 updater 함수가 된다.
/*
const updater = produce((draft) => {
  draft.done = !draft.done;
});
const nextTodo = updater(todo);
//updater가 하나의 함수이기 때문에, updater에 todo를 넣어서 쓰자!
*/

//함수형 업데이트 할 떄 immer를 사용한다면?
//setTodo에 업데이트할 때 쓰이는 함수를 넣어도 되었기에,
//updater 함수를 여기에 만들어서 넣어주자!
/*
const onClick = useCallback(() => {
  setTodo(
    produce((draft) => {
      draft.done = !draft.done;
    })
  );
}, []);
*/
