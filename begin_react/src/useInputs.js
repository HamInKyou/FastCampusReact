import { useState, useCallback } from "react";

//이 함수에서 관리할 form에 대하여 초기값을 파라미터로 받아온 다음
//이 Hook이 반환하는 onChange를 사용해서 input의 Change 이벤트를 관리하면 되고,
//상태같은 경우 form으로 조회하고, 초기화하고 싶다면 reset을 호출하면 된다.
//커스텀Hook을 만들 때에는 use키워드 뒤에 기능에 대한 단어를 넣어서 함수를 만들어주자!
function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;
