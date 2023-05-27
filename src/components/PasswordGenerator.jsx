import React from "react";
import "../styles/PasswordGenerator.css";
import { CopyOutlined } from "@ant-design/icons";

function getStrengthTitle(strengthLevel) {
  switch (strengthLevel) {
    case 0:
      return "EMPTY";
    case 1:
      return "TOO WEAK!";
    case 2:
      return "WEAK!";
    case 3:
      return "MEDIUM";
    case 4:
      return "STRONG";
    default:
      return "";
  }
}

const generatePassword = (event, passwordLength, setPassword) => {
  const strUppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const strLowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const strNumbers = "0123456789";
  const strSymbols = "!@#$%^&*()";

  //create passwordContains string with possible chars
  let pswContains = "";
  pswContains += event.target.uppercase.checked ? strUppercaseChars : "";
  pswContains += event.target.lowercase.checked ? strLowercaseChars : "";
  pswContains += event.target.numbers.checked ? strNumbers : "";
  pswContains += event.target.symbols.checked ? strSymbols : "";

  // generate the password randomly picking the chars from pswContains
  let psw = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * pswContains.length);
    psw += pswContains.substring(randomNumber, randomNumber + 1);
  }
  setPassword(psw);
};

const PasswordGenerator = () => {
  const [passwordLength, setLength] = React.useState(8);
  const [password, setPassword] = React.useState("");
  const [strengthLevel, setStrengthLevel] = React.useState(0);

  const strengthControl = (event) => {
    event.target.checked
      ? setStrengthLevel(strengthLevel + 1)
      : setStrengthLevel(strengthLevel - 1);
  };

  return (
    <div className={"rootContainer"}>
      <div className="GeneratorWrapper">
        <div className="pswGenerator">
          <h3>Password Generator</h3>
          <div className="passwordInput">
            <input
              type="text"
              readOnly={true}
              className="pswInput"
              value={password}
            />
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(password)}
            >
              <CopyOutlined />
            </button>
          </div>
          <div className="pswType">
            <div className="pswLength">
              <h5>Character Length</h5>
              <p>{passwordLength}</p>
            </div>
            <input
              type="range"
              className={"rangeInput"}
              min={5}
              max={20}
              value={passwordLength}
              onChange={(e) => setLength(e.target.value)}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                generatePassword(e, passwordLength, setPassword);
              }}
            >
              <div className={"pswCheckbox"}>
                <input
                  type="checkbox"
                  name={"uppercase"}
                  value={"upper"}
                  id="test1"
                  onChange={(e) => strengthControl(e)}
                />
                <label htmlFor="test1">Include Uppercase Letters</label>
              </div>
              <div className={"pswCheckbox"}>
                <input
                  type="checkbox"
                  name={"lowercase"}
                  value={"lower"}
                  id={"test2"}
                  onChange={(e) => strengthControl(e)}
                />{" "}
                <label htmlFor="test2">Include Lowercase Letters</label>
              </div>
              <div className={"pswCheckbox"}>
                <input
                  type="checkbox"
                  name={"numbers"}
                  value={"num"}
                  id={"test3"}
                  onChange={(e) => strengthControl(e)}
                />
                <label htmlFor="test3">Include Numbers</label>
              </div>
              <div className={"pswCheckbox"}>
                <input
                  type="checkbox"
                  name={"symbols"}
                  value={"sym"}
                  id={"test4"}
                  onChange={(e) => strengthControl(e)}
                />
                <label htmlFor="test4">Include Symbols</label>
              </div>
              <div className={"strengthWrapper"}>
                Strength
                <label>{getStrengthTitle(strengthLevel)}</label>
                <div className="pswStrength">
                  <div
                    className={
                      "strengthBlock strength" +
                      (strengthLevel > 0 ? strengthLevel : "")
                    }
                  ></div>
                  <div
                    className={
                      "strengthBlock strength" +
                      (strengthLevel > 1 ? strengthLevel : "")
                    }
                  ></div>
                  <div
                    className={
                      "strengthBlock strength" +
                      (strengthLevel > 2 ? strengthLevel : "")
                    }
                  ></div>
                  <div
                    className={
                      "strengthBlock strength" +
                      (strengthLevel > 3 ? strengthLevel : "")
                    }
                  ></div>
                </div>
              </div>
              <button
                type={"submit"}
                className={"generateButton"}
                disabled={strengthLevel === 0}
              >
                Generate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PasswordGenerator };
