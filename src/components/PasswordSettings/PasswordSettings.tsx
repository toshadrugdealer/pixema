import { useState, ChangeEvent } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  AuthCredential,
} from "firebase/auth";
import styles from "./PasswordSettings.module.css";

function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const auth = getAuth();

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    const user = auth.currentUser;
    const email = user.email;
    const credentials: AuthCredential = EmailAuthProvider.credential(
      email,
      currentPassword
    );

    reauthenticateWithCredential(user, credentials)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setMessage("Пароль успешно изменен");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            setMessage("Ошибка при смене пароля: " + error.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          });
      })
      .catch((error) => {
        setMessage("Не верно введен текущий пароль");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className={styles.passwordSettingsBox}>
      <div className={styles.passwordSettings}>
        <div className={styles.password}>
          <p>Password</p>
          <input
            type="password"
            placeholder="Your password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div className={styles.newPasswordBox}>
          <div className={styles.newPassword}>
            <p>New password</p>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <p>Confirm password</p>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>
      <div className={styles.messageBtnSave}>
        <div className={styles.message}>{message && <p>{message}</p>}</div>
        <button className={styles.saveBtn} onClick={handlePasswordChange}>
          Сменить пароль
        </button>
      </div>
    </div>
  );
}

export default PasswordSettings;
