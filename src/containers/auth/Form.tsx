import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./Form.module.css";
import { FC, useState } from "react";
interface FormProps {
  titleLinkText: string;
  titleLink: string;
  titleh4: string;
  title: string;
  handleClick: (email: string, password: string, name: string) => void;
  displayNone?: string;
  container: string;
}
const Form: FC<FormProps> = ({
  titleLinkText,
  titleLink,
  titleh4,
  title,
  handleClick,
  displayNone,
  container,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <>
      <div className={styles.box}>
        <div className={container}>
          <form
            className={styles.containerBox}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>{title}</h1>
            <div className={displayNone}>
              <h2>Name</h2>
              <input
                type="text"
                {...(register("name"), { required: true })}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Your name"
              />
              <div style={{ height: 20 }}>{errors?.name && <p>error</p>}</div>
            </div>
            <div>
              <h2>Email</h2>
              <input
                type="email"
                value={email}
                {...(register("email"), { required: true })}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Your email"
              />
              <div style={{ height: 20 }}></div>
            </div>
            <div>
              <h2>Password</h2>
              <input
                type="password"
                {...(register("password"), { required: true, minLength: 6 })}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Your password"
              />
              <div style={{ height: 20 }}></div>
            </div>
            <div className={displayNone}>
              <h2>Confirm password</h2>
              <input
                type="password"
                {...(register("password"), { required: true, minLength: 6 })}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Confirm password"
              />
              <div style={{ height: 20 }}></div>
            </div>
            <button
              type="submit"
              className={styles.signIn}
              onClick={() => {
                handleClick(email, password, name);
              }}
            >
              {title}
            </button>
          </form>
          <h4>
            {titleh4}
            <Link to={titleLink}>{titleLinkText}</Link>
          </h4>
        </div>
      </div>
    </>
  );
};
export default Form;
