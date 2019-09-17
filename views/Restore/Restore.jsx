const React = require('react')
const {useState} = React;
const Html = require('../Html/Html')

const Restore = ()=> {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    console.log({ password, passwordRepeated });
  };

  const onInput = ({ target: { id, value } }) => {
    console.log(id);
    switch (id) {
      case "password":
        setPassword(value.trim());
        console.log({ password });
        break;
      case "password_repeated":
        setPasswordRepeated(value.trim());
        console.log({ passwordRepeated });
        break;
      default:
        break;
    }
  };

  return (
    <Html title="Admin tools">
    <div className="formWrapper">
      <form action="" className="form" onSubmit={onSubmit}>
        <label htmlFor="password" className="formComponent">
          New password
          <input type="password" id="password" onChange={onInput} />
        </label>
        <label htmlFor="password_repeated" className="formComponent">
          Repeat password
          <input type="password" id="password_repeated" onChange={onInput} />
        </label>
        <button type="submit" className="formComponent">Ok</button >
      </form>
    </div>
    </Html>
)
};

module.exports = Restore;


