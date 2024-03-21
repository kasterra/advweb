
window.onload = ()=>{
  const form = document.querySelector("form");

  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const output = document.querySelector("#nickname")
    const input = document.querySelector("form input")
    output.innerHTML = `입력받은 애칭 : ${input.value}`
  })

}