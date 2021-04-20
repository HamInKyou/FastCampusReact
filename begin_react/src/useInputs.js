import { useReducer, useCallback } from "react";

//이 함수에서 관리할 form에 대하여 초기값을 파라미터로 받아온 다음
//이 Hook이 반환하는 onChange를 사용해서 input의 Change 이벤트를 관리하면 되고,
//상태같은 경우 form으로 조회하고, 초기화하고 싶다면 reset을 호출하면 된다.
//커스텀Hook을 만들 때에는 use키워드 뒤에 기능에 대한 단어를 넣어서 함수를 만들어주자!

/* state로 상태관리하기
function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}
*/

//Reducer로 상태관리하기
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.name]: action.value };
    case "RESET":
      //Object.keys(param) : param으로 들어온 객체의 key를 배열로 만들어 리턴
      //state는 from이고, form의 키들을 배열로 만들어 리턴
      //[username, email] 형태로 남았음
      //.reduce는 누적하면서 수행하는 함수
      //acc[username] = "" 이거 처음 수행하고, 이 배열에 누적으로
      //acc[email] = "" 쌓아서 결과로 보면 acc는 빈 username과 email을 가진 객체가 된다.
      //이걸 리턴해주면 form 비워서 리턴해준다는거!
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}
function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE",
      name,
      value,
    });
  }, []);

  /*내가 쓴답
  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
      initialForm,
    });
  }, [initialForm]);
  */
  //선생님이 제시한 답
  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);

  return [form, onChange, reset];
}

export default useInputs;
