import React, { useState } from "react";
import styles from './Restore.module.css'

const index = () => {
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
    <div className={styles.formWrapper}>
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="password" className={styles.formComponent}>
          New password
          <input type="password" id="password" onChange={onInput} />
        </label>
        <label htmlFor="password_repeated" className={styles.formComponent}>
          Repeat password
          <input type="password" id="password_repeated" onChange={onInput} />
        </label>
        <button type="submit" className={styles.formComponent}>Ok</button >
      </form>
    </div>

  );
};

export default index;
